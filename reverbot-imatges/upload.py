from webdav3.client import Client
from dotenv import load_dotenv
load_dotenv()
import os, random

options = {
    'webdav_hostname': os.getenv("NEXTCLOUD_URL"),
    'webdav_login': os.getenv("NEXTCLOUD_USER"),
    'webdav_password': os.getenv("NEXTCLOUD_PSSWD"),
    'webdav_root': os.getenv("NEXTCLOUD_IMAGES_PATH", "/remote.php/webdav/bot-imatges/")
}

client = Client(options)

def obtenir_imatge_aleatoria():
    fitxers = client.list()
    imatges = [f for f in fitxers if f.lower().endswith(('.jpg', '.png', '.jpeg', '.gif'))]
    imatge = random.choice(imatges)
    local_path = f"/tmp/{os.path.basename(imatge)}"
    client.download_sync(remote_path=imatge, local_path=local_path)
    return local_path
