from fastapi import FastAPI, Header, HTTPException
import psycopg2, os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

# --- 🔑 API keys i connexions ---
API_KEY = os.getenv("API_KEY")  #  original
DATABASE_URL = os.getenv("DATABASE_URL")

API_KEY_ALT = os.getenv("API_KEY_ALT")  #  nueva
DATABASE_URL_ALT = os.getenv("DATABASE_URL_ALT")

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- connexió dinàmica ---
def get_db_for_key(x_api_key: str):
    """
    Devuelve la conexión a la BD correspondiente
    según la API key recibida en el header.
    """
    if x_api_key == API_KEY:
        return psycopg2.connect(DATABASE_URL)
    elif x_api_key == API_KEY_ALT:
        return psycopg2.connect(DATABASE_URL_ALT)
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


# --- Endpoint principal ---
@app.get("/missatges_complets")
def get_missatges_complets(x_api_key: str = Header(...)):
    conn = get_db_for_key(x_api_key)
    cur = conn.cursor()

    # Missatges principals
    cur.execute("""
        SELECT id, assumpte, remitent, cos, data, adjunts, message_id, cc
        FROM missatges
        ORDER BY data DESC
        LIMIT 20
    """)
    missatges = cur.fetchall()

    # Reverberacions
    cur.execute("""
        SELECT id, missatge_original_id, assumpte, remitent, cos, data, in_reply_to, adjunts
        FROM missatges_reverberats
        WHERE missatge_original_id IN (
            SELECT id FROM missatges ORDER BY data DESC LIMIT 20
        )
    """)
    reverberacions = cur.fetchall()

    cur.close()
    conn.close()

    # Mapejar reverberacions
    rev_map = {}
    for r in reverberacions:
        rev = {
            "id": r[0],
            "missatge_original_id": r[1],
            "assumpte": r[2],
            "remitent": r[3],
            "cos": r[4],
            "data": r[5].isoformat() if r[5] else None,
            "in_reply_to": r[6],
            "adjunts": r[7],
        }
        rev_map.setdefault(r[1], []).append(rev)

    return [
        {
            "id": m[0],
            "assumpte": m[1],
            "remitent": m[2],
            "cos": m[3],
            "data": m[4].isoformat() if m[4] else None,
            "adjunts": m[5],
            "message_id": m[6],
            "cc": m[7],
            "reverberacions": rev_map.get(m[0], []),
        }
        for m in missatges
    ]
