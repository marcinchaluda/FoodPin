from rest_framework import serializers
from django.contrib.auth.models import User
from address.models import Address
from users.models import Profile


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('street', 'local_number', 'postal_code', 'city', 'country', 'latitude', 'longitude')


class ProfileSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Profile
        fields = ('phone', 'address')


class CustomUserDetailSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(serializers.ModelSerializer)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'profile')
