from django.contrib import admin
from django.urls import path, include
from main.swagger import schema_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('entity/', include('main.urls')),
    path('swagger/', schema_view.with_ui('swagger',
                                         cache_timeout=0),
    name='schmea-swagger-ui')
]
