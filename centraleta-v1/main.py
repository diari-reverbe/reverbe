import os
import imaplib
import email
from email import policy
from datetime import datetime
from dotenv import load_dotenv
from db import (
    crear_tablas,
    guardar_missatge,
    obtenir_destinataris_actius,
    tancar_connexio,
    obtenir_reverberador_per_correu
)
from mailer import reenviar_correu
from uploader import obtenir_urls_adjunt_hyperkitty
from reverberacions import processar_reverberacio
import re
from email.utils import parseaddr

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
IMAP_SERVER = os.getenv("IMAP_SERVER")
IMAP_PORT = int(os.getenv("IMAP_PORT", 993))

def es_reverberacio(msg, remitent_net, cos):
    reverberador = obtenir_reverberador_per_correu(remitent_net)
    conte_id = "[centraleta-id:" in cos
    return reverberador is not None or conte_id

def llegir_i_processar():
    crear_tablas()
    print("🔍 Connectant a IMAP...")
    imap = imaplib.IMAP4_SSL(IMAP_SERVER, IMAP_PORT)
    imap.login(EMAIL_USER, EMAIL_PASS)
    imap.select("INBOX")

    status, data = imap.search(None, 'UNSEEN')
    if status != "OK" or not data or not data[0]:
        print("📭 No hi ha correus nous.")
        imap.logout()
        return

    for num in data[0].split():
        status, msg_data = imap.fetch(num, "(RFC822)")
        if status != "OK":
            continue

        msg = email.message_from_bytes(msg_data[0][1], policy=policy.default)
        assumpte = msg["subject"]
        remitent = msg["from"]
        data_text = msg["date"]
        message_id = msg.get("Message-ID")

        try:
            data_obj = datetime.strptime(data_text, '%a, %d %b %Y %H:%M:%S %z')
        except Exception:
            data_obj = datetime.now()

        nom, correu_net = parseaddr(remitent)
        remitent_net = correu_net.lower()

        # Obtenir cos del missatge
        cos = ""
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain":
                    cos = part.get_content()
                    break
        else:
            cos = msg.get_content()

        # 🔍 Detectar si és reverberació
        if es_reverberacio(msg, remitent_net, cos):
            match = re.search(r"\[centraleta-id: ([0-9a-fA-F-]{36})\]", cos)
            if match:
                centraleta_id = match.group(1)
                print(f"📌 Detectada reverberació amb ID: {centraleta_id}")
                processar_reverberacio(msg, centraleta_id)
                continue
            else:
                print("⚠️ Missatge de reverberador però sense ID. Ignorat.")
                continue

        # 🔄 Missatge nou
        list_id_header = msg.get('List-Id')
        llista = list_id_header.strip('<>').split('.')[0] + '@raio.issim.net' if list_id_header else None
        llista_enllacos = obtenir_urls_adjunt_hyperkitty(msg, llista) if llista else []

        # Adjuntos
        adjunts = []
        if msg.is_multipart():
            for part in msg.walk():
                content_disposition = part.get("Content-Disposition", "")
                if "attachment" in content_disposition:
                    filename = part.get_filename()
                    payload = part.get_payload(decode=True)
                    content_type = part.get_content_type()
                    adjunts.append((filename, payload, content_type))

        cos_original = cos
        if llista_enllacos:
            cos_modificat = cos + "\n\n📎 Adjunts:\n" + "\n".join(llista_enllacos)
        else:
            cos_modificat = cos

        cc = msg.get("Cc")
        id_msg = guardar_missatge(
            assumpte,
            remitent_net,
            cos_original,
            data_obj,
            adjunts="\n".join(llista_enllacos) if llista_enllacos else None,
            message_id=message_id,
            cc=cc
        )

        cos_modificat += f"\n\n[centraleta-id: {id_msg}]"

        # 🔁 Enviar a reverberadors actius amb reply-to personalitzat
        destinataris = obtenir_destinataris_actius()
        for correu, url in destinataris:
            print(f"📤 (Simulació) S'enviaria a: {correu} amb reply-to: {url}")
            #reenviar_correu([correu], assumpte, cos_modificat, adjunts, reply_to=url)

    imap.logout()
    tancar_connexio()

if __name__ == "__main__":
    llegir_i_processar()
