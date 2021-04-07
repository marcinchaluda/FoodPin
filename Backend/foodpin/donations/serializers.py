from rest_framework import serializers

from .models import Donation, Unit
from users.models import Customuser


# from address.models import Address
# from address.serializers import AddressSerializer


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customuser
        fields = ['id', 'username']
        read_only_fields = 'username',


class DonationsListSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Donation
        fields = '__all__'
        depth = 1


class DonationCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Customuser.objects.all())
    unit = serializers.PrimaryKeyRelatedField(queryset=Unit.objects.all())

    class Meta:
        model = Donation
        fields = 'user', 'title', 'description', 'distance', 'create_date', 'pickup_date', 'quantity', 'unit'

    def create(self, validated_data):
        user = validated_data.pop('user')
        unit = validated_data.pop('unit')
        donation = Donation(user_id=user.id, unit_id=unit.id, **validated_data)
        donation.save()
        # serializer = AddressSerializer(data=address)
        # if serializer.is_valid(raise_exception=True):
        #     serializer.save(customuser=donation)

        return donation

    #
    # def update(self, instance, validated_data):
    #     instance.save()
    #
    #     return instance
