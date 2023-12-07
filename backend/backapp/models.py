from django.db import models
from django.contrib.auth.models import (
    AbstractUser,
    UserManager as DefaultUserManager,
    Group,
    Permission,
)

# Create your models here.


class Mst_UsrTbl(AbstractUser):
    name = models.CharField(max_length=255, null=True)
    email = models.EmailField(null=True)
    ContactNo = models.BigIntegerField(null=True, default="9999999999")
    address = models.TextField()
    is_verified=models.BooleanField(default=False)
   