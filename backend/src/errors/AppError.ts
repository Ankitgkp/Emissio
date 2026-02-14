export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class AuthenticationError extends AppError {
    constructor(message = "Missing API key") {
        super(message, 401);
    }
}
export class AuthorizationError extends AppError {
    constructor(message = "Invalid API key") {
        super(message, 403);
    }
}
export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}
export class SmtpError extends AppError {
    constructor(message = "Email delivery failed") {
        super(message, 502);
    }
}

export class RateLimitError extends AppError {
    constructor(message = "Too many requests") {
        super(message, 429);
    }
}
