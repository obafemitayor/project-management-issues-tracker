
const axios = require('axios')

 const isValidNumber = (value) => {
    return !isNaN(value)
}

 const makeHttpRequest = async (url,resourceName, headers) => {
    let httpResponse = {}
    try {
        if(!headers){
            headers = getDefaultHeaders()
        }
        const response = await axios.get(url, headers)
        httpResponse['status'] = 200
        httpResponse['data'] = response.data
    } catch (error) {
        console.log('error is ' + JSON.stringify(error))
        const statusCode = error.response ? error.response.status : 500

        const errorMessageFromServer = error.response ? error.response.data : 'An Error Occurred, Please Try Again'
        
        const errorResponseMessages = getErrorResponses(resourceName)

        const isExist = statusCode in errorResponseMessages

        httpResponse['status'] = statusCode

        httpResponse['data'] =  isExist ? errorResponseMessages[statusCode] : errorMessageFromServer 
    }
    return httpResponse
}

 const getDefaultHeaders = () => {
    return {
        'Accept': 'application/json',
        'Authorization': getAuthToken()
    }
}

 const getErrorResponses = (resourceName) => {
    return {
        10: 'Id Parameter Missing From Request',
        11: 'startAt must be a valid number',
        12: 'maxResult must be a valid number',
        13: 'Id must be a valid number',
        14: 'The only special character that project can have is a -',
        15: 'The only special character that orderBy can have is a -',
        404: `No Record Exist For This ${resourceName}`,
        400: `Invalid Parameters in Request When Trying To Retrieve ${resourceName}`,
        401: 'Invalid Auth Credentials'
    }
}

 const getAuthToken = () => `Basic ${Buffer.from(`offerzen.interview@gmail.com:zwv2xAB2HamQCOxi8sXV20F7`).toString('base64')}`


module.exports = {isValidNumber, makeHttpRequest, getDefaultHeaders, getErrorResponses, getAuthToken}