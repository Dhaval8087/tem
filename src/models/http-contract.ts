interface MakeRequestParam {
    url: string;
    method: string;
    payload?: string | {};
    headers?: { [index: string]: string };
}
interface MakeResponseParam {
    ok?: boolean;
    statusText?: string;
    status?: number;
    url?: string;
    text?: () => Promise<string>;
    json?: () => Promise<{}>;
    blob?: () => Promise<Blob>;
    clone?: MakeResponseParam;
    headers?: Headers;
  }

export type { MakeRequestParam, MakeResponseParam };
