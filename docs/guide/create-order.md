# Tạo Đơn Hàng (createOrder)

Phương thức `createOrder` được sử dụng để tạo một đơn hàng mới trong hệ thống WoWoWallet.

## Mô Tả

Phương thức này nhận thông tin đơn hàng và gửi yêu cầu đến API WoWoWallet để tạo đơn hàng mới. Nếu yêu cầu thành công,
phương thức sẽ trả về thông tin chi tiết của đơn hàng đã tạo.

## Cú Pháp

```typescript
async
createOrder(props
:
CreateOrderProps
):
Promise<OrderResponse>
```

## Tham Số

| Tên     | Kiểu               | Mô Tả                                                                                           |
|---------|--------------------|-------------------------------------------------------------------------------------------------|
| `props` | `CreateOrderProps` | Thông tin về đơn hàng cần tạo. Xem phần [CreateOrderProps](#createorderprops) để biết chi tiết. |

## Thông Tin Tham Số

### CreateOrderProps

```typescript
type CreateOrderProps = {
    orderId?: string;      // Mã đơn hàng (tùy chọn)
    money: number;         // Tổng tiền của hóa đơn
    serviceName: string;   // Tên dịch vụ
    items?: Array<ItemProps>; // Danh sách sản phẩm
    callback: CallbackProps;    // Thông tin callback
}
```

#### ItemProps

```typescript
type ItemProps = {
    name: string;        // Tên sản phẩm
    amount: number;     // Số lượng sản phẩm (phải lớn hơn 0)
    unitPrice: number;  // Giá sản phẩm (phải lớn hơn hoặc bằng 0)
}
```

#### CallbackProps

```typescript
type CallbackProps = {
    successUrl?: string; // URL callback để cập nhật trạng thái đơn hàng khi thanh toán thành công
    returnUrl?: string;  // URL để chuyển hướng người dùng sau khi thanh toán xong
}
```

## Mã Lỗi

Phương thức `createOrder` có thể phát sinh các lỗi sau:

- `400`: Đơn hàng không hợp lệ do giá của sản phẩm hoặc số lượng không hợp lệ, hoặc tổng tiền không hợp lệ.
- `500`: Lỗi từ server (nếu có).

## Ví Dụ Sử Dụng

Dưới đây là một ví dụ về cách sử dụng phương thức `createOrder`:

```typescript
import {OrderResponse} from "./WowoWallet";

const wowoWallet = new WoWoWallet("your_api_key");

const orderProps: CreateOrderProps = {
    money: 3000,
    serviceName: "Dịch vụ giao hàng",
    items: [
        {name: "Sản phẩm 1", amount: 1, unitPrice: 1000},
        {name: "Sản phẩm 2", amount: 2, unitPrice: 1000}
    ],
    callback: {
        successUrl: "https://your-callback-url/success",
        returnUrl: "https://your-return-url"
    }
};

try {
    const orderResponse: OrderResponse = await wowoWallet.createOrder(orderProps);
    console.log("Đơn hàng đã được tạo:", orderResponse);
} catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error.message);
}
```

## Ví Dụ Phản Hồi

```json
{
  "id": 4,
  "money": 100000,
  "status": "PENDING",
  "returnUrl": "https://localhost:8080/order/test",
  "successUrl": "https://localhost:8080/order/success",
  "created": "2024-10-31T14:13:16.134014Z",
  "updated": "2024-10-31T14:13:16.134014Z",
  "serviceName": "Mua vé máy bay",
  "items": [
    {
      "name": "Vé máy bay HN - SGN",
      "amount": 1,
      "unitPrice": 2000000
    }
  ],
  "checkoutUrl": "https://wowo.htilssu.id.vn/orders/4"
}
```

## Kết Luận

Phương thức `createOrder` cho phép bạn dễ dàng tạo đơn hàng trong hệ thống WoWoWallet, với đầy đủ các tham số cần thiết
và khả năng xử lý các lỗi phổ biến. Hãy chắc chắn kiểm tra các thông tin đầu vào để đảm bảo rằng chúng hợp lệ trước khi
gọi phương thức này.
