# Generated by Django 4.1.2 on 2022-10-08 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='time',
            field=models.CharField(default=1665230006, max_length=50),
        ),
    ]
