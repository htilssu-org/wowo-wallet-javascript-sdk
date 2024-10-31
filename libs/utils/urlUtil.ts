const regexUrl = /^(https?):\/\/(?!.*\.\.)[\w.]+(:\d+\/?)?[\w.\/-]*(\?(\w+=\S+&?)+)?$/

/**
 * Kiểm tra xem url có hợp lệ hay không
 * @param url url cần check
 * @returns `true` nếu url hợp lệ, ngược lại trẻ về `false`
 */
export function isValidUrl(url?: string): boolean {
    if (!url) return false;
    return regexUrl.test(url);
}