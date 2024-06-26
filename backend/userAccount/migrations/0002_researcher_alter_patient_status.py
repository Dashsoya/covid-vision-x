# Generated by Django 4.2.9 on 2024-05-17 12:34

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('userAccount', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Researcher',
            fields=[
                ('account_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('userAccount.account',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AlterField(
            model_name='patient',
            name='status',
            field=models.CharField(choices=[('Covid', 'Covid'), ('Normal', 'Normal'), ('Pneumonia', 'Pneumonia'), ('Not_Applicable', 'Not_Applicable')], default='Not_Applicable', max_length=20),
        ),
    ]
