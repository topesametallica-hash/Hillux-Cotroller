# backend/websocket/socket_server.py

import socketio

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*"
)

socket_app = socketio.ASGIApp(sio)

@sio.event
async def connect(sid, environ):

    print("CLIENT CONNECTED:", sid)

@sio.event
async def disconnect(sid):

    print("CLIENT DISCONNECTED:", sid)