from django.contrib import admin
from django.urls import include, path

from api.scheduler import start_jobs

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("api.urls")),
]


start_jobs()