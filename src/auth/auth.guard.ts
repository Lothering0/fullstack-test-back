import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Request, Response } from "express";
import { firstValueFrom, catchError } from "rxjs";
import { AxiosError } from "axios";
import { AuthResponse } from "./auth.types";
import config from "./auth.config";
import { Cookies } from "src/common";

const { PATH, CLIENT_ID } = config;

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly httpService: HttpService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (request.cookies.access_token && request.cookies.base_domain) {
      const { access_token, base_domain } = request.cookies;
      this._setRequestAuthData(request, { access_token, base_domain });

      return true;
    }

    try {
      const { access_token, base_domain } = await this._getAccessToken();
      this._setCookie(response, { access_token, base_domain });
      this._setRequestAuthData(request, { access_token, base_domain });

      return true;
    } catch (error) {
      throw new Error("ERROR HERE");
    }
  }

  private async _getAccessToken(): Promise<AuthResponse> {
    const headers = { "X-Client-Id": CLIENT_ID };
    const result = this.httpService.get<AuthResponse>(PATH, { headers })
      .pipe(catchError((error: AxiosError) => {
        throw error;
      }));
    const { data } = await firstValueFrom(result);

    return data;
  }

  private _setCookie(response: Response, data: Record<string, string>): void {
    for (const [key, value] of Object.entries(data)) {
      response.cookie(key, value, { httpOnly: true });
    }
  }

  private _setRequestAuthData(
    request: Request,
    { access_token, base_domain }: Cookies
  ): void {
    request.authData = {
      accessToken: access_token,
      baseDomain: base_domain
    };
  }
}
