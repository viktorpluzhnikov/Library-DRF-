# Generated by Django 4.1.1 on 2022-10-03 13:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_remove_author_id_author_uid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='author',
            old_name='birthday',
            new_name='birthday_year',
        ),
    ]