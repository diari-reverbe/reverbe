import os
import imaplib
import email
from email import policy
from datetime import datetime
from dotenv import load_dotenv
from db import crear_tablas, guardar_missatge, obtenir_destinataris_actius, tancar_connexio
from mailer import reenviar_correu
from uploader import pujar_adjunt
from reverberacions import processar_reverberacio

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
IMAP_SERVER = os.getenv("IMAP_SERVER")
IMAP_PORT = int(os.getenv("IMAP_PORT", 993))

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
        data_obj = datetime.now()
        try:
            data_obj = datetime.strptime(data_text, '%a, %d %b %Y %H:%M:%S %z')
        except Exception:
            pass

        cos = ""
        llista_enllacos = []

        if msg.is_multipart():
            for part in msg.walk():
                content_disposition = part.get_content_disposition()
                content_type = part.get_content_type()

                if content_disposition == "attachment":
                    nom = part.get_filename()
                    contingut = part.get_payload(decode=True)
                    url = pujar_adjunt(nom, contingut)
                    if url:
                        llista_enllacos.append(url)

                elif content_type == "text/plain" and not cos:
                    cos = part.get_content()
        else:
            cos = msg.get_content()

        # ✨ Comprovem si hi ha ID centraleta al cos
        import re
        pattern = r"\[centraleta-id: ([0-9a-fA-F-]{36})\]"
        match = re.search(pattern, cos)
        if match:
            centraleta_id = match.group(1)
            print(f"📌 Detectat identificador del missatge original: {centraleta_id}")
            processar_reverberacio(msg, centraleta_id)  # <-- PASAR el ID aquí
            continue

        # 👉 Si no és resposta, ho tractem com a missatge nou
        cos_original = cos
        if llista_enllacos:
            cos_modificat = cos + "\n\n📎 Adjunts:\n" + "\n".join(llista_enllacos)
        else:
            cos_modificat = cos

        message_id = msg.get("Message-ID")
        from email.utils import parseaddr
        nom, correu_net = parseaddr(remitent)
        remitent_net = correu_net  # Solo el email limpio
        id_msg = guardar_missatge(
            assumpte,
            remitent_net,
            cos_original,
            data_obj,
            adjunts="\n".join(llista_enllacos) if llista_enllacos else None,
            message_id=message_id
        )

        # 🔗 Afegim ID al cos reenviat
        cos_modificat += f"\n\n[centraleta-id: {id_msg}]"

        destinataris = obtenir_destinataris_actius()
        if destinataris:
            reenviar_correu(destinataris, assumpte, cos_modificat)
        else:
            print("⚠️ No hi ha reverberadors actius.")


    imap.logout()
    tancar_connexio()

if __name__ == "__main__":
    llegir_i_processar()
