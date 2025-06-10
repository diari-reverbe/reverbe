from db import (
    guardar_missatge_reverberat,
    obtenir_missatge_original_per_message_id,
    obtenir_remitent_per_id,
    obtenir_reverberador_per_correu  # función para obtener reverberador por correo
)
from mailer import reenviar_correu
from datetime import datetime

def processar_reverberacio(msg, missatge_original_id):
    assumpte = msg["subject"]
    remitent = msg["from"]
    data_text = msg["date"]
    message_id = msg["Message-ID"]

    try:
        data_obj = datetime.strptime(data_text, '%a, %d %b %Y %H:%M:%S %z')
    except Exception:
        data_obj = datetime.now()

    # Extraer el cuerpo de texto plano
    cos = ""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                cos = part.get_content()
                break
    else:
        cos = msg.get_content()

    if not message_id:
        print("⚠️ Missatge sense Message-ID. Ignorat.")
        return

    # Aquí no buscamos el mensaje original por message_id, usamos el que recibimos
    # Guardar reverberació relacionando con el missatge_original_id
    from email.utils import parseaddr
    nom, correu_net = parseaddr(remitent)
    remitent_net = correu_net  # email limpio
    guardar_missatge_reverberat(
        missatge_original_id,
        assumpte,
        remitent_net,
        cos,
        data_obj,
        in_reply_to=message_id
    )

    autor_original = obtenir_remitent_per_id(missatge_original_id)
    if not autor_original:
        print("⚠️ No s'ha trobat remitent original.")
        return

    reverberador = obtenir_reverberador_per_correu(remitent_net)
    if not reverberador:
        print(f"⚠️ No s'ha trobat reverberador per correu: {remitent}")
        return

    url_reverberador = reverberador[1]  # la url si existe

    destinataris = [autor_original]
    if url_reverberador:
        destinataris.append(url_reverberador)

    reenviar_correu(destinataris, assumpte, cos)
