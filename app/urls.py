from django.urls import path
from app.views import HomeTemplateView

app_name = "app"
urlpatterns = [
    path("", HomeTemplateView.as_view(), name="home"),
]
