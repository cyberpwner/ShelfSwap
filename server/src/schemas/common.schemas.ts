import { z } from 'zod';

export const idSchema = z.string({ message: 'id should be a string.' }).uuid({ message: 'id should be a uuid' });
