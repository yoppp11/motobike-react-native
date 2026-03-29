
export class AppError extends Error {
    public readonly code: string
    public readonly statusCode: number
    public readonly details?: unknown

    constructor (message: string, code: string, statusCode: number, details?: unknown) {
        super(message)
        this.name = this.constructor.name
        this.code = code
        this.statusCode = statusCode
        this.details = details
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ValidationError extends AppError {
    constructor(message: string, details?: unknown) {
        super(message, 'VALIDATION_ERROR', 400, details)
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Autentication required') {
        super(message, 'UNAUTHORIZED_ERROR', 401)
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 'CONFLICT_ERROR', 409)
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Access denied') {
        super(message, 'FORBIDDEN_ERROR', 403)
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 'NOT_FOUND_ERROR', 404)
    }
}

export class RateLimiterError extends AppError {
    constructor(message: string = 'Too many requests') {
        super(message, "RATE_LIMITED_ERROR", 429)
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = 'Internal server error') {
        super(message, "INTERNAL_SERVER_ERROR", 500)
    }
}

export function isAppError(error: unknown): error is AppError {
    return error instanceof AppError
}