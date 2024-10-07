import {Express} from 'express';
import axios from "axios";
import {SSO, TokenPayload} from "../SSO";
import {JWTPayload} from "jose";

const sso = new SSO();

const req = axios.create({})

export function useSSOCallback(app: Express) {
    app.all("/", async (req, res, next) => {
            const token = req.cookies["Token"] as string;
            if (!token) {
                // @ts-ignore
                res.user = null;
                next();
            }

            const payload = (await sso.verify(token))?.payload;
            if (!payload) {
                // @ts-ignore
                res.user = null;
                next();
            }

            // @ts-ignore
            req.user = payload as JWTPayload & TokenPayload;
            next();
        }
    )

    app.get('/auth/sso', (req, res, next) => {

        const token = req.query.Token?.toString();

        const body = req.body;
        // TODO: add more handle
        res.setHeader('Set-Cookie', `Token=${token}; HttpOnly; Secure;`)
        next();
    })
}


