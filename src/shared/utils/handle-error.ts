// utils/errorHandler.ts
import type { Response } from 'express';

export const handleError = (res: Response, error: unknown, message = 'Server error') => {
  if (error instanceof Error) {
    return res.status(500).json({
      message,
      error: error.message,
    });
  }

  return res.status(500).json({
    message,
    error: String(error),
  });
};
