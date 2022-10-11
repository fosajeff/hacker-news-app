from django.contrib import admin

from .models import Item


class ItemAdmin(admin.ModelAdmin):
    list_filter = ['type']

admin.site.register(Item, ItemAdmin)