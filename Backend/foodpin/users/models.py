from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from address.models import Address


class Customuser(AbstractUser):
    phone = models.CharField(max_length=15)
    avatar_url = models.CharField(max_length=300, default='default_avatar')
    address = models.OneToOneField(Address, models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        if not self.id:
            address = Address()
            address.save()
            self.address = address
        super(Customuser, self).save(*args, **kwargs)
