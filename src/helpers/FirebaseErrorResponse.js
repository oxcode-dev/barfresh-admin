
let errorResponses = {
    'auth/email-already-in-use': 'The email provided already exists.',
    'auth/user-not-found': 'User not found. Please check your credentials and try again.',
    'auth/email-not-found': 'Email address not found.  Please check your credentials and try again.',
    'auth/operation-not-allowed': 'Operation not allowed.',
    'auth/invalid-email': 'The provided email is not valid.',
    'auth/weak-password': 'The password provided is too weak.',
    'auth/wrong-password': 'The provided password is incorrect.',
    'auth/user-disabled': "The user's account has been disabled or deleted.",
    'auth/invalid-api-key': "Invalid API key.",
    'auth/network-request-failed': 'A network error occurred. Please try again later.',
    'auth/user-token-expired': 'Your session has expired. Please log in again.',
    'auth/invalid-user-token': 'Invalid user token. Please log in again.',
    'database/permission-denied': 'Permission denied when accessing the database. Check your permissions.',
    'database/disconnected': 'Database connection lost. Please check your internet connection.',
    'database/timeout': 'Database operation timed out. Please try again.',
    'auth/requires-recent-login': 'Login credential too old. Try Login',
    'storage/object-not-found': 'File does not exist',
    'storage/unauthorized': 'User does not have permission to access the object',
    'storage/canceled': 'User canceled the upload.', 
    'storage/unknown': 'Unknown error occurred, inspect the server response',
    'storage/bucket-not-found': 'No bucket is configured for Cloud Storage',
    'storage/unauthenticated': 'User is unauthenticated, please authenticate and try again.',
    'storage/invalid-event-name': 'Invalid event name provided. Must be one of [`running`, `progress`, `pause`]',
    'storage/invalid-url': 'Invalid URL provided.'
}

export const errorResponse = (error) => {
    // eslint-disable-next-line no-prototype-builtins
    if(errorResponses.hasOwnProperty(error)) {
        return errorResponses[error]
    }
    return 'Something went wrong'
}