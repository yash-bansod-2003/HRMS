from django.shortcuts import render
from rest_framework import viewsets, mixins
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import Attendance
from .serializers import AttendanceSerializer

# Create your views here.


class AttendanceViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["employee", "date", "status"]
    ordering_fields = ["date"]