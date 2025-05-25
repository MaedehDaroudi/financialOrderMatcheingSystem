const errors = {
    invalidToken: {
        status: 403,
        messages: {
            'fa': 'توکن معتبر نیست',
            'en': 'Invalid token'
        }
    },
    missingToken: {
        status: 401,
        messages: {
            'fa': 'توکن احراز هویت ارسال نشده است',
            'en': 'Authentication token missing'
        }
    }

}

module.exports = errors
