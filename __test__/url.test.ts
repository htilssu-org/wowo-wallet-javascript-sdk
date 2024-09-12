import {isValidUrl} from "../libs/utils/urlUtil";
import {expect, test} from "@jest/globals";

test("expect correct url", () => {
    const url = "https://api.wowo.htilssu.id.vn"

    expect(isValidUrl(url)).toBe(true)
})

test("expect incorrect url with unexpect token", () => {
    expect(isValidUrl("https://api.wowo.htilssu.id.vn?")).toBe(false)
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

