from django.contrib import admin
from .models import Upload


@admin.register(Upload)
class UploadAdmin(admin.ModelAdmin):
    list_display = ("name", "document", "image", "uploaded_at")
