declare module '@backstage/backend-plugin-api';
// packages/backend/src/types.d.ts
declare module '@backstage/catalog-client';
declare module 'tweetsodium' {
  export function seal(message: Uint8Array, key: Uint8Array): Uint8Array;
  const sodium: { seal: typeof seal };
  export default sodium;
}