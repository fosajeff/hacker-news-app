from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework import status

from .helpers import get_hacker_user

from .models import Item
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ViewSet):
    paginate_by = 5
    """
    API endpoint for GET, POST, PUT, DELETE Hacker Item.
    """
    queryset = Item.objects.all().order_by('-time_added_to_db')

    def list(self, request):
        query_param = request.query_params.get("type")
        search_query = request.query_params.get("search")

        if search_query:
            item_qs = Item.objects.filter(
                Q(title__icontains=search_query)).order_by(
                '-time_added_to_db')

        elif query_param == "":
            serializer = ItemSerializer(self.queryset, many=True)
            return Response(serializer.data)
        else:
            item_qs = Item.objects.filter(type=query_param).order_by(
                '-time_added_to_db')

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


@api_view(['GET'])
def get_user(request, username):
    """
    API endpoint that returns hacker user by username
    """

    user = get_hacker_user(username)
    return Response(user, status.HTTP_200_OK)
