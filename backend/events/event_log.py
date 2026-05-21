# backend/events/event_log.py

from datetime import datetime


class EventLog:
    def __init__(self):
        self.events = []
        self.max_events = 200

    def add(self, event_type: str, message: str, level: str = "info"):
        event = {
            "time": datetime.now().strftime("%H:%M:%S"),
            "type": event_type,
            "message": message,
            "level": level,
        }

        self.events.insert(0, event)

        if len(self.events) > self.max_events:
            self.events = self.events[:self.max_events]

        return event

    def get_events(self):
        return self.events

    def clear(self):
        self.events = []
        return self.events


event_log = EventLog()