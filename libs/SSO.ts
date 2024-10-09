import {verify} from "./jwt";

export const baseUrl = "https://sso.htilssu.id.vn";

export class SSO {
    private baseUrl: string = baseUrl;
    private readonly serviceId: string;

    constructor(serviceId: string) {
        this.serviceId = serviceId;
    }

    /**
     * Xác thực token trả về từ SSO server, và trả về payload chứa thông tin của người dùng nếu token hợp lệ,
     * nếu token không hợp lệ giá trị trả về sẽ là `null`
     * @param token token cần xác thực
     * @returns null nếu token không hợp lệ hoặc payload của token
     */
    public async verify(token: string) {
        try {
            return await verify(token)
        } catch (e) {
            return null;
        }
    }

    /**
     * Chuyển hướng tới trang đăng nhập của server SSO với url trả về sau khi đăng nhập
     * khi server đăng nhập xong sẽ chuyển hướng tới url trả về và kèm theo Token của người dùng từ searchParams
     * @example
     * ```js
     * redirectToLoginPage("http://localhost:3000")
     * ```
     * Sau khi xác thực xong người dùng sẽ được chuyển hướng tới `returnUrl`
     * `http://localhost:3000?Token=... các dịch vụ liên kết sẽ lấy token từ query params và lưu vào cookie của app`
     * @param returnUrl sau khi đăng nhập xong server sso sẽ chuyển hướng tới
     */
    public redirectToLogin(returnUrl?: string) {
        location.href = `${this.baseUrl}/sign-in?returnUrl=${returnUrl ? returnUrl : location}&serviceId=${this.serviceId}`
    }
}

export type TokenPayload = {
    id: string
    role: string
    firstName: string
    lastName: string
    email: string
    avatar: string
    phoneNumber: string
    address: string
    dob: string
    gender: boolean
}