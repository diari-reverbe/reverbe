# mailer.py
import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

def enviar_imatge(destinataris, assumpte, cos, path_imatge):
    msg = MIMEMultipart()
    msg["From"] = os.getenv("EMAIL_USER")
    msg["To"] = ", ".join(destinataris)
    msg["Subject"] = assumpte
    msg.attach(MIMEText(cos, "plain"))

    with open(path_imatge, "rb") as f:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(f.read())
        encoders.encode_base64(part)
        part.add_header("Content-Disposition", f"attachment; filename=" + os.path.basename(path_imatge))
        msg.attach(part)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(os.getenv("SMTP_SERVER"), int(os.getenv("SMTP_PORT")), context=context) as server:
        server.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))
        server.send_message(msg)
