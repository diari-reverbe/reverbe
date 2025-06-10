# per pujar adjunts a nextcloud
from webdav3.client import Client
import os
from dotenv import load_dotenv

load_dotenv()

options = {
    'webdav_hostname': os.getenv("NEXTCLOUD_URL"),  # ej: "https://wolke.mur.at"
    'webdav_login':    os.getenv("NEXTCLOUD_USER"),
    'webdav_password': os.getenv("NEXTCLOUD_PSSWD"),
    'webdav_root':     os.getenv("NEXTCLOUD_PATH", "/remote.php/webdav/centraleta/")
}

client = Client(options)

def pujar_adjunt(nom_arxiu, dades):
    try:
        ruta_local = f"/tmp/{nom_arxiu}"
        with open(ruta_local, "wb") as f:
            f.write(dades)

        client.upload_sync(remote_path=nom_arxiu, local_path=ruta_local)
        os.remove(ruta_local)

        return f"{options['webdav_hostname']}{options['webdav_root']}{nom_arxiu}"
    except Exception as e:
        print("❌ Error pujant arxiu:", e)
        return None
