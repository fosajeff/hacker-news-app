from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Item
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Hacker items to be viewed.
    """
    queryset = Item.objects.all()
    lookup_field = "type"
    serializer_class = ItemSerializer
