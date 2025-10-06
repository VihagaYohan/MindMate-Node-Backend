class SuccessResponse {
    success: boolean;
    message: string;
    data: any;

    constructor(success: boolean = true, message: string, data: any) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

export default SuccessResponse;