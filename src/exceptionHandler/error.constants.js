const errors = {
    invalidToken: {
        status: 403,
        message: {
            'fa': 'توکن معتبر نیست',
            'en': 'Invalid token'
        }
    },
    missingToken: {
        status: 401,
        message: {
            'fa': 'توکن احراز هویت ارسال نشده است',
            'en': 'Authentication token missing'
        }
    },
    userNotFound: {
        status: 404,
        message: {
            'fa': 'کاربر یافت نشد',
            'en': 'user not found'
        }
    }

}

module.exports = errors
