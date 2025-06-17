# script per buidar les files de  taules específiques - funciona independent de la resta
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Conexión a PostgreSQL
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

# Tablas a vaciar
tablas_a_vaciar = ["missatges", "reverberadors"]

for tabla in tablas_a_vaciar:
    try:
        cursor.execute(f'TRUNCATE TABLE "{tabla}" RESTART IDENTITY CASCADE;')
        print(f"✅ Tabla '{tabla}' vaciada correctamente.")
    except Exception as e:
        print(f"❌ Error al vaciar la tabla '{tabla}': {e}")

conn.commit()
cursor.close()
conn.close()
