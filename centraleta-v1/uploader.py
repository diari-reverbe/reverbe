# uploader.py — construir URL d'adjunt a HyperKitty
import re

def obtenir_urls_adjunt_hyperkitty(msg, llista):
    """
    Extrae la URL de los adjuntos en hyperkitty a partir del header 'Archived-At'.
    """
    archived_at = msg.get("Archived-At")
    urls = []
    if archived_at and llista:
        archived_at = archived_at.strip().strip("<>")
        base_url = archived_at.rstrip("/") + "/attachment"
        counter = 1

        for part in msg.walk():
            content_disposition = part.get_content_disposition()
            if content_disposition == "attachment":
                filename = part.get_filename()
                if filename:
                    url = f"{base_url}/{counter}/{filename}"
                    urls.append(url)
                    counter += 1
    return urls
