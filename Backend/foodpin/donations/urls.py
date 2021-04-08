from django.urls import path

from .views import ListDonations, get_init_data

urlpatterns = [
    path('', ListDonations.as_view()),
    path('init-data/<int:user_id>/', get_init_data)
]
