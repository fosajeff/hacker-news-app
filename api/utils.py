import calendar
from random import choice as random_choice
from string import digits as string_digits


def generate_random_user_id():
    random_user_id = f"{'user'}" + \
        ''.join(get_random_string(4))
    return random_user_id


def convert_utc_timezone_to_unix_timestamp(date):
    utc_time = calendar.timegm(date.utctimetuple())
    return utc_time


def get_random_string(length):
    return [random_choice(string_digits) for _ in range(length)]
