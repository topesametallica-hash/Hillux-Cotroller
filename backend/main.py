# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import socketio
import shutil
import platform
import time

from vehicle.vehicle_state import vehicle_state
from events.event_log import event_log

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

start_time = time.time()

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

event_log.add("SYSTEM", "HILLUX OS BACKEND STARTED", "success")


async def broadcast_event(event_type: str, message: str, level: str = "info"):
    event = event_log.add(event_type, message, level)

    await sio.emit(
        "event_log_update",
        event
    )

    return event


# ROOT

@fastapi_app.get("/")
def root():

    return {
        "status": "HILLUX OS BACKEND ONLINE"
    }


# SYSTEM STATUS

@fastapi_app.get("/system/status")
def system_status():

    total, used, free = shutil.disk_usage(".")

    uptime_seconds = int(time.time() - start_time)

    hours = uptime_seconds // 3600
    minutes = (uptime_seconds % 3600) // 60
    seconds = uptime_seconds % 60

    return {
        "backend": "online",
        "gpio_mode": "simulation",
        "recording": True,
        "cameras": {
            "active": 6,
            "total": 6
        },
        "gps": "searching",
        "vehicle": vehicle_state.get_state(),
        "storage": {
            "free_gb": round(free / (1024 ** 3), 1),
            "used_gb": round(used / (1024 ** 3), 1),
            "total_gb": round(total / (1024 ** 3), 1)
        },
        "power": {
            "aux_voltage": 12.6,
            "main_voltage": 12.4
        },
        "system": {
            "platform": platform.system(),
            "temperature_c": 42,
            "uptime": f"{hours:02d}:{minutes:02d}:{seconds:02d}"
        }
    }


# EVENTS

@fastapi_app.get("/events")
def get_events():

    return event_log.get_events()


@fastapi_app.post("/events/clear")
async def clear_events():

    event_log.clear()

    event = await broadcast_event(
        "SYSTEM",
        "EVENT LOG CLEARED",
        "warning"
    )

    return {
        "status": "cleared",
        "event": event
    }


# RELAYS

@fastapi_app.get("/relays")
def get_relays():

    return relay_states


@fastapi_app.post("/relay/{relay_id}")
async def toggle_relay(relay_id: int):

    if relay_id not in relay_states:

        return {
            "error": "Invalid relay"
        }

    relay_states[relay_id] = not relay_states[relay_id]

    relay_state = relay_states[relay_id]

    await sio.emit(
        "relay_update",
        {
            "relay": relay_id,
            "state": relay_state
        }
    )

    await broadcast_event(
        "RELAY",
        f"RELAY {relay_id} {'ON' if relay_state else 'OFF'}",
        "success" if relay_state else "warning"
    )

    return {
        "relay": relay_id,
        "state": relay_state
    }


# VEHICLE STATE

@fastapi_app.get("/vehicle/state")
def get_vehicle_state():

    return vehicle_state.get_state()


@fastapi_app.post("/vehicle/{signal}/toggle")
async def toggle_vehicle_signal(signal: str):

    result = vehicle_state.toggle_signal(signal)

    if "error" in result:
        return result

    await sio.emit(
        "vehicle_update",
        result["vehicle"]
    )

    state_text = "ON" if result["state"] else "OFF"

    level = "success" if result["state"] else "warning"

    if signal == "reverse":
        level = "danger" if result["state"] else "success"

        await sio.emit(
            "reverse_update",
            {
                "active": result["state"]
            }
        )

    await broadcast_event(
        "VEHICLE",
        f"{signal.upper()} {state_text}",
        level
    )

    return result


@fastapi_app.post("/vehicle/{signal}/on")
async def vehicle_signal_on(signal: str):

    result = vehicle_state.set_signal(signal, True)

    if "error" in result:
        return result

    await sio.emit(
        "vehicle_update",
        result["vehicle"]
    )

    if signal == "reverse":

        await sio.emit(
            "reverse_update",
            {
                "active": True
            }
        )

    await broadcast_event(
        "VEHICLE",
        f"{signal.upper()} ON",
        "danger" if signal == "reverse" else "success"
    )

    return result


@fastapi_app.post("/vehicle/{signal}/off")
async def vehicle_signal_off(signal: str):

    result = vehicle_state.set_signal(signal, False)

    if "error" in result:
        return result

    await sio.emit(
        "vehicle_update",
        result["vehicle"]
    )

    if signal == "reverse":

        await sio.emit(
            "reverse_update",
            {
                "active": False
            }
        )

    await broadcast_event(
        "VEHICLE",
        f"{signal.upper()} OFF",
        "warning"
    )

    return result


# SOCKET EVENTS

@sio.event
async def connect(sid, environ):

    print("CLIENT CONNECTED:", sid)

    await broadcast_event(
        "SOCKET",
        "CLIENT CONNECTED",
        "success"
    )


@sio.event
async def disconnect(sid):

    print("CLIENT DISCONNECTED:", sid)

    await broadcast_event(
        "SOCKET",
        "CLIENT DISCONNECTED",
        "warning"
    )


# FINAL APP

app = socketio.ASGIApp(
    sio,
    other_asgi_app=fastapi_app
)