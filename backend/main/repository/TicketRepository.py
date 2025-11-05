from .BaseRepository import BaseRepository
from main.models import *

class TicketRepository(BaseRepository):
    def __init__(self):
        super().__init__(Ticket)