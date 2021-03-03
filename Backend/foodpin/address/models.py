from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import Profile


class Address(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    street = models.CharField(max_length=100, default='')
    local_number = models.IntegerField(default=0)
    postal_code = models.CharField(max_length=30, default='')
    city = models.CharField(max_length=50, default='')
    country = models.CharField(max_length=50, default='')
    latitude = models.DecimalField(max_digits=14, decimal_places=10, default=0.0)
    longitude = models.DecimalField(max_digits=14, decimal_places=10, default=0.0)

    def __str__(self):
        return f'{self.street} {self.local_number}, {self.postal_code} {self.city}'


@receiver(post_save, sender=Profile)
def create_user_address(sender, instance, created, **kwargs):
    if created:
        Address.objects.create(profile=instance)


@receiver(post_save, sender=Profile)
def save_user_address(sender, instance, **kwargs):
    instance.address.save()
