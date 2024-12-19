import z from "zod";

export const authResponseSchema = z.object({
  token: z.string(),
}).describe('Auth response schema')