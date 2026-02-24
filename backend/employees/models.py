from django.db import models

# Create your models here.

department_choices = [
    ("HR", "Human Resources"),
    ("IT", "Information Technology"),
    ("Sales", "Sales"),
]


class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=50, choices=department_choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"
