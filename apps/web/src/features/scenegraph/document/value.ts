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

export function isSerializedScalar(value: unknown): value is SerializedScalar {
  return typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean'
}

export function isSerializedFillItem(value: unknown): value is SerializedFillItem {
  if (!isPlainObject(value)) return false
  const type = value.type
  if (type === 'color') return isSerializedScalar(value.color)
  if (type === 'image') return isSerializedScalar(value.url)
  if (type === 'gradient') {
    if (value.gradientType !== 'linear' && value.gradientType !== 'radial' && value.gradientType !== 'angular') return false
    if (!Array.isArray(value.colors)) return false
    return value.colors.every(c => isPlainObject(c) && isSerializedScalar(c.color) && isSerializedScalar(c.position))
  }
  if (type === 'mesh_gradient') {
    if (typeof value.columns !== 'number' || typeof value.rows !== 'number') return false
    if (!Array.isArray(value.colors) || !value.colors.every(isSerializedScalar)) return false
    if (!Array.isArray(value.points)) return false
    return true
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
    if (isSerializedScalar(t)) {
    } else if (isPlainObject(t)) {
      for (const side of ['top', 'right', 'bottom', 'left'] as const) {
        if (t[side] !== undefined && !isSerializedScalar(t[side])) return false
      }
    } else return false
  }
  if (value.fill !== undefined && !isSerializedFill(value.fill)) return false
  return true
}

export function isSerializedEffectItem(value: unknown): value is SerializedEffectItem {
  if (!isPlainObject(value)) return false
  const type = value.type
  if (type === 'blur') return isSerializedScalar(value.radius)
  if (type === 'background_blur') return isSerializedScalar(value.radius)
  if (type === 'shadow') return true
  return false
}

export function isSerializedEffect(value: unknown): value is SerializedEffect {
  if (Array.isArray(value)) return value.every(isSerializedEffectItem)
  return isSerializedEffectItem(value)
}
