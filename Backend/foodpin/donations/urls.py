from django.urls import path
from .views import ListDonations

urlpatterns = [
    path('', ListDonations.as_view()),
]