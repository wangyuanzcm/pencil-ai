function bytesToHex(bytes: Uint8Array) {
  const out: string[] = []
  for (let i = 0; i < bytes.length; i++) out.push(bytes[i].toString(16).padStart(2, '0'))
  return out.join('')
}

function getRandomBytes(len: number) {
  const bytes = new Uint8Array(len)
  const cryptoObj = (globalThis as any).crypto as Crypto | undefined
  if (cryptoObj?.getRandomValues) return cryptoObj.getRandomValues(bytes)
  for (let i = 0; i < len; i++) bytes[i] = Math.floor(Math.random() * 256)
  return bytes
}

export function uuidV4() {
  const cryptoObj = (globalThis as any).crypto as Crypto | undefined
  const ru = cryptoObj?.randomUUID
  if (typeof ru === 'function') return ru.call(cryptoObj)

  const rnds = getRandomBytes(16)
  rnds[6] = (rnds[6] & 0x0f) | 0x40
  rnds[8] = (rnds[8] & 0x3f) | 0x80
  const hex = bytesToHex(rnds)
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

