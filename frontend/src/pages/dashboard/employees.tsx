import { httpClient } from "@/lib/http-client";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const departments = [
  { label: "Human Resources", value: "HR" },
  { label: "Information Technology", value: "IT" },
  { label: "Sales", value: "Sales" },
] as const;

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Employee name must be at least 2 characters.")
    .max(100, "Employee name must be at most 100 characters."),
  email: z.email("Please enter a valid email address."),
  department: z
    .string()
    .min(1, "Please select a department."),
});

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
}

const EmployeesPage = () => {
  const query = useQuery({
    queryKey: ["auth/employees"],
    queryFn: async () => {
      const response = await httpClient.get("/api/employees/?format=json");
      return response.data;
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  if (!query.isLoading && !query.data) {
    return <Navigate to="/" replace />;
  }

  console.log(query.data);

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 space-y-4">
      <DashboardHeader
        heading="Employees"
        text="Manage your employees and their information"
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Add Employee
            </Button>
          </SheetTrigger>
          <SheetContent>
            <form className="h-full flex flex-col justify-between" onSubmit={form.handleSubmit(onSubmit)}>
              <SheetHeader>
                <SheetTitle>Create Employee</SheetTitle>
                <SheetDescription>
                  Fill in the details to create a new employee.
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
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="employee-name">
                              Full Name
                            </FieldLabel>
                            <Input
                              {...field}
                              id="employee-name"
                              aria-invalid={fieldState.invalid}
                              placeholder="John Doe"
                              autoComplete="name"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="employee-email">
                              Email Address
                            </FieldLabel>
                            <Input
                              {...field}
                              id="employee-email"
                              type="email"
                              aria-invalid={fieldState.invalid}
                              placeholder="john.doe@company.com"
                              autoComplete="email"
                            />
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
                    <CardTitle>Work Details</CardTitle>
                    <CardDescription>
                      Configure organizational and operational information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FieldGroup>
                      <Controller
                        name="department"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field
                            orientation="responsive"
                            data-invalid={fieldState.invalid}
                          >
                            <FieldContent>
                              <FieldLabel htmlFor="employee-department">
                                Department
                              </FieldLabel>
                              <FieldDescription>
                                Select the department the employee belongs to.
                              </FieldDescription>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldContent>
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                id="employee-department"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[200px]"
                              >
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                {departments.map((dept) => (
                                  <SelectItem
                                    key={dept.value}
                                    value={dept.value}
                                  >
                                    {dept.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </CardContent>
                </Card>
              </div>
              <SheetFooter>
                <Button type="submit">Create Employee</Button>
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
      <Table>
        <TableCaption>A list of all employees in the system</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data.map((employee: Employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell className="text-right">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline ml-2">
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeesPage;
