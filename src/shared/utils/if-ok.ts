import type { Response } from 'express';

export const ok = (res: Response, data: unknown, code = 200) => {
  res.status(code).json(typeof data === 'string' ? { message: data } : data);
};

export const notFound = (res: Response, message = 'Not found') => {
  ok(res, { message }, 404);
};
