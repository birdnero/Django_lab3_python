from .BaseRepository import BaseRepository
from main.models import *

class TheatreRepository(BaseRepository):
    def __init__(self):
        super().__init__(Theatre)