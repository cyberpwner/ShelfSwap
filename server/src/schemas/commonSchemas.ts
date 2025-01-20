import { z } from 'zod';

export const idSchema = z
  .number({ message: 'id should be a number.' })
  .int({ message: 'id should be an integer' })
  .positive({ message: 'id should be positive' })
  .finite({ message: 'id should be finite' });
