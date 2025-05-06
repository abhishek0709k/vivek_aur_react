class APIError {
    constructor (
        statusCode = "",
        data = null,
        message = "",
    ) {
        this.message = message,
        this.statusCode = statusCode,
        this.data = data
    }
}

export default APIError;
