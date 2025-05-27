class OrderTestExpected {

    constructor() {
    }

    static createOrder(data) {
        return {
            fa: 'سفارش با موفقیت ثبت شد.',
            en: 'Order created successfully.'
        }
    }

    static receiveOrder(orderId) {
        return {
            deleted: 0,
            id: orderId,
            type: "buy",
            price: "20000",
            status: "open",
        }
    }

    static updateOrder(data) {
        return {
            fa: "سفارش شما ویرایش شد.",
            en: "Your order has been updated."
        }
    }

    static removeOrder(data) {
        return {
            fa: "سفارش با موفقیت حذف شد.",
            en: "Your order has been deleted."
        }
    }

    static matchWithMarket() {
        return {
            fa: "سفارش‌های هماهنگ با بازار به‌روزرسانی شدند.",
            en: "Orders aligned with market price have been updated."
        }
    }
}

module.exports = OrderTestExpected