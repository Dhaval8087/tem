function getGlobalObject() {
    /* eslint-disable */
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('cannot find the global object');
}
export { getGlobalObject };
