import imaplib
import email
from upload import obtenir_imatge_aleatoria
from mailer import enviar_imatge
import time, os
from dotenv import load_dotenv

load_dotenv()

def es_de_diari(msg):
    return msg.get("From") and os.getenv("EMAIL_SENDER") in msg["From"]

def procesar_correu():
    imap = imaplib.IMAP4_SSL(os.getenv("IMAP_SERVER"))
    imap.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))
    imap.select("INBOX")

    result, data = imap.search(None, 'UNSEEN')
    ids = data[0].split()

    for id in ids:
        result, msg_data = imap.fetch(id, "(RFC822)")
        msg = email.message_from_bytes(msg_data[0][1])

        if es_de_diari(msg):
            print("✅ Missatge de diari detectat")
            imatge_path = obtenir_imatge_aleatoria()
            enviar_imatge(
                [(os.getenv("EMAIL_RECIPIENT"))],
                "📷 Reverberació visual",
                "Aquí tens una imatge aleatòria:",
                imatge_path
            )

    imap.logout()

if __name__ == "__main__":
    while True:
        procesar_correu()
        time.sleep(300)  # Cada 5 minuts
