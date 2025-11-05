from .BaseRepository import BaseRepository
from main.models import *

class ActorRepository(BaseRepository):
    def __init__(self):
        super().__init__(Actor)