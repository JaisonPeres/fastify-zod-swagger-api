This is the API documentation for the Onbloc application.

## Authentication

To authenticate with the API, you must use the `Authorization` header with the value
`Bearer <token>`, where `<token>` is a valid JWT token.

## Errors

The API uses the following error codes:

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Response

The API always returns a JSON object with the following structure:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```