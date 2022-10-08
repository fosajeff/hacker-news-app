import datetime
from django.db.models import Model, CharField, TextField, BooleanField, IntegerField

from .utils import convert_utc_timezone_to_unix_timestamp, generate_random_user_id

ITEM_TYPE = (
    ('j', 'job'),
    ('s', 'story'),
    ('c', 'comment'),
    ('p', 'poll'),
    ('po', 'pollopt')
)


class Item(Model):
    title = CharField(max_length=100, null=True, blank=True)
    hacker_item_id = CharField(
        max_length=50, null=True, blank=True, editable=False)
    type = CharField(max_length=2, choices=ITEM_TYPE, default='s')
    time = CharField(max_length=50, default=convert_utc_timezone_to_unix_timestamp(
        datetime.datetime.utcnow()))
    by = CharField(max_length=50, default=generate_random_user_id)
    url = CharField(max_length=100, null=True, blank=True)
    score = IntegerField(default=0)
    text = TextField(null=True, blank=True)
    is_hacker_item = BooleanField(default=True)

    def __str__(self):
        return self.title if self.title else f'Latest from {self.by}'

    class Meta:
        verbose_name_plural = "Items"
