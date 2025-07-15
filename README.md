```	
    	  ▌   
▛▘█▌▌▌█▌▛▘▛▌█▌
▌ ▙▖▚▘▙▖▌ ▙▌▙▖

Diari col·lectiu i lliure

```	

## Centraleta-v1
Centraleta automàtica subscrita a llistes de correu de Mailman3 (diari i llistes de reverberacions) que escolta la safata d'entrada i gestiona i reenvia missatges i reverberacions.

Estructura:
main.py → Procés principal: llegeix els correus (IMAP), els classifica i en desencadena les accions corresponents.

db.py → Gestió de la base de dades (PostgreSQL): creació de taules, inserció i consulta de missatges i reverberadors.

mailer.py → Enviament i reenviament de correus.

reverberacions.py → Processa els missatges que s’han de "reverberar" i els torna a enviar a les adreces configurades.

reverberadors.py → Permet afegir o gestionar manualment les adreces de reverberadors.

eliminar.py → Script independent per buidar completament les taules missatges i reverberadors, útil per a reiniciar el sistema.

```
                       ┌────────────────────────────-┐
                       │        FORMULARI / MAIL     │
                       │  (envia missatge al diari,  │
                       │ a la llista de distribució) │
                       └────────────┬───────────────-┘
                                    │
             (1) Lectura IMAP (detecta missatges nous)
                                    │
                          ┌─────────▼─────────────┐
                          │       main.py         │
                          │-----------------------│
                          │ - llegir IMAP         │
                          │ - detectar si         │
                          │   és reverberació.    │
                          │ - guardar msg         │
                          │ - reenviar msg        │
                          └─┬─────┬─────┬─────────┘
                            │     │     │
             	      (2) BD      │   (3) Reenviar
                            │     │     │
         ┌──────────-───────▼─-┐  │   ┌─▼─────────────────-─┐
         │      db.py          │  │   │     mailer.py       │
         │---------------------│  │   │---------------------│
 		 │ - crear_tablas()    │  │   │ - reenviar_correu() │
         │ - guardar_missatge()│  │   └─────────────────────┘
         │ - obtener...()      │  │
         └─────────┬───────────┘  │
                   │              │
       (4) Missatges reverberats  │
                   │              │
           ┌───────▼──────-───┐   │
           │ reverberacions.py│   │
           │------------------│   │
           │ - processar_     │   │
           │   reverberacio() │   │
           │ - guarda a BD    │   │
           │ - reenvia a CC   │───┘
           └────────┬─────────┘
                    │
    (5) Gestió manual reverberadors ───── Eliminar contingut taules
                    │			            │	
           ┌────────▼─────────┐            ┌────────▼─────────┐
           │ reverberadors.py │            │   eliminar.py    │
           │------------------│            │------------------│
           │ - insertar       │            │ - TRUNCATE       │
           │   reverberadors  │            │   missatges      │
           └──────────────────┘            │ - TRUNCATE       │
				         				   │   reverberadors  │
       				         			   └──────────────────┘
 
