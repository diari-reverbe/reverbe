# afegir reverberadors manualment - funciona independentment de la resta
import os
import uuid
import psycopg2
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Lista de reverberadors con categorías y url de ejemplo
reverberadors = [
    {
        "correu": "cerezo.azahara@gmail.com",
        "categoria": "haikus",
        "url": "acerezoce@uoc.edu",
    }
]

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    for r in reverberadors:
        id_reverberador = str(uuid.uuid4())
        estat = "actiu"
        cursor.execute(
            "INSERT INTO reverberadors (id, correu, estat, categoria, url) VALUES (%s, %s, %s, %s, %s)",
            (id_reverberador, r["correu"], estat, r["categoria"], r["url"])
        )
        print(f"✅ Insertat: {r['correu']}")

    conn.commit()
    print("🎉 Tots els reverberadors han estat afegits correctament.")

except Exception as e:
    print(f"❌ Error en inserir reverberadors: {e}")

finally:
    if cursor:
        cursor.close()
    if conn:
        conn.close()
