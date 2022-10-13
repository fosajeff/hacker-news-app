from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        from .helpers import run_db_seeder
        from .models import Item
        qs = Item.objects.all()
        if not qs.exists():
            run_db_seeder()
