# Cancel Order (Hủy giao dịch, Hủy đơn hàng)
```js
try {
  const cancelOrderResponse = await wallet.cancelOrder('orderId');
  if (cancelOrderResponse.staus === 200){
    const order = cancelOrderResponse.data;
  }
}
catch (error) {
  console.error("Hủy order thất bại", error);
}

```