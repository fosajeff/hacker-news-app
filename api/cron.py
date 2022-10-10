from django_cron import CronJobBase, Schedule
from .helpers import get_latest_hacker_item

from .utils import get_random_string


class HackerItemCronJob(CronJobBase):
    JOB_INTERVAL = 5  # every 5 minutes
    JOB_RETRY_TIME = 1

    schedule = Schedule(run_every_mins=JOB_INTERVAL,
                        retry_after_failure_mins=JOB_RETRY_TIME)
    code = get_random_string(10)

    def do(self):
        get_latest_hacker_item()
