import {baseUrl} from "../SSO";

export function redirectToSignInPage() {

}

function openAuthWindow() {
    const authWindow = window.open(baseUrl, 'authWindow', 'width=500,height=600');
}

export function redirectToAuth(redirectUrl: string) {
    window.location.href = `${baseUrl}/sign-in?returnUrl=${redirectUrl ?? window.location}`
}