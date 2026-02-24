from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Employee
from .serializers import EmployeeSerializer

# Create your views here.
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all().order_by("-created_at")
    serializer_class = EmployeeSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Employee deleted successfully."},
            status=status.HTTP_200_OK
        )