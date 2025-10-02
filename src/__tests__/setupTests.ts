// Mock localStorage for Vitest/node environment
class LocalStorageMock {
  private store: Record<string, string> = {};
  clear() { this.store = {}; }
  getItem(key: string) { return this.store[key] || null; }
  setItem(key: string, value: string) { this.store[key] = value; }
  removeItem(key: string) { delete this.store[key]; }
}


Object.defineProperty(global, 'localStorage', {
  value: new LocalStorageMock(),
  writable: true,
});

// Polyfill for crypto.getRandomValues in Vitest/node
if (typeof global.crypto === 'undefined') {
  global.crypto = {} as Crypto;
}
if (typeof global.crypto.getRandomValues !== 'function') {
  global.crypto.getRandomValues = (arr: any) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256);
    }
    return arr;
  };
}
