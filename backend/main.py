from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import socketio

# SOCKET.IO

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*"
)

# FASTAPI

fastapi_app = FastAPI()

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# RELAYS

relay_states = {
    1: False,
    2: False,
    3: False,
    4: False,
    5: False,
    6: False,
    7: False,
    8: False,
}

# ROOT

@fastapi_app.get("/")
def root():

    return {
        "status": "HILLUX OS BACKEND ONLINE"
    }

# GET RELAYS

@fastapi_app.get("/relays")
def get_relays():

    return relay_states

# TOGGLE RELAY

@fastapi_app.post("/relay/{relay_id}")
async def toggle_relay(relay_id: int):

    if relay_id not in relay_states:

        return {
            "error": "Invalid relay"
        }

    relay_states[relay_id] = not relay_states[relay_id]

    # WEBSOCKET EVENT

    await sio.emit(
        "relay_update",
        {
            "relay": relay_id,
            "state": relay_states[relay_id]
        }
    )

    return {
        "relay": relay_id,
        "state": relay_states[relay_id]
    }

# SOCKET EVENTS

@sio.event
async def connect(sid, environ):

    print("CLIENT CONNECTED:", sid)

@sio.event
async def disconnect(sid):

    print("CLIENT DISCONNECTED:", sid)

# FINAL APP

app = socketio.ASGIApp(
    sio,
    other_asgi_app=fastapi_app
)