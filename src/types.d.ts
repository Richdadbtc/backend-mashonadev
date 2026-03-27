export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        passwordHash: string;
        createdAt: string;
      };
    }
  }
}

