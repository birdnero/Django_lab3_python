from .BaseRepository import BaseRepository
from main.models import *

class GenreRepository(BaseRepository):
    def __init__(self):
        super().__init__(Genre)

