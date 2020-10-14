import { MakeRequestParam } from '../models';

function makeRequest(request: MakeRequestParam): Promise<{}> {
  return new Promise((resolve, reject) => {
    try {
      const data = extractRequestPayload(request);

      const xhr = new XMLHttpRequest();
      const keys: string[] = [];
      const all: string[][] = [];
      const headers: Record<string, unknown> = {};

      const response = () => ({
        ok: ((xhr.status / 100) | 0) === 2, // 200-299
        statusText: xhr.statusText,
        status: xhr.status,
        url: xhr.responseURL,
        text: () => Promise.resolve(xhr.responseText),
        json: () => Promise.resolve(JSON.parse(xhr.responseText)),
        blob: () => Promise.resolve(new Blob([xhr.response])),
        clone: response,
        headers: {
          keys: () => keys,
          entries: () => all,
          get: (n: string) => headers[n.toLowerCase()],
          has: (n: string) => n.toLowerCase() in headers,
        },
      });
      xhr.open(request.method || 'get', request.url, true);
      xhr.onload = () => {
        xhr
          .getAllResponseHeaders()
          .replace(
            /^(.*?):[^\S\n]*([\s\S]*?)$/gm,
            (m: string, key: string, value: string): string => {
              keys.push((key = key.toLowerCase()));
              all.push([key, value]);
              headers[key] = headers[key] ? `${headers[key]},${value}` : value;
              return headers.toString();
            }
          );
        resolve(response());
      };
      xhr.onerror = reject;
      xhr.setRequestHeader('Content-Type', 'application/json');
      if (request.headers && Object.keys(request.headers).length > 0) {
        for (const property in request.headers) {
          if (Object.prototype.hasOwnProperty.call(request.headers, property)) {
            xhr.setRequestHeader(property, request.headers[property]);
          }
        }
      }
      xhr.send(data);
    } catch (e) {
      return reject(new Error(e.message));
    }
  });
}

function extractRequestPayload(request: MakeRequestParam): string {
  if (typeof request.payload === 'string') {
    return request.payload;
  } else if (request.payload instanceof String) {
    return request.payload.valueOf();
  } else {
    return JSON.stringify(request.payload);
  }
}

export { extractRequestPayload, makeRequest };
