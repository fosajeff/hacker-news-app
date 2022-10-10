from django.db import IntegrityError
import requests
from .models import Item


def get_latest_hacker_items_id(amount):
    r = requests.get('https://hacker-news.firebaseio.com/v0/newstories.json')
    data = r.json()[:amount]
    return data


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

        if k == 'id':
            k = 'hacker_item_id'  # rename id

        db_object.__setattr__(k, v)

    return db_object


def sync_hacker_items_to_db(items):
    data = []

    if not items:
        return

    for item_id in items:
        hacker_item_dict = get_hacker_item_by_id(item_id)
        hacker_item_db_object = convert_json_to_db_object(hacker_item_dict)
        data.append(hacker_item_db_object)

    try:
        return Item.objects.bulk_create(data)
    except IntegrityError:
        for obj in data:
            try:
                obj.save()
            except IntegrityError:
                continue
        pass


# app start seed function
def run_db_seeder():
    print("Fetching 10 latest hacker news items to seed database, please wait....")
    hacker_items = get_latest_hacker_items_id(10)
    print("Seeding started. This may take some time, please wait...")
    print("App will immediately start after seeding completes")
    return sync_hacker_items_to_db(hacker_items)


# job to run
def get_latest_hacker_item():
    hacker_item_list = get_latest_hacker_items_id(1)
    hacker_item = hacker_item_list[0]
    qs = Item.objects.filter(hacker_item_id=hacker_item)

    if not qs.exists():
        return sync_hacker_items_to_db(hacker_item_list)

    return
