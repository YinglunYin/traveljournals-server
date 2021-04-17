module.exports = {
    responseClient(res,httpCode = 500, code = 3,message='Server Error',data={}) {
        let responseData = {};
        responseData.code = code;
        responseData.message = message;
        responseData.data = data;
        res.status(httpCode).json(responseData)
    }
}