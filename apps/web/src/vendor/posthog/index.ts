import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import * as ReactDOMClient from 'react-dom/client'

export const tje = PostHogProvider

export const GLe = ReactDOMClient

export const xt: Window | undefined = typeof window !== 'undefined' ? window : undefined

export const by = {
  GZipJS: 'gzip-js',
  Base64: 'base64'
} as const

export class YFe {
  host: string
  endpoint: string

  constructor(host: string = '', endpoint: string = '') {
    this.host = host
    this.endpoint = endpoint
  }

  endpointFor(path: string): string {
    if (/^https?:\/\//i.test(path)) return path
    if (!this.host) return path
    const base = this.host.endsWith('/') ? this.host.slice(0, -1) : this.host
    const p = path.startsWith('/') ? path : `/${path}`
    return `${base}${p}`
  }
}

export function Pme(client: any, options: any) {
  const { release, ...rest } = options ?? {}
  const url = client?.sessionRecordingStarted?.() ? client?.get_session_replay_url?.({ withTimestamp: true }) : null

  const out: any = {
    ...rest,
    tags: {
      ...(rest?.tags ?? {}),
      ...(release ? { release } : {})
    }
  }

  if (url) {
    out.tags = {
      ...(out.tags ?? {}),
      sessionReplay: url
    }
  }

  return out
}

export function YBe(integration: any, config: any = {}) {
  const token = config.token ?? ''
  const host = config.host ?? ''
  const endpoint = config.endpoint ?? ''
  const requestRouter = config.requestRouter ?? new YFe(host, endpoint)

  const out: any = {
    ...(integration ?? {}),
    config: {
      ...(integration?.config ?? {}),
      segment: {
        ...(integration?.config?.segment ?? {}),
        token,
        host,
        endpoint,
        requestRouter,
        ...(typeof config.segment === 'object' ? config.segment : {})
      }
    }
  }

  return out
}

export function getPosthogClient() {
  const anyWindow = window as any
  return anyWindow?.posthog ?? posthog
}
