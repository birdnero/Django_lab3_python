from .BaseRepository import BaseRepository
from main.models import *


class ScheduleRepository(BaseRepository):
    def __init__(self):
        super().__init__(Schedule)

    def get_stats(self):
        return {"total": len(super().get_all())}
