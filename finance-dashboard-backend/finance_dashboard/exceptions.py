from rest_framework.views import exception_handler
from rest_framework import status

def custom_exception_handler(exc, context):
    # Call DRF's default exception handler first to get the standard error response.
    response = exception_handler(exc, context)

    if response is not None:
        # Standardize the response format
        custom_data = {
            "error": True,
            "status_code": response.status_code,
            "detail": response.data.get('detail', response.data)
        }
        response.data = custom_data

    return response