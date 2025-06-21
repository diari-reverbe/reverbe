from fastapi import FastAPI, Depends
import psycopg2, os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

# Permetre accés des de wordpress només
origins = [os.getenv("WP_SITE")]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])

def get_db():
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    return conn

# configurar endpoints per connectar amb BD i obtenir els camps corresponents
@app.get("/missatges")
def get_missatges():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, assumpte, remitent, cos, data, adjunts, message_id, cc
        FROM missatges
        ORDER BY data DESC
        LIMIT 20
    """)
    res = cur.fetchall()
    cur.close()
    conn.close()
    return [
        {
            "id": r[0],
            "assumpte": r[1],
            "remitent": r[2],
            "cos": r[3],
            "data": r[4].isoformat() if r[4] else None,
            "adjunts": r[5],
            "message_id": r[6],
            "cc": r[7],
        }
        for r in res
    ]

@app.get("/reverberacions")
def get_reverberacions():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, missatge_original_id, assumpte, remitent, cos, data, in_reply_to
        FROM missatges_reverberats
        ORDER BY data DESC
        LIMIT 20
    """)
    res = cur.fetchall()
    cur.close()
    conn.close()
    return [
        {
            "id": r[0],
            "missatge_original_id": r[1],
            "assumpte": r[2],
            "remitent": r[3],
            "cos": r[4],
            "data": r[5].isoformat() if r[5] else None,
            "in_reply_to": r[6]
        }
        for r in res
    ]
