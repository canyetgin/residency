import { z } from "zod";

const baseComplexFields = {
  name: z.string().trim().min(1, "İsim alanı boş bırakılamaz"),
};

// Why?
// 1. Contract Protection: Prevents sudden database schema changes from crashing the UI.
// 2. Structural Abstraction: Decouples frontend camelCase models from raw DB snake_case formats.
// 3. Cache Poisoning Prevention: Ensures unexpected/corrupted data never enters Next.js memory.

export const complexDtoSchema = z.object({
  id: z.uuidv4("Geçersiz ID formatı"),
  ...baseComplexFields,
  address: z.string().trim().nullable(),
  createdAt: z.string(),
});

export type ComplexDTO = z.infer<typeof complexDtoSchema>;

export const addComplexSchema = z.object({
  ...baseComplexFields,
  address: z.string().trim().optional(),
});

export type addComplesValues = z.infer<typeof complexDtoSchema>;
