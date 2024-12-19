import z from "zod";

export const getUserSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
})).describe('List of users')

export type GetUserSchema = z.infer<typeof getUserSchema>