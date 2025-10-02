// Polyfill for crypto.getRandomValues for Vitest/Vite
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
