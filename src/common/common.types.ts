export type id<T extends number | string = number> = T;

export interface Cookies {
  readonly access_token: string;
  readonly base_domain: string;
}
