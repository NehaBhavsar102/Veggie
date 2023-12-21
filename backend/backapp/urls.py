from django.urls import path, include
from .views import *


urlpatterns = [
    path("signup/", signup.as_view(), name="signup"),
    path("products/", ProductList.as_view(), name="products"),
    path("login/", login.as_view(), name="login"),
    path("logout/", logout.as_view(), name="logout"),
    path("carts/",CartProductList.as_view(),name="carts")
   
]
