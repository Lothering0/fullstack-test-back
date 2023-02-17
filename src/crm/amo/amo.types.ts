export interface AmoResponse<T extends { [key: string]: any[]; }> {
  readonly _page: number;
  readonly _likns: {
    readonly self: {
      readonly href: string;
    };
  };
  readonly _embedded: T;
}
