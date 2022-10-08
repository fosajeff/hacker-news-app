import requests
from .models import Item


def get_latest_hacker_items(length):
    r = requests.get('https://hacker-news.firebaseio.com/v0/newstories.json')
    data = r.json()[:length]
    return data


def sync_hacker_items_to_db(items):
    data = []

    if not items:
        return

    for item_id in items:
        hacker_item_dict = get_hacker_item_by_id(item_id)
        hacker_item_db_object = convert_json_to_db_object(hacker_item_dict)
        data.append(hacker_item_db_object)

    return data
    # Item.objects.bulk_create(data)


def get_hacker_item_by_id(id):
    if not id:
        return

    r = requests.get(f'https://hacker-news.firebaseio.com/v0/item/{id}.json')
    return r.json()


def convert_json_to_db_object(data):
    if not data:
        return

    db_object = Item()
    for k, v in data.items():
        db_object.__setattr__(k, v)

    return db_object
