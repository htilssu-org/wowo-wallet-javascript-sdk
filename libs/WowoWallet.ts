import axios, {AxiosInstance} from "axios";

export class WowoWallet {
    apiKey: string
    baseUrl: string = "https://api.wowo.htilssu.id.vn"
    req: AxiosInstance

    constructor(apiKey: string, baseUrl: string) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.req = axios.create({
            baseURL: this.baseUrl,
            headers: {
                "X-API-KEY": this.apiKey
            }
        })
    }

    async createOrder(props: CreateOrderProps): Promise<CreateOrderResponse> {
        const url = `${this.baseUrl}/v1/orders`
        const response = await this.req.post<CreateOrderResponse>(url, props)

        return response.data
    }

    async cancelOrder(orderId: string): Promise<void> {
        const url = `${this.baseUrl}/v1/orders/${orderId}`
        await this.req.delete<WoWoResponse>(url)
    }
}

export type WoWoResponse = {
    message: string,
    error: string,
    errorCode: number
}

export type CreateOrderProps = {
    orderId: string
    amount: number
    currency: string
    description: string
    serviceName: string
    items?: Array<ItemProps>
    callback: CallbackProps
}

export type ItemProps = {
    name: string
    quantity: number
    price: number
}

export type CallbackProps = {
    callbackUrl: string
}

export type CreateOrderResponse = {
    orderId: string,
    amount: number,
    currency: string,
    status: string,
    description: string,
    serviceName: string,
    createdAt: string,
    updatedAt: string,
}