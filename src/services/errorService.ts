import { NotFoundError } from '../errors/notFoundError';
import { NotValidError } from '../errors/notValidError';
import { ForbiddenError } from '../errors/forbiddenError';
import { UnauthorizedError } from '../errors/unauthorizedError';


export class ErrorService{
    async ThrowNotFound(){ throw new NotFoundError('Weather data not found'); }
    async ThrowNotValid(){ throw new NotValidError('Request is not valid'); }
    async ThrowUnauthorized(){ throw new UnauthorizedError('User is unauthorized'); }
    async ThrowForbidden(){ throw new ForbiddenError('This action is forbidden'); }
}