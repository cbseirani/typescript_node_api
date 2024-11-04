export class NotValidError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "NotValidError";
        this.statusCode = 400;
    }
}