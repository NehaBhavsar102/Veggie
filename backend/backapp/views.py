import random
from django.shortcuts import render
from datetime import datetime, timedelta
import pandas as pd
from django.http import JsonResponse
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from django.views import View
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import *
from rest_framework.permissions import AllowAny
from rest_framework.decorators import (
    APIView,
    permission_classes,
    authentication_classes,
    api_view,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.decorators import method_decorator
from datetime import date
from django.db.models import Sum
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.mail import send_mail
from django.conf import settings
from sqlalchemy import create_engine

@method_decorator(csrf_exempt, name="dispatch")
class signup(APIView):
    def post(self, request):
        
        username=request.data.get('username')
        name=request.data.get('name')
        password=request.data.get('password')
        email=request.data.get('email')
        address=request.data.get('address')
        contact=request.data.get('contact')

        
        
        
        
        if Mst_UsrTbl.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists."}, status=status.HTTP_409_CONFLICT
            )
        if Mst_UsrTbl.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists."}, status=status.HTTP_409_CONFLICT
            )

        user = Mst_UsrTbl.objects.create_user(
            username=username,
            password=password,
            name=name,
            ContactNo=contact,
            email=email,
    
            address=address,
        )
        # subject = "Sign Up"
        # message = f"Hello {user.name},Signed up successfully"
        # from_email = settings.EMAIL_HOST_USER
        # to_email = [user.email]
        # send_mail(subject, message, from_email, to_email)
        
        return Response({'message': 'Signup successfull'}, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name="dispatch")
class login(APIView):
    def post(self,request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            data = {
                "message": "Login Successful",
                "username": user.username,
                "first_name": user.name,
                "access_token": access_token,
                "id": user.id,
                "refresh": str(refresh),
                "login_status": 1,
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"message" : "Invalid Credentials"},status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name="dispatch")
class logout(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"message": "Logout Successful!"}, status=status.HTTP_200_OK
            )
        except Exception:
            return Response(
                {"message": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST
            ) 

class ProductList(APIView):
    def get(self,request):
        try:
            products=Products.objects.all()
        
            product_data = pd.DataFrame(
                    Products.objects.values(
                        "id", "title", "description", "image_url",
                    )
                )
            product_data= product_data.to_dict(orient="records")
            print(product_data)
            

            return JsonResponse(product_data,safe=False, status=status.HTTP_200_OK)
        
        
        except Exception:
            return JsonResponse(
                {"message" : "Something Went Wrong"},status=status.HTTP_400_BAD_REQUEST
            )
class CartProductList(APIView):
    def post(self,request):
        cart=request.data
        try:
            if cart is None:
               return JsonResponse(
                   {"message" : "Cart is Empty"},status=status.HTTP_400_BAD_REQUEST
               )
            else:
                print(cart)
                cart_list = cart["cart"]
                print(cart_list)
                match_products = pd.DataFrame(
                    Products.objects.filter(id__in=cart_list).values(
                        "id", "title", "image_url","description",
                    )
                )
                print(match_products)
                

                match_products = match_products.to_dict(orient="records")
                return JsonResponse(match_products,safe=False, status=status.HTTP_200_OK)
            

        except Exception:
            return JsonResponse(
                {"message" : "Something Went Wrong"},status=status.HTTP_400_BAD_REQUEST
            )

class placeOrder(APIView):
    def post(self,request):
        try:

            print("place order")
            data = json.loads(request.body)
            order = data.get('order', {})
            username = data.get('username', '')
            print(username)
            match_user = Mst_UsrTbl.objects.filter(username=username).values(
                        "id","username","name","address"
                    )
                
            if match_user.exists():
                user_id = match_user[0]['id']
                print(user_id)
           

            for product_id, details in order.items():
                quantity = details.get('quantity')
                print(f"Product ID: {product_id}, Quantity: {quantity}")
                place_order=Order.objects.create(
                    user_id_id=user_id,
                    product_id_id=product_id,
                    quantity=quantity,
                )
                print()
                print(place_order)
            
               
           


            return JsonResponse({"message" : "Order place successful"},safe=False, status=status.HTTP_200_OK)
        except Exception:
            return JsonResponse(
                {"message" : "Something Went Wrong"},status=status.HTTP_400_BAD_REQUEST
            )

class viewOrder(APIView):
    def post(self,request):
        try:
            print("in view order")
            data = json.loads(request.body)
            username=data.get('username','')
            match_user = Mst_UsrTbl.objects.filter(username=username).values(
                        "id"
                    )
                
            if match_user.exists():
                user_id = match_user[0]['id']
                print(user_id)

            user_orders=pd.DataFrame(
            Order.objects.filter(user_id_id=user_id).values(
                "product_id_id","quantity","orderDate","status"
            )
            )
            print(user_orders)
            product_list=[]
            for i, row in user_orders.iterrows():
                product_id=row['product_id_id']
                product_list.append(product_id)

            match_products=pd.DataFrame(
                Products.objects.filter(id__in=product_list).values(
                   "id", "title","description"
                )
            )
            # print(match_products)
           
            overall_order = pd.merge(
                user_orders, match_products, left_on="product_id_id", right_on="id", how="inner"
            )
           
            overall_order = overall_order.to_dict(orient="records")
            print(overall_order)
           
            
            return JsonResponse(
                overall_order,safe=False,status=status.HTTP_200_OK
            )
        
        except Exception:
             return JsonResponse(
                {"message" : "Something Went Wrong"},status=status.HTTP_400_BAD_REQUEST
            )
    

        
           
        
        
