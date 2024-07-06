from django.urls import path

from .views import (
    CheckAuthAPIView,
    ProfileCreateAPIView, 
    ProfileDetailAPIView,
    UserCreateAPIView, 
    UserDetailAPIView, 
    UserLoginAPIView,

)

app_name = "api_user"

urlpatterns = [
    
    path('check-auth/', CheckAuthAPIView.as_view(), name='api_check_auth'),
     path('login/', UserLoginAPIView.as_view(), name='api_login'),
    path('register/', UserCreateAPIView.as_view(), name='api_register'),
   
    path('user/<int:pk>/', UserDetailAPIView.as_view(), name='api_user_detail'),
    path('profile/', ProfileCreateAPIView.as_view(), name='api_profile_create'),
    path('profile/<int:pk>/', ProfileDetailAPIView.as_view(), name='api_profile_detail'),
]
