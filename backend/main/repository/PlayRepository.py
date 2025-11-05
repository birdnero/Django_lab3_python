from .BaseRepository import BaseRepository
from main.models import *

class PlayRepository(BaseRepository):
    def __init__(self):
        super().__init__(Play)