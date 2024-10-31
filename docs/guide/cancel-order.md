
# Hủy Đơn Hàng (cancelOrder)

Phương thức `cancelOrder` được sử dụng để hủy một đơn hàng đã được tạo trong hệ thống WoWoWallet.

## Mô Tả

Phương thức này nhận mã đơn hàng và gửi yêu cầu đến API WoWoWallet để hủy đơn hàng đó. Đơn hàng chỉ có thể hủy khi đang ở trạng thái `PENDING`. Nếu yêu cầu thành công, phương thức sẽ trả về thông tin phản hồi.

## Cú Pháp

```typescript
async cancelOrder(orderId: string): Promise<WoWoResponse | OrderResponse>
```

## Tham Số

| Tên     | Kiểu   | Mô Tả                                         |
|---------|--------|-----------------------------------------------|
| `orderId` | `string` | Mã đơn hàng cần hủy.                          |

## Mã Lỗi

Phương thức `cancelOrder` có thể phát sinh các lỗi sau:

- `200`: Hủy đơn hàng thành công.
- `400`: Đơn hàng không thể hủy do đơn hàng đã được thanh toán hoặc đã hủy hoặc không thể hủy do business rule.
- `404`: Đơn hàng không tồn tại.

## Ví Dụ Sử Dụng

Dưới đây là một ví dụ về cách sử dụng phương thức `cancelOrder`:

```typescript
const wowoWallet = new WoWoWallet("your_api_key");
const orderId = "your_order_id";

try {
    const response = await wowoWallet.cancelOrder(orderId);
    console.log("Đơn hàng đã được hủy:", response);
} catch (error) {
    console.error("Lỗi khi hủy đơn hàng:", error.message);
}
```

