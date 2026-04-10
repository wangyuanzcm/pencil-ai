import * as Sentry from '@sentry/react'

type DsnLike = {
  protocol: string
  publicKey: string
  pass: string
  host: string
  port: string
  path: string
  projectId: string
}

function tryGetReleaseId(): string | undefined {
  const anyGlobal = globalThis as any
  if (typeof anyGlobal.__SENTRY_RELEASE__ === 'string') return anyGlobal.__SENTRY_RELEASE__
  return anyGlobal?.SENTRY_RELEASE?.id
}

function isProxyDsn(value: unknown) {
  return typeof value === 'string' && value.startsWith('pencil-proxy://')
}

export function yDe<T extends Record<string, any>>(t: T): T & {
  release?: string
  sendClientReports: true
  parentSpanIsAlwaysRootSpan: true
} {
  return {
    release: tryGetReleaseId(),
    sendClientReports: true,
    parentSpanIsAlwaysRootSpan: true,
    ...t
  }
}

export function qRe(dsn: string): DsnLike | undefined {
  try {
    const url = new URL(dsn)
    const protocol = url.protocol.replace(/:$/, '')
    const host = url.hostname
    const port = url.port ?? ''
    const publicKey = url.username ?? ''
    const pass = url.password ?? ''

    const parts = url.pathname.split('/').filter(Boolean)
    const projectId = parts.length ? parts[parts.length - 1] : ''
    const path = parts.length > 1 ? parts.slice(0, -1).join('/') : ''

    return { protocol, publicKey, pass, host, port, path, projectId }
  } catch {
    return undefined
  }
}

export function WRe(dsn: DsnLike): boolean {
  if (!dsn?.protocol || !dsn?.host || !dsn?.projectId) return false
  if (dsn.protocol === 'pencil-proxy') return true
  return Boolean(dsn.publicKey)
}

export function TLe(): boolean {
  return false
}

export function Vpe(target: any, sdkName: string, packages: string[] = [sdkName], pkgType: string = 'npm') {
  const meta = target?._metadata ?? {}
  if (!meta.sdk) {
    meta.sdk = {
      name: `sentry.javascript.${sdkName}`,
      version: (Sentry as any).SDK_VERSION ?? undefined,
      packages: packages.map(p => ({ name: `${pkgType}:@sentry/${p}`, version: (Sentry as any).SDK_VERSION ?? undefined }))
    }
  }
  target._metadata = meta
}

export function fOe(_clientClass: any, options: any) {
  const normalized = yDe(options ?? {})
  const dsn = normalized.dsn

  const enabled = normalized.enabled !== false && !isProxyDsn(dsn)
  try {
    Sentry.init({
      ...normalized,
      enabled,
      dsn: enabled ? dsn : undefined
    } as any)
  } catch {}

  return (Sentry as any).getClient?.() ?? null
}

export function RDe(_options: any, _fetchImpl?: any) {
  return {
    send: async () => ({}),
    flush: async () => true
  }
}

export function cIe(_span: any) {
  return {}
}

export function JIe(items: any[]) {
  return [
    { type: 'log', item_count: items.length, content_type: 'application/vnd.sentry.items.log+json' },
    { items }
  ]
}

export function tOe(items: any[]) {
  return [
    { type: 'trace_metric', item_count: items.length, content_type: 'application/vnd.sentry.items.trace-metric+json' },
    { items }
  ]
}

export function KDe(_client: any) {
  return function () {}
}

export function ZDe(_client: any, _domOptions: any) {
  return function () {}
}

