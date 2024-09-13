import axios, {AxiosInstance} from "axios";
import {isValidUrl} from "./utils/urlUtil";

export class WoWoWallet {

    private readonly apiKey: string
    private readonly baseUrl: string = "https://api.wowo.htilssu.id.vn"
    req: AxiosInstance

    /**
     * Tạo mới một instance của WoWoWallet
     * @param apiKey API KEY được cung cấp bởi WowoWallet
     * @param baseUrl URL của WowoWallet, mặc định là {@link https://api.wowo.htilssu.id.vn}
     */
    constructor(apiKey: string, baseUrl?: string) {
        this.apiKey = apiKey;

        if (baseUrl && !isValidUrl(baseUrl)) {
            throw new Error("Invalid baseUrl")
        }

        this.baseUrl = baseUrl ?? this.baseUrl;
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

    async cancelOrder(orderId: string):
        Promise<void> {
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
    returnUrl?: string
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