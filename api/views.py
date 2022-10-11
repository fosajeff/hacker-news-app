from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status

from .models import Item
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ViewSet):
    """
    API endpoint for GET, POST, PUT, DELETE Hacker Item.
    """
    queryset = Item.objects.all().order_by('-time_added_to_db')

    def list(self, request):
        query_param = request.query_params.get("type")
        item_qs = Item.objects.filter(type=query_param).order_by(
            '-time_added_to_db') or self.queryset
        serializer = ItemSerializer(item_qs, many=True)
        return Response(serializer.data)

    def create(self, request):
        form_data = request.data
        title = form_data.get("title") or ""
        type = form_data.get("type") or ""
        text = form_data.get("text") or ""
        item = Item.objects.create(
            title=title,
            type=type,
            text=text,
            is_hacker_item=False
        )
        serializer = ItemSerializer(item)
        return Response(serializer.data, status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    def update(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk)

        # Check if item is hacker item
        if item.hacker_item_id:
            return Response(status.HTTP_403_FORBIDDEN)

        form_data = request.data

        item.title = form_data.get("title") or item.title
        item.type = form_data.get("type") or item.type
        item.text = form_data.get("text") or item.text
        item.save()

        return Response(status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk)
        
        # Check if item is hacker item
        if item.hacker_item_id:
            return Response(status.HTTP_403_FORBIDDEN)

        item.delete()
        return Response(status.HTTP_204_NO_CONTENT)
