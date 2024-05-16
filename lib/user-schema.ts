import { TypeOf, boolean, object } from "zod";

export const loginUserSchema = object({
  emailSignup: boolean(),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
