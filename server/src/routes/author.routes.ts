import express from 'express';
import { AuthorController } from '../controller/Author.controller';
import { CommonValidation } from '../middleware/CommonValidation.middleware';
import { AuthorValidation } from '../middleware/AuthorValidation.middleware';

const router = express.Router();
const authorController = new AuthorController();
const authorValidation = new AuthorValidation();

router.get('/', authorController.getAllAuthors);

router.get('/:id', CommonValidation.validateId, authorController.getAuthorById);

router.post('/', authorValidation.validateCreateAuthor, authorController.createAuthor);

router.put('/:id', CommonValidation.validateId, authorValidation.validateUpdateAuthor, authorController.updateAuthor);

router.delete('/:id', CommonValidation.validateId, authorController.deleteAuthor);

export default router;
