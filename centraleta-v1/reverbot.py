import random, time, os
from datetime import datetime
from nextcloud import obtenir_client_nextcloud, descarregar_fitxer
from db import obtenir_remitent_per_id, guardar_missatge_reverberat
from mailer import reenviar_correu_amb_adjunts

SUBLLISTA = "bot-imatges@raio.issim.net"

def activar_reverbot(missatge_id):
    # Delay aleatori entre 1 i 4 hores (exemple)
    delay = random.randint(1 * 3600, 4 * 3600)
    print(f"⏳ Reverbot activat. Esperant {delay // 60} minuts...")
    time.sleep(delay)

    remitent = obtenir_remitent_per_id(missatge_id)
    if not remitent:
        print("⚠️ No s'ha trobat remitent original.")
        return

    client = obtenir_client_nextcloud()
    carpeta = "/reverbot/imatges"
    fitxers = client.list(carpeta)
    fitxers_imatge = [f for f in fitxers if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]

    if not fitxers_imatge:
        print("⚠️ No hi ha imatges disponibles.")
        return

    seleccionada = random.choice(fitxers_imatge)
    ruta_local = f"/tmp/{os.path.basename(seleccionada)}"
    client.download_file(carpeta + '/' + seleccionada, ruta_local)

    cos = "Missatge automàtic del reverbot amb una imatge seleccionada aleatòriament."
    assumpte = "Imatge reverberada"
    destinataris = [remitent, SUBLLISTA]

    reenviar_correu_amb_adjunts(destinataris, assumpte, cos, ruta_local)

    url_publica = f"{carpeta}/{seleccionada}"  # o genera una URL si tienes Nextcloud públic

    guardar_missatge_reverberat(
        missatge_id,
        assumpte,
        SUBLLISTA,
        cos,
        datetime.now(),
        in_reply_to=None,
        adjunts=url_publica
    )

    print(f"✅ Reverbot enviat a {', '.join(destinataris)} amb imatge: {seleccionada}")
