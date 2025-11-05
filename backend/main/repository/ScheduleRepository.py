from .BaseRepository import BaseRepository
from main.models import *

class ScheduleRepository(BaseRepository):
    def __init__(self):
        super().__init__(Schedule)