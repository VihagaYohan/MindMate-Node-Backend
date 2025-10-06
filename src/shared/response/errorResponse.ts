class ErrorResponse extends Error {
    statusCode: number;
    message: string;

    constructor(stastusCode: number, message: string) {
        super(message);
        this.statusCode = stastusCode;
        this.message = message;
    }
}

export default ErrorResponse;