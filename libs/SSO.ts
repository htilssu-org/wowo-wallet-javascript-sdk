import * as jose from "jose";

export class SSO {
    private baseUrl: string = "https://sso.htilssu.id.vn"
    private readonly jwk

    constructor() {
        this.jwk = jose.createRemoteJWKSet(new URL(`${this.baseUrl}/v1/sso/certs`))
    }

    public async verify(token: string) {
        try {
            return await jose.jwtVerify(token, this.jwk);
        } catch (e){
            return null;
        }
    }
}