from django.urls import path
from .views import return_dummy_donations_data

urlpatterns = [
    path('', return_dummy_donations_data),
]