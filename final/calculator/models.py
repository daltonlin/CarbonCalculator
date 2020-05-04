from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    pass


class Trip(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="users", null=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    distance_miles = models.IntegerField()
    distance_km = models.IntegerField()
    result = models.IntegerField()
    departure_loc = models.CharField(max_length=60)
    arrival_loc = models.CharField(max_length=60)
