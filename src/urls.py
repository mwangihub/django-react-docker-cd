from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path("", include("app.urls")),
    path("accounts/", include("user.urls")),
    path("admin/", admin.site.urls),
    path(
        "api/",
        include(
            [
                path("home/", include("app.api.urls")),
                path("auth/", include("user.api.urls")),
            ]
        ),
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
