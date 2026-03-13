
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/http-client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";

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
  department: z.string().min(1, "Please select a department."),
});


const EmployeeCreatePage = () => {
  const query = useQuery({
    queryKey: ["auth/employees"],
    queryFn: async () => {
      const response = await httpClient.get("/api/employees/?format=json");
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await httpClient.post("/api/employees/", data);
      return response.data;
    },
    onSuccess: () => {
      query.refetch();
      form.reset();
      toast.success("Employee created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create employee. Please try again.");
      console.error("Error creating employee:", error);
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
    mutation.mutate(data);
  }

  return (
    <div className="px-4 lg:px-6">
      <form
        className="h-full flex flex-col justify-between"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DashboardHeader
          heading="Create Employee"
          text="Fill in the details to create a new employee."
        >
          <Button type="submit" disabled={mutation.isPending}>
            <PlusCircle className="mr-2" /> Create Employee
          </Button>
        </DashboardHeader>
        <div className="w-full py-4 flex flex-col gap-4">
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
                  disabled={mutation.isPending}
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
                  disabled={mutation.isPending}
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
                  disabled={mutation.isPending}
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
      </form>
    </div>
  );
}

export default EmployeeCreatePage;