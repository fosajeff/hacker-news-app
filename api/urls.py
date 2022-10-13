from django.urls import path, include
from rest_framework import routers
from django.contrib import admin
from . import views
#
router = routers.DefaultRouter(trailing_slash=False)
router.register(
    "items", views.ItemViewSet
)


urlpatterns = [
    path("", include(router.urls)),
    path("users/<username>", views.get_user)
]

admin.site.site_header = 'Hacker News'
admin.site.index_title = 'Hacker News Administration'
admin.site.site_title = 'Hacker News Admin'
