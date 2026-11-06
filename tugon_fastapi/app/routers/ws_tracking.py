"""
WebSocket Real-Time Telemetry Multiplexer (Sanitized Academic Implementation)
"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json
from app.database import db

router = APIRouter(tags=["WebSocket Telemetry"])

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps(message))
            except Exception:
                pass

manager = ConnectionManager()

@router.websocket("/ws/tracking")
async def websocket_tracking(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        # Broadcast initial state immediately
        await websocket.send_text(json.dumps({
            "type": "INITIAL_FLEET_STATE",
            "vehicles": list(db.vehicles.values()),
            "responders": list(db.responders.values()),
            "active_missions": list(db.missions.values())
        }))
        while True:
            # Receive client ping or telemetry update
            data = await websocket.receive_text()
            payload = json.loads(data)
            # Echo or broadcast back
            await manager.broadcast({
                "type": "TELEMETRY_UPDATE",
                "payload": payload
            })
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception:
        manager.disconnect(websocket)

