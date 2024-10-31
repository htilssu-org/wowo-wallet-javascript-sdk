import {isValidUrl} from "../libs/utils";

test("expect correct url", () => {
    const url = "https://api.wowo.htilssu.id.vn"

    expect(isValidUrl(url)).toBe(true)
    expect(isValidUrl("http://api.wowo.htilssu.id.vn/orders")).toBe(true)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn/orders")).toBe(true)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn/orders/create")).toBe(true)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn/orders?url=123&cc=hello")).toBe(true)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn/orders?url=123&cc=he;llo")).toBe(true)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn/orders/create?url=123&cc=he+llo")).toBe(true)
    expect(isValidUrl("http://localhost:4000/api/booking/change-invoice-state?invoiceID=3")).toBe(true)
    expect(isValidUrl(`http://localhost:4000/api/booking/change-invoice-state?invoiceID=\{\}`)).toBe(true)
    expect(isValidUrl(`http://localhost:4000/api`)).toBe(true)
})

test("expect incorrect url with unexpect token", () => {
    expect(isValidUrl("https://api.wowo.htilssu.id.vn$")).toBe(false)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn^")).toBe(false)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn*")).toBe(false)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn(")).toBe(false)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn)")).toBe(false)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn\"")).toBe(false)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn>")).toBe(false)
    expect(isValidUrl("https://api.wowo.htilssu.id.vn<")).toBe(false)

})

test("expect incorrect url with more [.]", () => {
    expect(isValidUrl("https://api.wo..id.vn")).toBe(false)
})

