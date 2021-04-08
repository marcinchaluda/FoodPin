from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer

from .models import Donation, Unit
from users.models import Customuser
from .serializers import DonationsListSerializer, DonationCreateSerializer, UnitSerializer
from address.serializers import AddressSerializer

from django.http import HttpResponse


class ListDonations(generics.ListCreateAPIView):
    permission_classes = IsAuthenticatedOrReadOnly,

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return DonationCreateSerializer
        return DonationsListSerializer

    queryset = Donation.objects.all()


@api_view(['GET'])
def get_init_data(request, user_id):
    units = Unit.objects.all()
    units_serializer = UnitSerializer(units, many=True)

    user = Customuser.objects.filter(id=user_id).first()
    address = "" if user is None else user.address
    address_serializer = AddressSerializer(address)

    data = {'address': address_serializer.data, 'units': units_serializer.data}

    return HttpResponse(JSONRenderer().render(data))
