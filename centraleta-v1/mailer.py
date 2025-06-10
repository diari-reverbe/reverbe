import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import email.utils  # <--- Importamos para generar Message-ID

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 465))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

def reenviar_correu(destinataris, assumpte, cos_original):
    try:
        for dest in destinataris:
            msg = MIMEText(cos_original)
            msg["From"] = EMAIL_USER
            msg["To"] = dest
            msg["Subject"] = f"[Centraleta] {assumpte}"
            msg['Message-ID'] = email.utils.make_msgid()

            with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as servidor:
                servidor.login(EMAIL_USER, EMAIL_PASS)
                servidor.send_message(msg)

            print(f"✅ Correu reenviat a {dest}")
    except Exception as e:
        print("❌ Error en reenvio:", e)
