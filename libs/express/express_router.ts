import {Express} from 'express';
import axios from "axios";
import {TokenPayload} from "../SSO";
import {JWTPayload} from "jose";
import {verify} from '../jwt';

const req = axios.create({})

/**
 * Hàm đăng ký middleware cho việc xác thực SSO bao gồm:
 * - Xác thực token
 * - Lưu token vào cookie (sso callback)
 * ```js
 * const {useSSOCallback} = require('@htilssu/sso');
 * const express = require('express');
 *
 * const app = express();
 *
 * useSSOCallback(app); //Add middleware handle verify token
 * ```
 * @remarks Hàm này phải được gọi sau khi sử dụng parseCookie không sẽ throw ra lỗi
 * @param app express instance
 */
export function useSSOCallback(app: Express) {
    app.use(async (req, res, next) => {
            const token = req.cookies["Token"] as string;
            if (!token) {
                // @ts-ignore
                res.locals.user = null;
                next();
                return;
            }

            const payload = (await verify(token))?.payload;
            if (!payload) {
                // @ts-ignore
                res.locals.user = null;
                next();
                return;
            }

            // @ts-ignore
            if (payload.role === 'user') {
                payload.id = payload.userId;
            } else {
                payload.id = payload.partnerId;
            }
            res.locals.user = payload as JWTPayload & TokenPayload;
            next();
        }
    )

    app.all('/auth/sso', (req, res, next) => {

        const token = req.query.Token?.toString();

        const body = req.body;
        // TODO: add more handle
        res.setHeader('Set-Cookie', `Token=${token}; HttpOnly; Secure;`)
        next();
    })
}


