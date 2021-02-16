from django.db import models


class Address(models.Model):
    id = models.IntegerField(primary_key=True)
    street = models.CharField(max_length=100)
    local_number = models.IntegerField()
    postal_code = models.CharField(max_length=30)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    latitude = models.DecimalField(max_digits=14, decimal_places=10)
    longitude = models.DecimalField(max_digits=14, decimal_places=10)

    def __str__(self):
        return f'{self.street} {self.local_number}, {self.postal_code} {self.city}'
