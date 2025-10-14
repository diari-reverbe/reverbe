from fastapi import FastAPI, Depends, Header, HTTPException
import psycopg2, os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()
# per a wp_config: 
# define('RAIO_API_KEY', 'a83D3xsyZd48Jd2B3Vp6-9xV1kTfzJhGrgDl0M-w');


#origins = [os.getenv("WP_SITE")]
#app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])
API_KEY = os.getenv("a83D3xsyZd48Jd2B3Vp6-9xV1kTfzJhGrgDl0M-w")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todo temporalmente
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    return conn

def validar_api_key(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")

@app.get("/missatges_complets")
def get_missatges_complets(x_api_key: str = Header(...)):
    validar_api_key(x_api_key)
    conn = get_db()
    cur = conn.cursor()

    # Obtenir missatges
    cur.execute("""
        SELECT id, assumpte, remitent, cos, data, adjunts, message_id, cc
        FROM missatges
        ORDER BY data DESC
        LIMIT 20
    """)
    missatges = cur.fetchall()

    # Obtenir totes les reverberacions relacionades
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

    # Reorganitzar reverberacions per id de missatge original
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

    #retorn de resultats
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
            "reverberacions": rev_map.get(m[0], [])
        }
        for m in missatges
    ]
