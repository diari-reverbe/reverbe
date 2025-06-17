# reverberacions.py
from db import (
    guardar_missatge_reverberat,
    obtenir_cc_per_id,
    obtenir_reverberador_per_url
)
from mailer import reenviar_correu
from datetime import datetime
from email.utils import parseaddr

def processar_reverberacio(msg, missatge_original_id):
    assumpte = msg["subject"]
    remitent = msg["from"]
    data_text = msg["date"]
    message_id = msg["Message-ID"]

    try:
        data_obj = datetime.strptime(data_text, '%a, %d %b %Y %H:%M:%S %z')
    except Exception:
        data_obj = datetime.now()

    # ✉️ Cos
    cos = ""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                cos = part.get_content()
                break
    else:
        cos = msg.get_content()

    # Adjunts (extreure noms)
    adjunts = []
    if msg.is_multipart():
        for part in msg.walk():
            content_disposition = part.get("Content-Disposition", "")
            if "attachment" in content_disposition:
                filename = part.get_filename()
                payload = part.get_payload(decode=True)
                content_type = part.get_content_type()
                adjunts.append((filename, payload, content_type))
    adjunts_str = ", ".join(filename for filename, _, _ in adjunts) if adjunts else None

    if not message_id:
        print("⚠️ Missatge sense Message-ID. Ignorat.")
        return

    # Detectar llista com remitent
    nom, correu_net = parseaddr(remitent)
    remitent_net = correu_net

    reverberador = obtenir_reverberador_per_url(remitent_net)
    if not reverberador:
        print(f"⚠️ El remitent {remitent_net} no és cap llista coneguda.")
        return

    # Guardar reverberació
    guardar_missatge_reverberat(
        missatge_original_id,
        assumpte,
        remitent_net,
        cos,
        data_obj,
        in_reply_to=message_id,
        adjunts=adjunts_str
    )

    # Reenviar només al CC original
    cc_original = obtenir_cc_per_id(missatge_original_id)
    if not cc_original:
        print("⚠️ No s'ha trobat el CC del missatge original.")
        return

    destinataris = [cc_original]

    # reenviar
    # reenviar_correu(destinataris, assumpte, cos, adjunts)
    print("📤 (Simulació) Es reenviaria a:", destinataris)
