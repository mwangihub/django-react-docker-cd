from django.db import transaction
from django.contrib.auth import login, authenticate
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import  csrf_exempt ,csrf_protect
from rest_framework import generics, permissions
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_403_FORBIDDEN,
    HTTP_401_UNAUTHORIZED,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from user.models import User, Profile
from user.api.serializers import (
    UserDetailSerializer, 
    ProfileCreateSerializer,
    ProfileDetailSerializer,
    )


@method_decorator(csrf_exempt, name="dispatch")
class UserCreateAPIView(APIView):
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.AllowAny]
    
    def check_password_or_data(self, request):
        password = request.data.get("password")
        password2 = request.data.get("password2")
        if password != password2:
            err = "Account creation failed, check your passwords"
            return self.bad_request(err)
        return request.data
    
    def bad_request(self, error="Unknown"):
        return Response( {
                 "details": f"""
                                Account creation failed. Please try again later. \n
                                Error: {str(error)}
                            """,
                 }, status=HTTP_403_FORBIDDEN )
    
    def post(self, request, *args, **kwargs):
        data = self.check_password_or_data(request)
        # Instead of using transaction.atomic(), 
        # preferably use Celery to handle concurrent transactions.  
        try:
            with transaction.atomic():
                data.pop("password2")
                try:
                    user = User.objects.create_user(**data)
                except Exception as e:
                    return self.bad_request(e)     
        except Exception as e:
             return self.bad_request(e) 
        return Response( {"isAuthenticated": True,
                "details": {
                    "user": self.serializer_class(instance=user).data,
                    "message": "Account created successfully",
                }}, status=HTTP_201_CREATED )

@method_decorator(csrf_exempt, name="dispatch")
class CheckAuthAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = UserDetailSerializer(instance=request.user).data
            return Response( {"isAuthenticated": True,
                "details": {
                    "user": user,
                    "message": "Already authenticated",
                }}, status=HTTP_200_OK )
        return Response( {"isAuthenticated": False,
                "details": {
                    "user": None,
                    "message": "Not authenticated",
                }}, status=HTTP_404_NOT_FOUND )
   
@method_decorator(csrf_exempt, name="dispatch")
class UserLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserDetailSerializer
    
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = UserDetailSerializer(instance=request.user).data
            return Response( {"isAuthenticated": True,
                "details": {
                    "user": user,
                    "message": "Already authenticated",
                }}, status=HTTP_200_OK )
        return Response( {"isAuthenticated": False,
                "details": {
                    "user": None,
                    "message": "Not authenticated",
                }}, status=HTTP_404_NOT_FOUND )
   
    
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            data = UserDetailSerializer(instance=request.user).data
            return Response( {"isAuthenticated": True,
                "details": {
                    "user": data,
                    "message": "Login successful",
                }}, status=HTTP_200_OK )
        return Response( {"isAuthenticated": False,
                "details": {
                    "user": None,
                    "message": "Authentication failed, check your credentials",
                }}, status=HTTP_401_UNAUTHORIZED )

class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProfileCreateAPIView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProfileDetailAPIView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
