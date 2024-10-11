import axios, {AxiosInstance, AxiosResponse} from "axios";
import {isValidUrl} from "./utils";

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

        if (!apiKey) {
            throw new Error("API KEY không được để trống")
        }

        this.apiKey = apiKey

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

        if (props.items && props.items.length !== 0) {
            const itemHasNegativePriceOrNegativeQuantity = props.items.find(
                value => value.price < 0 || value.quantity <= 0);
            if (itemHasNegativePriceOrNegativeQuantity) {
                throw new Error("Giá của item phải lớn hơn hoặc bằng 0, Số lượng phải lớn hơn 0")
            }
        }

        if (props.amount < 0) {
            throw new Error('Số tiền phải lớn hơn hoặc bằng 0')
        }

        if (props.callback?.returnUrl && !isValidUrl(props.callback.returnUrl)) {
            throw new Error("Đường dẫn return không hợp lệ")
        }

        if (!props.callback?.callbackUrl && !isValidUrl(props.callback.callbackUrl)) {
            throw new Error("Đường dẫn callback không hợp lệ")
        }

        //check url callback
        if (props.callback && !isValidUrl(props.callback.callbackUrl)) {
            throw new Error("Đường dẫn callback không hợp lệ")
        }

        const url = `${this.baseUrl}/v1/orders`
        const response = await this.req.post<OrderResponse>(url, props)

        return response.data
    }

    async cancelOrder(orderId: string):
        Promise<AxiosResponse<WoWoResponse | OrderResponse>> {
        const url = `${this.baseUrl}/v1/orders/${orderId}/cancel`
        return await this.req.post<WoWoResponse>(url)
    }

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
    error?: string,
    errorCode?: number
}

/**
 * Thông tin đơn hàng
 */
export type CreateOrderProps = {
    /**
     * Mã đơn hàng
     */
    orderId?: string
    /**
     * Tổng tiền của hóa đơn
     */
    amount: number
    /**
     * Đơn vị tiền tệ `VND, USD`
     */
    currency: string
    /**
     * Mô tả của đơn hàng
     */
    description?: string
    /**
     * Tên dịch vụ
     */
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
    /**
     * Tên sản phẩm
     */
    name: string
    /**
     * Số lượng sản phẩm
     * @remarks Số lượng sản phẩm phải lớn hơn 0
     */
    quantity: number
    /**
     * Giá sản phẩm
     * @remarks số tiền phải lớn hơn hoặc bằng 0
     */
    price: number
}

/**
 * {@link callbackUrl} là URL callback dùng để cập nhật trạng thái đơn hàng của bạn khi người dùng thanh toán thành công
 * `METHOD` bắt buộc là `POST` <br>
 * {@link returnUrl} là url trang bạn muốn người dùng chuyển hướng đến khi người dùng thanh toán xong
 * @see {@link CreateOrderProps}
 */
export type CallbackProps = {
    /**
     * URL callback dùng để cập nhật trạng thái đơn hàng của bạn khi người dùng thanh toán thành công
     */
    callbackUrl: string
    /**
     * URL trang bạn muốn người dùng chuyển hướng đến khi người dùng thanh toán xong
     */
    returnUrl?: string
}

/**
 * Response trả về khi tạo đơn hàng
 */
export type OrderResponse = {
    /**
     * Mã đơn thanh toán của ví
     */
    orderId: string,
    amount: number,
    currency: string,
    /**
     * Thái thái đơn hàng `SUCCESS`, `PENDING`, `REFUND`
     */
    status: 'SUCCESS' | 'PENDING' | 'REFUND',
    description: string,
    serviceName: string,
    /**
     * Thời gian tạo đơn hàng
     */
    createdAt: string,
    /**
     * Thời gian cập nhật đơn hàng lân cuối
     */
    updatedAt: string,
}