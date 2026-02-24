from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        read_only_fields = ("id", "created_at")

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 3:
            raise serializers.ValidationError(
                "Name must be at least 3 characters long."
            )
        return value

    def validate(self, data):
        email = data.get("email")
        if Employee.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {"email": "An employee with this email already exists."}
            )
        return data        