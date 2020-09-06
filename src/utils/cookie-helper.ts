import { getGlobalObject } from './global-helper';


function getOneCookie(cookieName: string): string | null | Array<string> {
    let fullCookieName: string;

    // Check if cookieName is already encoded
    try {
        decodeURIComponent(cookieName);
        // already encoded
        fullCookieName = `${cookieName}=`;
    } catch (e) {
        // needs encoding
        fullCookieName = `${encodeURIComponent(cookieName)}=`;
    }

    const cookies = document.cookie.match(
        `(^|;)\\s*${fullCookieName}\\s*([^;]+)`
    );

    // decode cookie value on return
    const cookie = cookies && cookies.pop();
    if (cookie) {
        try {
            return JSON.parse(decodeURIComponent(cookie));
        } catch {
            return decodeURIComponent(cookie);
        }
    }
    return null;
}
function setCookie(
    cookieName: string | number | boolean,
    cookieObject: {},
    cookieDomain?: string
): string | null | {} {
    let cookieString = '';
    if (!cookieName) {
        return null;
    }
    if (!cookieObject) {
        return null;
    }
    const expiration = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    if (typeof cookieObject === 'string') {
        cookieString = cookieObject;
    } else {
        cookieString = JSON.stringify(cookieObject);
    }
    if (!cookieDomain) {
        cookieDomain = (getGlobalObject() as Window).location.hostname;
    }
    // cookie token & value need to be encoded before saving
    document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(
        cookieString
    )};expires=${expiration.toUTCString()}; domain=${cookieDomain}; samesite=Lax; path=/`;
    return cookieObject;
}

export { getOneCookie, setCookie };