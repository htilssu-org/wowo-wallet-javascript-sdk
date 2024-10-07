import * as jose from "jose";

export const baseUrl = "https://sso.htilssu.id.vn";

export class SSO {
    private baseUrl: string = baseUrl;
    private readonly jwk

    constructor() {
        this.jwk = jose.createRemoteJWKSet(new URL(`${this.baseUrl}/v1/sso/certs`))
    }

    public async verify(token: string) {
        try {
            return await jose.jwtVerify(token, this.jwk);
        } catch (e) {
            return null;
        }
    }

    public redirectToLogin(){

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