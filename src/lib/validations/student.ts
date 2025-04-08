
import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().min(4, "Age must be at least 4 years").max(100, "Age cannot exceed 100 years"),
  guardian: z.string().min(2, "Guardian name is required"),
  mobile: z.string().regex(/^[0-9+\-\s]{10,15}$/, "Please enter a valid mobile number"),
  secondaryMobile: z.string().regex(/^[0-9+\-\s]{10,15}$/, "Please enter a valid mobile number").or(z.literal("")),
  smsNotifications: z.boolean().default(false),
  secondarySmsNotifications: z.boolean().default(false),
  email: z.string().email("Please enter a valid email address").or(z.literal("")),
  address: z.string().min(5, "Address must be at least 5 characters"),
  enrollmentDate: z.string(),
  status: z.enum(["Active", "Inactive"])
});

export type StudentFormValues = z.infer<typeof studentSchema>;
