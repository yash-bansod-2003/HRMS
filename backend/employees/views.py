from rest_framework import mixins, status, viewsets
from rest_framework.response import Response

from .models import Employee
from .serializers import EmployeeSerializer


# Create your views here.
class EmployeeViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Employee.objects.all().order_by("-created_at")
    serializer_class = EmployeeSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Employee deleted successfully."}, status=status.HTTP_200_OK
        )
