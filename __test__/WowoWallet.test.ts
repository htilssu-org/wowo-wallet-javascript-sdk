import {beforeAll, expect, test} from "@jest/globals";
import {WoWoWallet} from "../libs/WowoWallet";

let wowo: WoWoWallet;

beforeAll(() => {
   wowo = new WoWoWallet("api-key");
})

test("expect success createOrder", async () => {
    // const response = await wowo.createOrder({
    //     serviceName: "test",
    //     description: "test",
    //     amount: 1000,
    //     currency: "VND",
    //     callback: {
    //         callbackUrl: "https://12313.com",
    //         returnUrl: "https://123123.com/13"
    //     }
    // });
})