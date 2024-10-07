import {baseUrl} from "../SSO";

export namespace sso {
    export function redirectToSignInPage() {

    }

    function openAuthWindow() {
        const authWindow = window.open(baseUrl, 'authWindow', 'width=500,height=600');
    }

    /**
     * Chuyển hướng tới trang đăng nhập của server SSO với url trả về sau khi đăng nhập
     * khi server đăng nhập xong sẽ chuyển hướng tới url trả về và kèm theo Token của người dùng từ searchParams
     * @example
     * ```js
     * redirectToLoginPage("http://localhost:3000")
     * ```
     * Sau khi xác thực xong người dùng sẽ được chuyển hướng tới `http://localhost:3000?Token=...` các dịch vụ liên kết sẽ lấy token từ query params và lưu vào cookie của app
     * @param redirectUrl url mà sau khi đăng nhập xong sẽ chuyển hướng tới
     */
    export function redirectToLoginPage(redirectUrl: string) {
        window.location.href = `${baseUrl}/sign-in?returnUrl=${redirectUrl ?? window.location}`
    }
}