import { AuthData } from "./auth";
import { Cookies } from "./common";

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PATH?: string;
      readonly CLIENT_ID?: string;
    }
  }

  namespace Express {
    interface Request {
      authData?: AuthData;
      readonly cookies: Cookies;
    }
  }
}
