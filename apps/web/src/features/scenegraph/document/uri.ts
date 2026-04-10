export function uriPathMayBeRelative(path: string) {
  if (path.startsWith('//')) return false
  const colon = path.indexOf(':')
  if (colon < 0) return true
  const slash = path.indexOf('/')
  return slash < 0 ? false : slash < colon
}

export function uriJoinPath(uri: URI, base: URI) {
  if (base.authority !== undefined && base.path === '') return `/${uri.path}`
  const i = base.path.lastIndexOf('/')
  return i < 0 ? uri.path : base.path.substring(0, i + 1).concat(uri.path)
}

export function uriNormalizePath(input: string) {
  let path = input
  let out = ''
  while (path.length !== 0) {
    if (path.startsWith('../')) path = path.substring(3)
    else if (path.startsWith('./')) path = path.substring(2)
    else if (path.startsWith('/./') || path === '/.') path = path.substring(2)
    else if (path.startsWith('/../') || path === '/..') {
      path = path.substring(3)
      const slash = out.lastIndexOf('/')
      out = slash < 0 ? '' : out.substring(0, slash)
    } else if (path === '.' || path === '..') path = ''
    else {
      const slash = path.indexOf('/', 1)
      if (slash === -1) {
        out += path
        path = ''
      } else {
        out += path.substring(0, slash)
        path = path.substring(slash)
      }
    }
  }
  return out
}

export function uriBasename(uri: URI) {
  const parts = uri.path.split('/')
  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i] !== '') return decodeURIComponent(parts[i])
  }
  return ''
}

export function uriToStringOrPath(uri: URI) {
  return uri.scheme === 'file:' ? decodeURIComponent(uri.path) : uri.toString()
}

export class URI {
  static uriRegex =
    /^((?:[A-Za-z][A-Za-z0-9+.-]*:))?(\/\/[^/?#]*)?([^?#]*)(\?[^#]*)?(#.*)?$/

  scheme: string | undefined
  authority: string | undefined
  path: string
  query: string | undefined
  fragment: string | undefined

  constructor(
    scheme: string | undefined,
    authority: string | undefined,
    path: string,
    query: string | undefined,
    fragment: string | undefined
  ) {
    this.scheme = scheme
    this.authority = authority
    this.path = path
    this.query = query
    this.fragment = fragment
  }

  static from(input: string) {
    const m = input.match(URI.uriRegex)
    if (!m) return undefined
    return new URI(m[1], m[2], m[3], m[4], m[5])
  }

  get isRelative() {
    return this.scheme === undefined
  }

  withBase(base: URI) {
    if (base.isRelative) throw new Error('Base URI must be absolute!')
    let scheme: string | undefined
    let authority: string | undefined
    let path: string
    let query: string | undefined

    if (this.scheme !== undefined) {
      scheme = this.scheme
      authority = this.authority
      path = uriNormalizePath(this.path)
      query = this.query
    } else {
      if (this.authority !== undefined) {
        authority = this.authority
        path = uriNormalizePath(this.path)
        query = this.query
      } else {
        if (this.path === '') {
          path = base.path
          query = this.query !== undefined ? this.query : base.query
        } else {
          if (this.path.startsWith('/')) {
            path = uriNormalizePath(this.path)
          } else {
            path = uriNormalizePath(uriJoinPath(this, base))
          }
          query = this.query
        }
        authority = base.authority
      }
      scheme = base.scheme
    }

    return new URI(scheme, authority, path, query, this.fragment)
  }

  relativeTo(base: URI) {
    if (this.isRelative || base.isRelative) throw new Error('Both URIs must be absolute!')
    if (this.scheme !== base.scheme || this.authority !== base.authority) return this

    if (this.path === base.path) {
      if (this.query === base.query) return new URI(undefined, undefined, '', undefined, this.fragment)
      if (this.query === undefined) {
        if (this.path === '' || !uriPathMayBeRelative(this.path)) {
          return new URI(undefined, this.authority, this.path, this.query, this.fragment)
        }
        return new URI(undefined, undefined, this.path, this.query, this.fragment)
      }
      return new URI(undefined, undefined, '', this.query, this.fragment)
    }

    if (this.path === '') return new URI(undefined, this.authority, this.path, this.query, this.fragment)

    const target = this.path.split('/')
    const source = base.path.split('/')
    const rel: string[] = []

    let i = 0
    while (i < target.length - 1 && i < source.length - 1 && target[i] === source[i]) i++
    for (let j = i; j < source.length - 1; j++) rel.push('..')
    for (; i < target.length; i++) rel.push(target[i])

    let p = rel.join('/')
    if (p === '' || !uriPathMayBeRelative(p)) p = `./${p}`
    return new URI(undefined, undefined, p, this.query, this.fragment)
  }

  toString() {
    return `${this.scheme ?? ''}${this.authority ?? ''}${this.path ?? ''}${this.query ?? ''}${this.fragment ?? ''}`
  }
}

