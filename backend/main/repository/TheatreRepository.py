from .BaseRepository import BaseRepository
from main.models import *
from django.db.models import *
from django.db.models.functions import *


class TheatreRepository(BaseRepository):
    def __init__(self):
        super().__init__(Theatre)

    def rating(self):
        return self.model.objects.annotate(rating=Avg("hall__schedule__play__playrating__rating")).order_by("-rating")

    def daily_tickets(self):
        return (
            self.model.objects.filter(hall__schedule__ticket__status="проданий")
            .values("name", date=F("hall__schedule__date"))
            .annotate(
                income=Sum("hall__schedule__ticket__price"), tickets_sold=Count("hall__schedule__ticket__ticket_id")
            )
        )
