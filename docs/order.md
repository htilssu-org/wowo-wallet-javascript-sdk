```ts
export type CreateOrderProps = {
    orderId: string
    amount: number
    currency: string
    description: string
    serviceName: string
    items?: Array<ItemProps> //optional
    callback: {
        callbackUrl: string
        returnUrl?: string
    }
}
```