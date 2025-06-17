# mailer.py
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from dotenv import load_dotenv
import email.utils

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 465))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

def reenviar_correu(destinataris, assumpte, cos_original, adjunts=None, reply_to=None):
    try:
        for dest in destinataris:
            msg = MIMEMultipart()
            msg["From"] = EMAIL_USER
            msg["To"] = dest
            msg["Subject"] = f"[Centraleta] {assumpte}"
            msg['Message-ID'] = email.utils.make_msgid()
            if reply_to:
                msg.add_header("Reply-To", reply_to)

            # Cuerpo del mensaje
            msg.attach(MIMEText(cos_original, "plain"))

            # Adjuntos, si los hay
            if adjunts:
                for filename, payload, content_type in adjunts:
                    maintype, subtype = content_type.split('/', 1)
                    part = MIMEBase(maintype, subtype)
                    part.set_payload(payload)
                    encoders.encode_base64(part)
                    part.add_header('Content-Disposition', f'attachment; filename="{filename}"')
                    msg.attach(part)

            with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as servidor:
                servidor.login(EMAIL_USER, EMAIL_PASS)
                servidor.send_message(msg)

            print(f"✅ Correu reenviat a {dest}")
    except Exception as e:
        print("❌ Error en reenvio:", e)
