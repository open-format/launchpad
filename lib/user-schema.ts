import { TypeOf, boolean, object, string } from "zod";

export const loginUserSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email or password"),
  emailSignup: boolean(),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
