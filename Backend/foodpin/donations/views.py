from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Donation
from .serializers import DonationsListSerializer, DonationCreateSerializer


class ListDonations(generics.ListCreateAPIView):
    permission_classes = IsAuthenticatedOrReadOnly,

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return DonationCreateSerializer
        return DonationsListSerializer

    queryset = Donation.objects.all()
