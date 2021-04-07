from rest_framework import serializers
from users.models import Customuser
from address.models import Address
from address.serializers import AddressSerializer


class CustomUserDetailSerializer(serializers.ModelSerializer):
    address = AddressSerializer(serializers.ModelSerializer)

    class Meta:
        model = Customuser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'phone', 'address')

    def create(self, validated_data):
        address = validated_data.pop('address')
        user = Customuser(**validated_data)
        user.save()
        serializer = AddressSerializer(data=address)
        if serializer.is_valid(raise_exception=True):
            serializer.save(customuser=user)

        return user

    def update(self, instance, validated_data):
        address = validated_data.pop('address')

        address_instance = Address.objects.get(customuser=instance.id) # TODO poprawic
        address_instance.street = address.get('street', address_instance.street)
        address_instance.local_number = address.get('local_number', address_instance.local_number)
        address_instance.postal_code = address.get('postal_code', address_instance.postal_code)
        address_instance.city = address.get('city', address_instance.city)
        address_instance.country = address.get('country', address_instance.country)

        address_instance.save()

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.phone = validated_data.get('phone', instance.phone)

        instance.save()

        return instance
