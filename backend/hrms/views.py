from datetime import date

from django.db.models import Count, Q
from rest_framework.decorators import api_view
from rest_framework.response import Response

from attendance.models import Attendance
from employees.models import Employee


@api_view(["GET"])
def dashboard_stats(request):
    today = date.today()
    current_month = today.month
    current_year = today.year

    total_employees = Employee.objects.count()

    today_attendance = Attendance.objects.filter(date=today)
    present_today = today_attendance.filter(status="PRESENT").count()
    absent_today = today_attendance.filter(status="ABSENT").count()

    monthly = Attendance.objects.filter(
        date__month=current_month, date__year=current_year
    ).aggregate(
        total=Count("id"),
        present=Count("id", filter=Q(status="PRESENT")),
    )
    monthly_total = monthly["total"] or 0
    monthly_present = monthly["present"] or 0
    attendance_rate = (
        round((monthly_present / monthly_total) * 100, 1) if monthly_total > 0 else 0.0
    )

    return Response(
        {
            "total_employees": total_employees,
            "present_today": present_today,
            "absent_today": absent_today,
            "monthly_attendance_rate": attendance_rate,
        }
    )
