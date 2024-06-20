export enum ResponseCode {
    Success = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    Conflict = 409,
    UnprocessableEntity = 422,
    InternalServerError = 500,
    NotImplemented = 501,
    ServiceUnavailable = 503,
}

export type ApiError = {
    field: string;
    message: string;
}

export type ApiResponse<T> = {
    message: string;
    data: T;
    errors: ApiError[];
}
