from django.db import models
from django.contrib.auth.models import AbstractUser
from ..address.models import Address


class CustomUser(AbstractUser):
    address = models.OneToOneField(Address, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
