import z from "zod";

export const getUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
})

export const getUsersSchema = z.array(getUserSchema)

export type GetUsersSchema = z.infer<typeof getUsersSchema>
export type GetUserSchema = z.infer<typeof getUserSchema>