import { ZodIssue } from 'zod';
import { ApiError } from '../types/api';

export const findError = (errorMap: ApiError[], field: string) => {
    return errorMap.find((e) => e.field === field);
}

export const zodFieldErrors = (errors: ZodIssue[]) => {
    const fieldErrors: ApiError[] = [];

    errors.forEach((e) => {
        fieldErrors.push({
            field: e.path.join("."),
            message: e.message,
        });
    })

    return fieldErrors;
}