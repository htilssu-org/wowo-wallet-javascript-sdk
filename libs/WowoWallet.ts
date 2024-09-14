import axios, {AxiosInstance, AxiosResponse} from "axios";
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

    /**
     * Tạo một đơn hàng mới
     * @param props Thông tin đơn hàng
     */
    async createOrder(props: CreateOrderProps): Promise<OrderResponse> {
        const url = `${this.baseUrl}/v1/orders`
        const response = await this.req.post<OrderResponse>(url, props)

        return response.data
    }

    async cancelOrder(orderId: string):
        Promise<AxiosResponse<WoWoResponse | OrderResponse>> {
        const url = `${this.baseUrl}/v1/orders/${orderId}/cancel`
        return await this.req.post<WoWoResponse>(url)
    }

    async signIn(data: SignInProps) {
        const url = `${this.baseUrl}/v1/auth/sign-in`
        const response = await this.req.post<WoWoResponse>(url, data)
    }
}

export type SignInProps = {
    username: string
    password: string
}

export type  SignInResponse = {
    user: User
    token: string
}

export type User = {
    id: string
    username: string
    email: string
    phone: string
    fullName: string
    avatar: string
    role: string
    createdAt: string
    updatedAt: string
}

export type WoWoResponse = {
    message: string,
    error: string,
    errorCode: number
}

/**
 * Thông tin đơn hàng
 */
export type CreateOrderProps = {
    /**
     * Mã đơn hàng
     */
    orderId?: string
    // Số tiền
    amount: number
    // Đơn vị tiền tệ `VND, USD`
    currency: string
    // Mô tả đơn hàng
    description: string
    // Tên dịch vụ
    serviceName: string
    /**
     * Danh sách sản phẩm
     * @example
     * [
     *     {
     *         name: "Product 1",
     *         quantity: 1,
     *         price: 1000
     *     },
     *     {
     *         name: "Product 2",
     *         quantity: 2,
     *         price: 2000
     *     }
     * ]
     */
    items?: Array<ItemProps>
    /**
     * Thông tin callback
     * @example
     * {
     *     callbackUrl: "https://your-callback-url",
     *     returnUrl: "https://your-return-url"
     * }
     * @see {@link CallbackProps}
     */
    callback: CallbackProps
}

/**
 * Thông tin sản phẩm
 * @see {@link CreateOrderProps}
 */
export type ItemProps = {
    // Tên sản phẩm
    name: string
    // Số lượng
    quantity: number
    // Giá tiền
    price: number
}

/**
 * Thông tin callback
 * @see {@link CreateOrderProps}
 */
export type CallbackProps = {
    callbackUrl: string
    returnUrl?: string
}

/**
 * Response trả về khi tạo đơn hàng
 */
export type OrderResponse = {
    // Mã đơn hàng thanh toán của ví
    orderId: string,
    amount: number,
    currency: string,
    // Trạng thái đơn hàng
    status: string,
    description: string,
    serviceName: string,
    // Thời gian tạo đơn hàng
    createdAt: string,
    // Thời gian cập nhật đơn hàng
    updatedAt: string,
}