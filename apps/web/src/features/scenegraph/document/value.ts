export type SizingBehavior = 'fixed' | 'fit_content' | 'fill_container'

export type SerializedSizingValue = number | string

export type ParsedSizingValue =
  | { behavior: 'fixed'; value: number }
  | { behavior: 'fit_content' | 'fill_container'; fallback: number }

const sizingBehaviorRegex = /^(\w+)(?:\((-?[\d.]+)\))?$/

export function parseSizingBehaviorString(input: string): ParsedSizingValue {
  const m = sizingBehaviorRegex.exec(input)
  if (!m) return { behavior: 'fit_content', fallback: 0 }

  const name = m[1]
  const fallbackRaw = m[2]
  const fallback = fallbackRaw ? Number.parseFloat(fallbackRaw) : 0
  const safeFallback = Number.isFinite(fallback) ? fallback : 0

  switch (name) {
    case 'fit_content':
      return { behavior: 'fit_content', fallback: safeFallback }
    case 'fill_container':
      return { behavior: 'fill_container', fallback: safeFallback }
    default:
      return { behavior: 'fit_content', fallback: 0 }
  }
}

export function parseSizingValue(input: SerializedSizingValue): ParsedSizingValue {
  if (typeof input === 'number') return { behavior: 'fixed', value: input }
  return parseSizingBehaviorString(input)
}

export function formatSizingBehavior(args: {
  behavior: Exclude<SizingBehavior, 'fixed'>
  fallback: number
  includeFallback: boolean
}) {
  const { behavior, fallback, includeFallback } = args
  return includeFallback ? `${behavior}(${fallback})` : behavior
}

export function serializeSizingValue(args: {
  behavior: SizingBehavior
  fallback: number
  parentHasLayout: boolean
  parentHasChildAffectingLayoutNotFillContainer: boolean
  nodeIsInLayout: boolean
}): SerializedSizingValue {
  const { behavior, fallback, parentHasLayout, parentHasChildAffectingLayoutNotFillContainer, nodeIsInLayout } = args

  switch (behavior) {
    case 'fixed':
      return fallback
    case 'fit_content': {
      const canOmitFallback = parentHasLayout && parentHasChildAffectingLayoutNotFillContainer
      return formatSizingBehavior({ behavior, fallback, includeFallback: !canOmitFallback })
    }
    case 'fill_container': {
      const canOmitFallback = nodeIsInLayout
      return formatSizingBehavior({ behavior, fallback, includeFallback: !canOmitFallback })
    }
  }
}

export function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}

export function radiansToDegrees(radians: number) {
  return (radians * 180) / Math.PI
}

export function deserializeRotationDegreesToRadians(degrees: number) {
  return -degreesToRadians(degrees)
}

export function serializeRotationRadiansToDegrees(radians: number) {
  return -radiansToDegrees(radians)
}

export type SerializedVariableRef = `$${string}`
export type SerializedScalar = number | string | boolean | SerializedVariableRef

export type SerializedFill =
  | SerializedScalar
  | SerializedFillItem
  | SerializedFillItem[]

export type SerializedFillItem =
  | {
      type: 'color'
      color: SerializedScalar
      enabled?: SerializedScalar
      blendMode?: string
    }
  | {
      type: 'gradient'
      gradientType: 'linear' | 'radial' | 'angular'
      enabled?: SerializedScalar
      opacity?: SerializedScalar
      rotation?: SerializedScalar
      size?: { width?: SerializedScalar; height?: SerializedScalar }
      center?: { x?: SerializedScalar; y?: SerializedScalar }
      colors: { color: SerializedScalar; position: SerializedScalar }[]
      blendMode?: string
    }
  | {
      type: 'image'
      url: SerializedScalar
      mode?: 'fill' | 'fit' | 'stretch'
      enabled?: SerializedScalar
      opacity?: SerializedScalar
      blendMode?: string
    }
  | {
      type: 'mesh_gradient'
      columns: number
      rows: number
      colors: SerializedScalar[]
      points: (
        | [number, number]
        | {
            position: [number, number]
            leftHandle?: [number, number]
            rightHandle?: [number, number]
            topHandle?: [number, number]
            bottomHandle?: [number, number]
          }
      )[]
      enabled?: SerializedScalar
      opacity?: SerializedScalar
      blendMode?: string
    }

export type SerializedStroke = {
  align?: 'inside' | 'center' | 'outside'
  thickness?:
    | SerializedScalar
    | {
        top?: SerializedScalar
        right?: SerializedScalar
        bottom?: SerializedScalar
        left?: SerializedScalar
      }
  join?: string
  cap?: string
  fill?: SerializedFill
}

export type SerializedEffect =
  | SerializedEffectItem
  | SerializedEffectItem[]

export type SerializedEffectItem =
  | { type: 'blur'; radius: SerializedScalar; enabled?: SerializedScalar }
  | {
      type: 'shadow'
      shadowType?: 'outer' | 'inner'
      enabled?: SerializedScalar
      color?: SerializedScalar
      offset?: { x?: SerializedScalar; y?: SerializedScalar }
      blur?: SerializedScalar
      spread?: SerializedScalar
      blendMode?: string
    }
  | { type: 'background_blur'; radius: SerializedScalar; enabled?: SerializedScalar }

export function normalizeToArray<T>(value: T | T[] | undefined | null) {
  if (value == null) return []
  return Array.isArray(value) ? value : [value]
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isVariableRefString(value: unknown): value is `$${string}` {
  return typeof value === 'string' && value.startsWith('$') && value.length > 1
}

function isNumericString(value: string) {
  const s = value.trim()
  if (s.length === 0) return false
  if (!/^-?(?:\d+|\d*\.\d+)(?:e-?\d+)?$/i.test(s)) return false
  return Number.isFinite(Number(s))
}

export function isSerializedScalar(value: unknown): value is SerializedScalar {
  return typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean'
}

export function isSerializedNumberLikeScalar(value: unknown): value is number | string {
  if (typeof value === 'number') return Number.isFinite(value)
  if (typeof value !== 'string') return false
  return isVariableRefString(value) || isNumericString(value)
}

export function isSerializedBooleanLikeScalar(value: unknown): value is boolean | string {
  if (typeof value === 'boolean') return true
  if (typeof value !== 'string') return false
  return isVariableRefString(value) || value === 'true' || value === 'false'
}

export function isSerializedFillItem(value: unknown): value is SerializedFillItem {
  if (!isPlainObject(value)) return false
  const type = value.type
  if (type === 'color') {
    if (!isSerializedScalar(value.color)) return false
    if (value.enabled !== undefined && !isSerializedBooleanLikeScalar(value.enabled)) return false
    return true
  }
  if (type === 'image') {
    if (!isSerializedScalar(value.url)) return false
    if (value.mode !== undefined && value.mode !== 'fill' && value.mode !== 'fit' && value.mode !== 'stretch') return false
    if (value.enabled !== undefined && !isSerializedBooleanLikeScalar(value.enabled)) return false
    if (value.opacity !== undefined && !isSerializedNumberLikeScalar(value.opacity)) return false
    return true
  }
  if (type === 'gradient') {
    if (value.gradientType !== 'linear' && value.gradientType !== 'radial' && value.gradientType !== 'angular') return false
    if (value.enabled !== undefined && !isSerializedBooleanLikeScalar(value.enabled)) return false
    if (value.opacity !== undefined && !isSerializedNumberLikeScalar(value.opacity)) return false
    if (value.rotation !== undefined && !isSerializedNumberLikeScalar(value.rotation)) return false
    if (value.size !== undefined) {
      if (!isPlainObject(value.size)) return false
      if (value.size.width !== undefined && !isSerializedNumberLikeScalar(value.size.width)) return false
      if (value.size.height !== undefined && !isSerializedNumberLikeScalar(value.size.height)) return false
    }
    if (value.center !== undefined) {
      if (!isPlainObject(value.center)) return false
      if (value.center.x !== undefined && !isSerializedNumberLikeScalar(value.center.x)) return false
      if (value.center.y !== undefined && !isSerializedNumberLikeScalar(value.center.y)) return false
    }
    if (!Array.isArray(value.colors)) return false
    return value.colors.every(c => isPlainObject(c) && isSerializedScalar(c.color) && isSerializedNumberLikeScalar(c.position))
  }
  if (type === 'mesh_gradient') {
    if (typeof value.columns !== 'number' || !Number.isFinite(value.columns) || value.columns <= 0) return false
    if (typeof value.rows !== 'number' || !Number.isFinite(value.rows) || value.rows <= 0) return false
    if (!Array.isArray(value.colors) || !value.colors.every(isSerializedScalar)) return false
    if (!Array.isArray(value.points)) return false
    const isPoint = (p: unknown) =>
      Array.isArray(p) &&
      p.length === 2 &&
      isSerializedNumberLikeScalar(p[0]) &&
      isSerializedNumberLikeScalar(p[1])
    const isPointField = (v: unknown) => v === undefined || isPoint(v)
    return value.points.every(p => {
      if (isPoint(p)) return true
      if (!isPlainObject(p)) return false
      if (!isPoint(p.position)) return false
      if (!isPointField(p.leftHandle)) return false
      if (!isPointField(p.rightHandle)) return false
      if (!isPointField(p.topHandle)) return false
      if (!isPointField(p.bottomHandle)) return false
      return true
    })
  }
  return false
}

export function isSerializedFill(value: unknown): value is SerializedFill {
  if (isSerializedScalar(value)) return true
  if (Array.isArray(value)) return value.every(isSerializedFillItem)
  return isSerializedFillItem(value)
}

export function isSerializedStroke(value: unknown): value is SerializedStroke {
  if (!isPlainObject(value)) return false
  if (value.align !== undefined && value.align !== 'inside' && value.align !== 'center' && value.align !== 'outside') return false
  if (value.thickness !== undefined) {
    const t = value.thickness
    if (isSerializedNumberLikeScalar(t)) {
    } else if (isPlainObject(t)) {
      for (const side of ['top', 'right', 'bottom', 'left'] as const) {
        if (t[side] !== undefined && !isSerializedNumberLikeScalar(t[side])) return false
      }
    } else return false
  }
  if (value.fill !== undefined && !isSerializedFill(value.fill)) return false
  return true
}

export function isSerializedEffectItem(value: unknown): value is SerializedEffectItem {
  if (!isPlainObject(value)) return false
  const type = value.type
  if (type === 'blur') {
    if (!isSerializedNumberLikeScalar(value.radius)) return false
    if (value.enabled !== undefined && !isSerializedBooleanLikeScalar(value.enabled)) return false
    return true
  }
  if (type === 'background_blur') {
    if (!isSerializedNumberLikeScalar(value.radius)) return false
    if (value.enabled !== undefined && !isSerializedBooleanLikeScalar(value.enabled)) return false
    return true
  }
  if (type === 'shadow') {
    if (value.shadowType !== undefined && value.shadowType !== 'outer' && value.shadowType !== 'inner') return false
    if (value.enabled !== undefined && !isSerializedBooleanLikeScalar(value.enabled)) return false
    if (value.color !== undefined && !isSerializedScalar(value.color)) return false
    if (value.offset !== undefined) {
      if (!isPlainObject(value.offset)) return false
      if (value.offset.x !== undefined && !isSerializedNumberLikeScalar(value.offset.x)) return false
      if (value.offset.y !== undefined && !isSerializedNumberLikeScalar(value.offset.y)) return false
    }
    if (value.blur !== undefined && !isSerializedNumberLikeScalar(value.blur)) return false
    if (value.spread !== undefined && !isSerializedNumberLikeScalar(value.spread)) return false
    if (value.blendMode !== undefined && typeof value.blendMode !== 'string') return false
    return true
  }
  return false
}

export function isSerializedEffect(value: unknown): value is SerializedEffect {
  if (Array.isArray(value)) return value.every(isSerializedEffectItem)
  return isSerializedEffectItem(value)
}

export function isSerializedGeometry(value: unknown) {
  if (typeof value === 'string') return value.length > 0
  if (Array.isArray(value)) {
    if (value.every(isSerializedNumberLikeScalar)) return true
    if (
      value.every(
        el =>
          Array.isArray(el) &&
          el.length > 0 &&
          (typeof el[0] === 'string' ? true : isSerializedNumberLikeScalar(el[0])) &&
          el.slice(typeof el[0] === 'string' ? 1 : 0).every(isSerializedNumberLikeScalar)
      )
    )
      return true
    if (
      value.every(
        el =>
          isPlainObject(el) &&
          typeof el.cmd === 'string' &&
          (el.args === undefined || (Array.isArray(el.args) && el.args.every(isSerializedNumberLikeScalar)))
      )
    )
      return true
    return false
  }
  if (isPlainObject(value)) {
    if (typeof value.d === 'string') return value.d.length > 0
    if (typeof value.path === 'string') return value.path.length > 0
    if (Array.isArray(value.commands)) return value.commands.every(c => typeof c === 'string' || isPlainObject(c))
  }
  return false
}
