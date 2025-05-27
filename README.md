<div align = "right">

#  سیستم تطبیق سفارشات با بهینه سازی عملکرد
این API برای مدیریت سفارش‌های خرید و فروش طلا در یک سیستم معاملاتی طراحی شده است.

##  🔐 احراز هویت 
تمام درخواست‌ها نیاز به توکن احراز هویت دارند. پس از ورود موفق، توکن را دریافت و در هدر زیر قرار دهید:

<div align = "left">

```bash
Authorization: Bearer <your_token>
```
</div>

<br/>

# postman

[📁 دریافت فایل Postman Collection](./documents/postman/OrderMatchingSystem.json)

<br/>

# 📘 لیست api  ها 

<br/>
<details>
<summary><span style="font-size: 18px;"> 📝 ایجاد سفارش  </span></summary>

### URL: 

<div align = "left">

``` bash
POST /orders
```

</div>

### Headers

<div align = "left">

```bash
Authorization: Bearer <token>
```
</div>

### Body

<div align = "left">

```js
{
  "price": "6650000",
  "type": "buy|| sell", 
  "userId": 1
}
```

</div>

### Validation Schema

<div align = "left">

```js
{
  "type": "object",
  "properties": {
    "price": { "type": "string" },
    "type": { "type": "string" },
    "userId": { "type": "number" }
  },
  "required": ["price", "type", "userId"],
  "additionalProperties": false
}
```
</div>

### Response

<div align = "left">

```js
{
    fa: 'سفارش با موفقیت ثبت شد.',
    en: 'Order created successfully.'
}
```
</div>

</details>

<br/>
<hr/>
<br/>

<details>
<summary> <span style="font-size: 18px;"> 📥 دریافت سفارشات  </span></summary>

### URL:

<div align = "left">

``` bash
GET /orders
```

</div>

### Headers

<div align = "left">

```bash
Authorization: Bearer <token>
```
</div>

### Query Parameters: (اختیاری)

<div align = "left">


| Param  | Type   | Description          |
| ------ | ------ | -------------------- |
| `id`     | string | Filter by order ID   |
| `status` | string | Filter by status     |
| `type`   | string | Filter by order type |

</div>

### Validation Schema

<div align = "left">

```js
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "status": { "type": "string" },
    "type": { "type": "string" }
  },
  "required": [],
  "additionalProperties": false
}
```

</div>

### Response


<div align = "left">

``` js
{
    "status": 200,
    "data": {
        "id": "a861f462-025d-4c09-8232-c964a6a28252",
        "result": [
            {
                "id": 1,
                "user_id": 2,
                "type": "buy",
                "price": "6581430",
                "status": "closed",
                "created_at": "2025-05-25T15:55:08.205Z",
                "updated_at": "2025-05-25T15:55:08.205Z"
            },
            {
                "id": 1,
                "user_id": 2,
                "type": "sell",
                "price": "6881430",
                "status": "open",
                "created_at": "2025-05-25T15:56:08.205Z",
                "updated_at": "2025-05-25T15:56:08.205Z"
            }
        ]
    }
}
```
</div>
</details>

<br/>
<hr/>
<br/>

<details>
<summary><span style="font-size: 18px;"> هماهنگی سفارشات با قیمت بازار 🔄 </span></summary>



### URL

<div align = "left">

```bash
GET /orders/match-with-market
```
</div>

### Headers

<div align = "left">

```bash
Authorization: Bearer <token>
```
</div>

### Query Parameters:

<div align = "left">

```bash
none
 ```
</div>

### Validation Schema


<div align = "left">

```js

{
  "type": "object",
  "properties": {},
  "additionalProperties": false
}
```
</div>

### Logic
این endpoint قیمت فعلی بازار را از منبع خارجی دریافت کرده، سفارشات باز را بررسی کرده و سفارشاتی که با قیمت بازار هم‌راستا هستند را به‌روزرسانی می‌کند (مانند تغییر وضعیت به closed).

### Response

<div align = "left">

``` js


{
  fa: "سفارش‌های هماهنگ با بازار به‌روزرسانی شدند.",
  en: "Orders aligned with market price have been updated."
}
```
</div>

### 🧪 Notes
تمامی قیمت‌ها به تومان ذخیره می‌شوند.

قیمت بازار از API https://www.goldapi.io/api/XAU/USD گرفته می‌شود و تبدیل آن به تومان با فرمول زیر انجام می‌گیرد:

```js
const gram18kTmn = (xauUsd * usdTmn) / 31.1035 * 0.75;
```
</details>

<br/><hr/><br/>

<details> <summary><span style="font-size: 18px;"> ✏️ ویرایش سفارش  </span></summary>
### URL

<div align = "left">

```bash
PUT /api/v1/order/
```
</div>

### Headers
<div align = "left">

```bash
Authorization: Bearer <token>
```
</div>

### Body
<div align = "left">

```js
{
  "id": 5,
  "price": "6700000",
  "type": "sell"
}
```
</div>

### Validation Schema
<div align = "left">

```js
{
  type: "object",
  properties: {
    id: { type: "number" },
    price: { type: "string" },
    type: { type: "string" }
  },
  required: ["id"],
  additionalProperties: false,
  anyOf: [
    { required: ["price"] },
    { required: ["type"] }
  ]
}
```

</div>

### Response

<div align = "left">

```js
{
  fa: "سفارش با موفقیت بروزرسانی شد.",
  en: "Order updated successfully."
}

```
</div> 
</details>

<br/> <hr/> <br/>

<details>
<summary>
<span style="font-size: 18px;"> ❌ حذف سفارش  </span>
</summary>

### URL
<div align = "left">

```bash
DELETE /api/v1/order/
```
</div>

### Headers
<div align = "left">

```bash
Authorization: Bearer <token>
```
</div>

### Body
<div align = "left">

```js
{
  "id": 5
}
```
</div>

### Validation Schema
<div align = "left">

```js
{
  type: "object",
  properties: {
    id: { type: "number" }
  },
  required: ["id"],
  additionalProperties: false
}
```
</div>

### Response
<div align = "left">

```js
{
  fa: "سفارش با موفقیت حذف شد.",
  en: "Order removed successfully."
}
```

</div> </details>

</div>