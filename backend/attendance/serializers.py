from rest_framework import serializers
from .models import Attendance
from django.utils import timezone

class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.ReadOnlyField(source="employee.name")

    class Meta:
        model = Attendance
        fields = "__all__"
        read_only_fields = ("id", "created_at")

    def validate_date(self, value):
        if value > timezone.now().date():
            raise serializers.ValidationError(
                "Attendance date cannot be in the future."
            )
        return value

    def validate(self, data):
        employee = data.get("employee")
        date = data.get("date")

        if Attendance.objects.filter(employee=employee, date=date).exists():
            raise serializers.ValidationError(
                "Attendance already marked for this employee on this date."
            )
        return data