
# Hoàn Tiền Đơn Hàng (refundOrder)

Phương thức `refundOrder` được sử dụng để hoàn tiền cho một đơn hàng đã được thanh toán trong hệ thống WoWoWallet.

## Mô Tả

Phương thức này nhận mã đơn hàng và gửi yêu cầu đến API WoWoWallet để hoàn tiền cho đơn hàng đó. Đơn hàng chỉ có thể hoàn tiền khi đang ở trạng thái `SUCCESS`. Nếu yêu cầu thành công, phương thức sẽ trả về thông tin phản hồi.

## Cú Pháp

```typescript
async refundOrder(orderId: string): Promise<OrderResponse>
```

## Tham Số

| Tên     | Kiểu   | Mô Tả                                         |
|---------|--------|-----------------------------------------------|
| `orderId` | `string` | Mã đơn hàng cần hoàn tiền.                   |

## Mã Lỗi

Phương thức `refundOrder` có thể phát sinh các lỗi sau:

- `200`: Hoàn tiền đơn hàng thành công.
- `400`: Đơn hàng không thể hoàn tiền do đã hủy hoặc không thể hoàn tiền do business rule.
- `404`: Đơn hàng không tồn tại.

## Ví Dụ Sử Dụng

Dưới đây là một ví dụ về cách sử dụng phương thức `refundOrder`:

```typescript
const wowoWallet = new WoWoWallet("your_api_key");
const orderId = "your_order_id";

try {
    const response = await wowoWallet.refundOrder(orderId);
    console.log("Đơn hàng đã được hoàn tiền:", response);
} catch (error) {
    console.error("Lỗi khi hoàn tiền đơn hàng:", error.message);
}
```