const regexUrl = /^(https?):\/\/(?!.*\.\.)[\w\d./]+(\?(\w+=\S+&?)+)?$/

/**
 * Kiểm tra xem url có hợp lệ hay không
 * @param url url cần check
 * @returns `true` nếu url hợp lệ, ngược lại trẻ về `false`
 */
export function isValidUrl(url: string): boolean {
    return regexUrl.test(url);
}