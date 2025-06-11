from db import (
    guardar_missatge_reverberat,
    obtenir_missatge_original_per_message_id,
    obtenir_remitent_per_id,
    obtenir_reverberador_per_correu,
    obtenir_cc_per_id
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

    # EXTRAER ADJUNTOS
    adjunts = []
    if msg.is_multipart():
        for part in msg.walk():
            content_disposition = part.get("Content-Disposition", "")
            if "attachment" in content_disposition:
                filename = part.get_filename()
                payload = part.get_payload(decode=True)
                content_type = part.get_content_type()
                adjunts.append((filename, payload, content_type))

    if not message_id:
        print("⚠️ Missatge sense Message-ID. Ignorat.")
        return

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

    autor_original_cc = obtenir_cc_per_id(missatge_original_id)
    if not autor_original_cc:
        print("⚠️ No s'ha trobat el CC del missatge original.")
        return

    reverberador = obtenir_reverberador_per_correu(remitent_net)

    if reverberador and len(reverberador) > 1:
        url_reverberador = reverberador[1]
    else:
        url_reverberador = None

    destinataris = [autor_original_cc]
    if url_reverberador:
        destinataris.append(url_reverberador)

    # PASAR adjunts al reenviar
    reenviar_correu(destinataris, assumpte, cos, adjunts)

    print("📤 (Simulació) Es reenviaria a:", destinataris)
    print("🔍 Reverberador trobat:", reverberador)
    print("🔗 URL reverberador:", url_reverberador)
    print("Assumpte:", assumpte)
    print("Cos:", cos[:200], "..." if len(cos) > 200 else "")
