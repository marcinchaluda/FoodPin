from django.db import models


class Address(models.Model):
    street = models.CharField(max_length=100, default='', blank=True)
    local_number = models.IntegerField(default=0, blank=True)
    postal_code = models.CharField(max_length=30, default='', blank=True)
    city = models.CharField(max_length=50, default='', blank=True)
    country = models.CharField(max_length=50, default='', blank=True)
    latitude = models.DecimalField(max_digits=14, decimal_places=10, default=0.0, blank=True)
    longitude = models.DecimalField(max_digits=14, decimal_places=10, default=0.0, blank=True)

    def __str__(self):
        return f'{self.street} {self.local_number}, {self.postal_code} {self.city}'
