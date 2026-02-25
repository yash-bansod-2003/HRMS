import { httpClient } from "@/lib/http-client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { type Employee } from "@/components/dashboard/employees/columns";
import { columns } from "@/components/dashboard/attendance/columns";
import { DataTable } from "@/components/dashboard/employees/data-table";

const formSchema = z.object({
  date: z.string().min(1, "Please select a date."),
  status: z.enum(
    ["PRESENT", "ABSENT", "LEAVE"],
    "Please select a valid status.",
  ),
  employee: z.string().min(1, "Please select an employee."),
});

const AttendancePage = () => {
  const employeesQuery = useQuery({
    queryKey: ["auth/employees"],
    queryFn: async () => {
      const response = await httpClient.get("/api/employees/?format=json");
      return response.data;
    },
  });

  const attendanceQuery = useQuery({
    queryKey: ["auth/attendance"],
    queryFn: async () => {
      const response = await httpClient.get("/api/attendance/?format=json");
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await httpClient.post("/api/attendance/", data);
      return response.data;
    },
    onSuccess: () => {
      attendanceQuery.refetch();
      form.reset();
      toast.success("Attendance record created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create attendance record. Please try again.");
      console.error("Error creating attendance record:", error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      employee: "",
      status: "PRESENT",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    mutation.mutate(data);
  }

  if (employeesQuery.isLoading || attendanceQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!employeesQuery.data) {
    return <Navigate to="/" replace />;
  }

  if (!attendanceQuery.data) {
    return <Navigate to="/" replace />;
  }

  if (!attendanceQuery.isLoading && !attendanceQuery.data) {
    return <Navigate to="/" replace />;
  }

  console.log(attendanceQuery.data);

  if (attendanceQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 space-y-4">
      <DashboardHeader
        heading="Attendance"
        text="Manage your employees' attendance records"
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Add Attendance
            </Button>
          </SheetTrigger>
          <SheetContent>
            <form
              className="h-full flex flex-col justify-between"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <SheetHeader>
                <SheetTitle>Add Attendance Record</SheetTitle>
                <SheetDescription>
                  Fill in the details to record attendance.
                </SheetDescription>
              </SheetHeader>
              <div className="w-full p-4 flex flex-col gap-2">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Employee Information</CardTitle>
                    <CardDescription>
                      Enter the employee's personal and work details.
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
                            <FieldLabel htmlFor="employee-name">
                              Employee
                            </FieldLabel>
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                id="employee-name"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[200px]"
                              >
                                <SelectValue placeholder="Select employee" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                {employeesQuery.data.map((emp: Employee) => (
                                  <SelectItem
                                    key={emp.id}
                                    value={emp.id.toString()}
                                  >
                                    {emp.name}
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
                            <FieldLabel htmlFor="employee-status">
                              Status
                            </FieldLabel>
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                id="employee-status"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[200px]"
                              >
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                {["PRESENT", "ABSENT"].map(
                                  (status) => (
                                    <SelectItem key={status} value={status}>
                                      {status}
                                    </SelectItem>
                                  ),
                                )}
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
                      Select the date for the attendance record.
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
                              <FieldLabel htmlFor="attendance-date">
                                Date
                              </FieldLabel>
                              <FieldDescription>
                                Select the attendance date.
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
                                    ? new Date(field.value).toLocaleDateString()
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
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  defaultMonth={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  captionLayout="dropdown"
                                  onSelect={(date) => {
                                    if (date) {
                                      field.onChange(
                                        date.toISOString().split("T")[0],
                                      );
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
              <SheetFooter>
                <Button type="submit" disabled={mutation.isPending}>
                  Add Record
                </Button>
                <SheetClose asChild>
                  <Button variant="outline" onClick={() => form.reset()}>
                    Cancel
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </DashboardHeader>
      <DataTable columns={columns} data={attendanceQuery.data || []} />
    </div>
  );
};

export default AttendancePage;
