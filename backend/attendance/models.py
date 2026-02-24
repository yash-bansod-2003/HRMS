from django.db import models

from employees.models import Employee

# Create your models here.
status_choices = [
    ("PRESENT", "Present"),
    ("ABSENT", "Absent"),
]


class Attendance(models.Model):
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="attendances"
    )
    date = models.DateField()
    status = models.CharField(max_length=10, choices=status_choices)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("employee", "date")
        ordering = ["-date"]

    def __str__(self):
        return f"{self.employee.name} - {self.date} - {self.status}"
