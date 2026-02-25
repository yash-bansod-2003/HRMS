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
  { label: "Information Technology", value: "IT" },
  { label: "Human Resources", value: "HR" },
  { label: "Finance", value: "Finance" },
  { label: "Marketing", value: "Marketing" },
] as const;

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Bug name must be at least 5 characters.")
    .max(32, "Bug name must be at most 32 characters."),
  email: z.email("Please enter a valid email address."),
  department: z
    .string()
    .min(2, "Department must be at least 2 characters.")
    .max(32, "Department must be at most 32 characters."),
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
              <PlusCircle className="mr-2" /> Employee
            </Button>
          </SheetTrigger>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create Employee</SheetTitle>
                <SheetDescription>
                  Fill in the details to create a new employee.
                </SheetDescription>
              </SheetHeader>
              <div className="w-full p-4 flex flex-col gap-2">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Bug Report</CardTitle>
                    <CardDescription>
                      Help us improve by reporting bugs you encounter.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FieldGroup>
                      <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                              Name
                            </FieldLabel>
                            <Input
                              {...field}
                              id="form-rhf-demo-title"
                              aria-invalid={fieldState.invalid}
                              placeholder="Login button not working on mobile"
                              autoComplete="off"
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
                            <FieldLabel htmlFor="form-rhf-demo-title">
                              Email
                            </FieldLabel>
                            <Input
                              {...field}
                              id="form-rhf-demo-title"
                              aria-invalid={fieldState.invalid}
                              placeholder="Login button not working on mobile"
                              autoComplete="off"
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
                    <CardTitle>Bug Report</CardTitle>
                    <CardDescription>
                      Help us improve by reporting bugs you encounter.
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
                              <FieldLabel htmlFor="form-rhf-select-language">
                                Department
                              </FieldLabel>
                              <FieldDescription>
                                For best results, select the department you
                                belong to.
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
                                id="form-rhf-select-department"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[120px]"
                              >
                                <SelectValue placeholder="Select" />
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
                <Button type="submit">Save changes</Button>
                <SheetClose asChild>
                  <Button variant="outline" onClick={() => form.reset()}>
                    Close
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </form>
        </Sheet>
      </DashboardHeader>
      <Table>
        <TableCaption>A list of your employees</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data.map((employee: Employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
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
