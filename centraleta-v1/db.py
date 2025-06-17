import os
import psycopg2
from dotenv import load_dotenv
import uuid

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Variables de conexión globales
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

def crear_tablas():
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS missatges (
            id UUID PRIMARY KEY,
            assumpte TEXT,
            remitent TEXT,
            cos TEXT,
            data TIMESTAMP,
            adjunts TEXT,
            message_id TEXT UNIQUE
        );
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS missatges_reverberats (
            id UUID PRIMARY KEY,
            missatge_original_id UUID REFERENCES missatges(id),
            assumpte TEXT,
            remitent TEXT,
            cos TEXT,
            data TIMESTAMP,
            in_reply_to TEXT,
            adjunts TEXT
        );
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reverberadors (
            id UUID PRIMARY KEY,
            correu TEXT,
            estat TEXT,
            categoria TEXT,
            url TEXT
        );
    """)
    
    conn.commit()

def obtenir_connexio():
    global conn, cursor
    if conn.closed:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()
    return conn

def guardar_missatge(assumpte, remitent, cos, data_obj, adjunts=None, message_id=None, cc=None):
    conn = obtenir_connexio()
    cursor = conn.cursor()

    id_msg = str(uuid.uuid4())
    cursor.execute("""
        INSERT INTO missatges (id, assumpte, remitent, cos, data, adjunts, message_id, cc)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (id_msg, assumpte, remitent, cos, data_obj, adjunts, message_id, cc))

    conn.commit()
    cursor.close()
    return id_msg

def guardar_missatge_reverberat(missatge_original_id, assumpte, remitent, cos, data_obj, in_reply_to=None, adjunts=None):
    conn = obtenir_connexio()
    cursor = conn.cursor()

    id_msg_reverberat = str(uuid.uuid4())
    cursor.execute("""
        INSERT INTO missatges_reverberats (id, missatge_original_id, assumpte, remitent, cos, data, in_reply_to, adjunts)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (id_msg_reverberat, missatge_original_id, assumpte, remitent, cos, data_obj, in_reply_to, adjunts))

    conn.commit()
    cursor.close()
    return id_msg_reverberat

def obtenir_missatge_original_per_in_reply_to(in_reply_to):
    conn = obtenir_connexio()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id FROM missatges WHERE message_id = %s
    """, (in_reply_to,))
    resultat = cursor.fetchone()
    cursor.close()
    return resultat[0] if resultat else None

def obtenir_missatge_original_per_message_id(message_id):
    conn = obtenir_connexio()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id FROM missatges WHERE message_id = %s
    """, (message_id,))
    result = cursor.fetchone()
    cursor.close()
    return result[0] if result else None

def obtenir_destinataris_actius():
    cursor.execute("SELECT correu, url FROM reverberadors WHERE estat = 'actiu'")
   # return [r[0] for r in cursor.fetchall()]
    return cursor.fetchall()

def obtenir_reverberadors():
    cursor.execute("SELECT correu FROM reverberadors")
    return cursor.fetchall()

def obtenir_reverberador_per_correu(correu):
    conn = obtenir_connexio()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT correu, url FROM reverberadors WHERE correu = %s AND estat = 'actiu'
    """, (correu,))
    result = cursor.fetchone()
    cursor.close()
    return result

def obtenir_remitent_per_id(missatge_id):
    conn = obtenir_connexio()
    cursor = conn.cursor()
    cursor.execute("SELECT remitent FROM missatges WHERE id = %s", (missatge_id,))
    resultat = cursor.fetchone()
    cursor.close()
    return resultat[0] if resultat else None

def obtenir_reverberador_per_url(url):
    conn = obtenir_connexio()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT correu, url FROM reverberadors WHERE estat = 'actiu'
    """)
    result = cursor.fetchall()
    cursor.close()
    return result

def obtenir_cc_per_id(missatge_id):
    conn = obtenir_connexio()
    cursor = conn.cursor()
    cursor.execute("SELECT cc FROM missatges WHERE id = %s", (missatge_id,))
    result = cursor.fetchone()
    cursor.close()
    if result:
        return result[0]
    return None

def tancar_connexio():
    global conn, cursor
    if cursor:
        cursor.close()
        cursor = None
    if conn:
        conn.close()
        conn = None
