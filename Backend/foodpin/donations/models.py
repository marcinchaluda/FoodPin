from django.db import models
from users.models import Customuser
from address.models import Address


class Status(models.Model):
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class Unit(models.Model):
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class Donation(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=2000)
    photo_url = models.CharField(max_length=300, blank=True)
    preferred_time = models.CharField(max_length=100, blank=True)
    distance = models.DecimalField(max_digits=9, decimal_places=2, blank=True)
    create_date = models.DateField(auto_now_add=False)
    pickup_date = models.DateField()
    quantity = models.IntegerField()
    status = models.ForeignKey(Status, on_delete=models.CASCADE, default=1)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)
    user = models.ForeignKey(Customuser, on_delete=models.CASCADE, related_name='owner')
    recipient = models.ForeignKey(Customuser, models.SET_NULL, blank=True, null=True, related_name='recipient')
    address = models.OneToOneField(Address, models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        if not self.id:
            address = Address()
            address.save()
            self.address = address
        super(Donation, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
