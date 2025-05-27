const message = require("../constants/messages")

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
    },
    orderUpdateFailed: {
        status: 400,
        message: {
            'fa': 'خطا در بروز رسانی سفارشات',
            'env': 'update failed!'
        }
    },
    userAlreadyExist: {
        status: 409,
        message: {
            'fa': 'نام کاربری قبلاً ثبت شده است.',
            'en': 'Username already exists'
        }
    },
    InvalidCredentials: {
        status: 401,
        message: {
            'fa': 'احراز هویت انجام نشد.',
            'en': 'Invalid credentials'
        }
    },
    userOrderNotFound: {
        status: 404,
        message: {
            'fa': 'چنین سفارشی برای شما ثبت نشده است.',
            'en': 'No such order has been registered for you.'
        }
    },
    OrderEditNotAllowed: {
        status: 409,
        message: {
            'fa': 'این سفارش قابلیت ویرایش ندارد',
            'en': 'This order cannot be edited.'
        }
    }
}

module.exports = errors
