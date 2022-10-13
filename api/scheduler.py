from .helpers import get_latest_hacker_item
from apscheduler.schedulers.background import BackgroundScheduler


def start_jobs():
    scheduler = BackgroundScheduler()

    # Set cron to runs every 5 min.
    cron_job = {'month': '*', 'day': '*', 'hour': '*', 'minute': '*/5'}

    # Add our task to scheduler.
    scheduler.add_job(get_latest_hacker_item, 'cron', **cron_job)

    scheduler.start()
