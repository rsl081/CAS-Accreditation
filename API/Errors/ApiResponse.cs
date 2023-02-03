using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad request, shit sadlyf",
                401 => "Authorized, bawal ka dito totoy",
                403 => "Forbidden, yung role mo mali idol bawi na lang next life",
                404 => "Resource found, tangina bakit wala",
                500 => "Errors are path to the dark side. Errors lead to anger. Anger leads to hate. Hate leads to career change",
                _=> null
            };
        }

    }
}