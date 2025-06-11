# script per eliminar taules específiques - funciona independent de la resta
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Conexión a PostgreSQL
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

# Eliminar tablas si existen
tablas_a_eliminar = ["reverberadors"]

for tabla in tablas_a_eliminar:
    try:
        cursor.execute(f"DROP TABLE IF EXISTS {tabla} CASCADE;")
        print(f"✅ Tabla '{tabla}' eliminada (si existía).")
    except Exception as e:
        print(f"❌ Error al eliminar la tabla '{tabla}': {e}")

conn.commit()
cursor.close()
conn.close()
