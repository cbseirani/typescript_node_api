import { NotFoundError } from '../errors/notFoundError';
import { NotValidError } from '../errors/notValidError';


export class ErrorService{
    async ThrowNotFound(){ throw new NotFoundError('Weather data not found'); }
    async ThrowNotValid(){ throw new NotValidError('Location parameter is required'); }
}