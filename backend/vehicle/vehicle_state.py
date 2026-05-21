# backend/vehicle/vehicle_state.py

class VehicleState:
    def __init__(self):
        self.state = {
            "acc": False,
            "ignition": False,
            "reverse": False,
            "lights": False,
            "handbrake": False,
            "brake": False,
            "door": False,
            "parking_mode": True,
            "night_mode": False,
        }

    def get_state(self):
        return self.state

    def set_signal(self, signal: str, value: bool):
        if signal not in self.state:
            return {
                "error": "Invalid vehicle signal"
            }

        self.state[signal] = value

        self._update_auto_modes()

        return {
            "signal": signal,
            "state": self.state[signal],
            "vehicle": self.state,
        }

    def toggle_signal(self, signal: str):
        if signal not in self.state:
            return {
                "error": "Invalid vehicle signal"
            }

        return self.set_signal(signal, not self.state[signal])

    def _update_auto_modes(self):
        self.state["night_mode"] = self.state["lights"]
        self.state["parking_mode"] = not self.state["ignition"]


vehicle_state = VehicleState()