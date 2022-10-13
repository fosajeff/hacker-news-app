import os
from datetime import datetime
from django.db import IntegrityError
import requests
from .models import Item

BASE_URL = "https://hacker-news.firebaseio.com/v0"
NUMBER_OF_SEED_ITEMS = os.environ.get(
    'NUMBER_OF_SEED_ITEMS', '')


def get_latest_hacker_items_id(amount):
    try:
        r = requests.get(f'{BASE_URL}/newstories.json')
        data = r.json()[:amount]
        return data
    except ConnectionError as e:
        print("Connection error", e)


def get_hacker_item_by_id(id):
    if not id:
        return

    r = requests.get(f'{BASE_URL}/item/{id}.json')
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
    print(
        f"Fetching {NUMBER_OF_SEED_ITEMS} latest hacker news items to seed database, please wait....")
    hacker_items = get_latest_hacker_items_id(NUMBER_OF_SEED_ITEMS)
    print("Seeding started. This may take some time, please wait...")
    print("App will immediately start after seeding completes")
    return sync_hacker_items_to_db(hacker_items)


# job to run
def get_latest_hacker_item():
    hacker_item_list = get_latest_hacker_items_id(1)
    hacker_item = hacker_item_list[0]
    qs = Item.objects.filter(hacker_item_id=hacker_item)

    if not qs.exists():
        print(f"New item retrieved and synced to DB at {datetime.now()}")
        return sync_hacker_items_to_db(hacker_item_list)

    return


def get_hacker_user(username):
    r = requests.get(f'{BASE_URL}/user/{username}.json')
    data = r.json()
    return data
