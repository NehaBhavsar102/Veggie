from rest_framework import serializers
from .models import Mst_UsrTbl

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=Mst_UsrTbl
        fields=['name','username','password','email','ContactNo','address','is_verified']
