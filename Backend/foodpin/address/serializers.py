from address.models import Address
from rest_framework import serializers


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('street', 'local_number', 'postal_code', 'city', 'country', 'latitude', 'longitude')
        read_only_fields = ('id', 'latitude', 'longitude')