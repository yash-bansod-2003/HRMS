import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import * as z from "zod";

import { httpClient } from "@/lib/http-client";
import { Loading } from "@/components/loading";
import { DashboardHeader } from "@/components/dashboard-header";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Employee } from "@/components/dashboard/employees/columns";

const attendanceStatuses = ["PRESENT", "ABSENT"] as const;

const formSchema = z.object({
  date: z.string().min(1, "Please select a date."),
  status: z.enum(attendanceStatuses, "Please select a valid status."),
  employee: z.string().min(1, "Please select an employee."),
});

const AttendanceEditPage = () => {
  const params = useParams();
  const attendanceId = params.id;
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      employee: "",
      status: "PRESENT",
    },
  });

  const employeesQuery = useQuery({
    queryKey: ["auth/employees"],
    queryFn: async () => {
      const response = await httpClient.get("/api/employees/?format=json");
      return response.data;
    },
  });

  const attendanceQuery = useQuery({
    queryKey: ["auth/attendance", attendanceId],
    enabled: !!attendanceId,
    queryFn: async () => {
      const response = await httpClient.get(`/api/attendance/${attendanceId}/?format=json`);
      return response.data;
    },
  });

  useEffect(() => {
    if (!attendanceQuery.data) return;

    form.reset({
      date: attendanceQuery.data.date ?? "",
      status: attendanceQuery.data.status ?? "PRESENT",
      employee: attendanceQuery.data.employee
        ? String(attendanceQuery.data.employee)
        : "",
    });
  }, [attendanceQuery.data, form]);

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (!attendanceId) {
        throw new Error("Attendance id is missing from route params");
      }

      const payload = {
        ...data,
        employee: Number(data.employee),
      };

      const response = await httpClient.put(`/api/attendance/${attendanceId}/`, payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Attendance record updated successfully!");
      navigate("/dashboard/attendance");
    },
    onError: (error) => {
      toast.error("Failed to update attendance record. Please try again.");
      console.error("Error updating attendance record:", error);
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutation.mutate(data);
  }

  if (!attendanceId) {
    return <Navigate to="/dashboard/attendance" replace />;
  }

  if (attendanceQuery.isLoading || employeesQuery.isLoading) {
    return <Loading />;
  }

  if (attendanceQuery.isError || !attendanceQuery.data) {
    return <Navigate to="/dashboard/attendance" replace />;
  }

  if (!employeesQuery.data) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="px-4 lg:px-6">
      <form
        className="h-full flex flex-col justify-between"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DashboardHeader
          heading="Edit Attendance"
          text="Update attendance details for this record."
        >
          <Button type="submit" disabled={mutation.isPending}>
            <PlusCircle className="mr-2" /> Update Attendance
          </Button>
        </DashboardHeader>
        <div className="w-full py-4 flex flex-col gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Attendance Details</CardTitle>
              <CardDescription>
                Select the employee and attendance status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Controller
                  name="employee"
                  control={form.control}
                  disabled={mutation.isPending}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="attendance-employee">
                        Employee
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="attendance-employee"
                          aria-invalid={fieldState.invalid}
                          className="min-w-50"
                        >
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          {employeesQuery.data.results.map((employee: Employee) => (
                            <SelectItem
                              key={employee.id}
                              value={employee.id.toString()}
                            >
                              {employee.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="status"
                  control={form.control}
                  disabled={mutation.isPending}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="attendance-status">Status</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="attendance-status"
                          aria-invalid={fieldState.invalid}
                          className="min-w-50"
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          {attendanceStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Attendance Date</CardTitle>
              <CardDescription>
                Select the date for this attendance entry.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Controller
                  name="date"
                  control={form.control}
                  disabled={mutation.isPending}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldLabel htmlFor="attendance-date">Date</FieldLabel>
                        <FieldDescription>
                          Choose the attendance date.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="attendance-date"
                            className="justify-start font-normal"
                          >
                            {field.value
                              ? format(parseISO(field.value), "PPP")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? parseISO(field.value) : undefined
                            }
                            defaultMonth={
                              field.value ? parseISO(field.value) : undefined
                            }
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(format(date, "yyyy-MM-dd"));
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </Field>
                  )}
                />
              </FieldGroup>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default AttendanceEditPage;