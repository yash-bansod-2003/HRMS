import { useEffect, useState } from "react"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  IconUsers,
  IconUserCheck,
  IconUserX,
  IconCalendarStats,
} from "@tabler/icons-react"
import { httpClient } from "@/lib/http-client"

interface DashboardStats {
  total_employees: number
  present_today: number
  absent_today: number
  monthly_attendance_rate: number
}

const DashboardHomePage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    httpClient.get<DashboardStats>("/api/stats/").then((res) => {
      setStats(res.data)
    })
  }, [])

  const attendanceRateGood = (stats?.monthly_attendance_rate ?? 0) >= 80

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Employees</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.total_employees ?? "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUsers className="size-3" />
              All time
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Registered staff <IconUsers className="size-4" />
          </div>
          <div className="text-muted-foreground">Across all departments</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Present Today</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.present_today ?? "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUserCheck className="size-3" />
              Today
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Employees checked in <IconUserCheck className="size-4" />
          </div>
          <div className="text-muted-foreground">Marked present for today</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Absent Today</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.absent_today ?? "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUserX className="size-3" />
              Today
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Employees absent <IconUserX className="size-4" />
          </div>
          <div className="text-muted-foreground">Marked absent for today</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Attendance Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats ? `${stats.monthly_attendance_rate}%` : "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCalendarStats className="size-3" />
              This month
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {attendanceRateGood ? "On track" : "Needs attention"}{" "}
            <IconCalendarStats className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Present records vs total this month
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default DashboardHomePage 