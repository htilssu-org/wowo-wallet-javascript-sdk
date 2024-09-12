const regexUrl = /^(https?):\/\/(?!.*\.\.)[^@?'\\/_\-=+#!$%^&*()<>:;"\[\]~]+$/;

export function isValidUrl(url: string): boolean {
    return regexUrl.test(url);
}