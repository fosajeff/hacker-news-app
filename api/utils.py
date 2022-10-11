import calendar
from random import choice as random_choice
from string import digits as string_digits


def generate_random_id(prefix='user', random_id_length=4):
    random_user_id = f"{prefix}" + \
        ''.join([random_choice(string_digits)
                for _ in range(random_id_length)])
    return random_user_id


def convert_utc_timezone_to_unix_timestamp(date):
    utc_time = calendar.timegm(date.utctimetuple())
    return utc_time
