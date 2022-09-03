import { z } from 'zod';

const frameZodSchema = z.object({
  material: z.string({
    required_error: 'Material is required',
    invalid_type_error: 'Color must be a string',
  }),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be at least 3 characters long' }),
});

type IFrame = z.infer<typeof frameZodSchema>;

export default IFrame;
export { frameZodSchema };