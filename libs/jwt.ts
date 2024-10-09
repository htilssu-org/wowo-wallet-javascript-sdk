import * as jose from "jose";
import {baseUrl} from "./SSO";

const jwkSet = jose.createRemoteJWKSet(new URL(`${baseUrl}/v1/sso/certs`));


export async function verify(token: string) {
    try {
        return await jose.jwtVerify(token, jwkSet);
    } catch (e) {
        return null;
    }
}