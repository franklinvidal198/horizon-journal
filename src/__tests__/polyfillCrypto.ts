// Polyfill for crypto.getRandomValues using node-webcrypto-ossl
import { Crypto } from 'node-webcrypto-ossl';
global.crypto = new Crypto();
