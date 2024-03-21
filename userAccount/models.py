
from django.db import models
from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    account_id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.username
    
    def update_Details(self, new_username, new_email, new_phone_number, new_name):
        if new_username:
            self.username = new_username
        if new_email:
            self.email = new_email
        if new_phone_number:
            self.phone_number = new_phone_number
        if new_name:
            self.name = new_name
        self.save()


class Patient(Account):
    STATUS_CHOICES = [
        ('covid', 'COVID'),
        ('normal', 'Normal'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_applicable')
    role = 'patient'

    

class Doctor(Account):
    role = 'doctor'

class SystemAdmin(Account):
    role = 'system_admin'

