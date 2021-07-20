import express = require('express');
import { getTermsController, processTermsController, deleteTermsController } from '../../controllers/Terms';

const termsRouter = express.Router();

termsRouter.get('/', getTermsController);
termsRouter.get('/:term_id', getTermsController);
termsRouter.post('/', processTermsController);
termsRouter.delete('/:term_id', deleteTermsController);

export default termsRouter;