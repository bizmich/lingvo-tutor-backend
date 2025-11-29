import type { Request } from "express";
import type { JwtPayload } from "../utils/jwt.ts";

export interface IRequest<T> extends Request {
	body: T;
}
export interface IAuthRequest extends Request {
	user: JwtPayload;
}
