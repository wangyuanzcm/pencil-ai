import {
  deserializeRotationDegreesToRadians,
  isSerializedEffect,
  isSerializedFill,
  isSerializedGeometry,
  isSerializedStroke,
  type SizingBehavior
} from './value'
import { deserializeSizing, type DeserializedNodeProperties, type SerializedSceneNodeLike } from './node-properties'

export type OverrideVariableType = 'number' | 'boolean' | 'string'
export type OverrideVariableResolver = (args: { name: string; type: OverrideVariableType }) => unknown

export type DeserializedNodeOverridePatch = Partial<
  Pick<
    DeserializedNodeProperties,
    | 'context'
    | 'theme'
    | 'name'
    | 'enabled'
    | 'x'
    | 'y'
    | 'rotationRadians'
    | 'opacity'
    | 'flipX'
    | 'flipY'
    | 'clip'
    | 'placeholder'
    | 'layoutPosition'
    | 'width'
    | 'height'
    | 'fill'
    | 'stroke'
    | 'effect'
    | 'geometry'
    | 'cornerRadius'
    | 'polygonCount'
    | 'ellipseInnerRadius'
    | 'ellipseStartAngle'
    | 'ellipseSweepAngle'
    | 'text'
    | 'layout'
    | 'icon'
    | 'path'
  >
>

export type DeserializeOverridePatchOptions = {
  nodeType: string
  resolveVariable?: OverrideVariableResolver
}

function defaultSizingBehaviorForNodeType(type: string): { horizontal: SizingBehavior; vertical: SizingBehavior } {
  if (type === 'frame') return { horizontal: 'fit_content', vertical: 'fit_content' }
  return { horizontal: 'fixed', vertical: 'fixed' }
}

function resolveBoolean(input: unknown, resolveVariable: OverrideVariableResolver | undefined): boolean | undefined {
  if (input === undefined) return undefined
  if (typeof input === 'string' && input.startsWith('$')) {
    const v = resolveVariable?.({ name: input.substring(1), type: 'boolean' })
    return typeof v === 'boolean' ? v : undefined
  }
  if (typeof input === 'boolean') return input
  if (typeof input === 'string') {
    if (input === 'true') return true
    if (input === 'false') return false
  }
  return undefined
}

function resolveNumber(input: unknown, resolveVariable: OverrideVariableResolver | undefined): number | undefined {
  if (input === undefined) return undefined
  if (typeof input === 'string' && input.startsWith('$')) {
    const v = resolveVariable?.({ name: input.substring(1), type: 'number' })
    return typeof v === 'number' ? v : undefined
  }
  if (typeof input === 'number') return input
  if (typeof input === 'string') {
    const n = Number.parseFloat(input)
    return Number.isFinite(n) ? n : undefined
  }
  return undefined
}

function resolveString(input: unknown, resolveVariable: OverrideVariableResolver | undefined): string | undefined {
  if (input === undefined) return undefined
  if (typeof input === 'string' && input.startsWith('$')) {
    const v = resolveVariable?.({ name: input.substring(1), type: 'string' })
    return typeof v === 'string' ? v : undefined
  }
  if (typeof input === 'string') return input
  return undefined
}

const deepResolveNumberKeys = new Set([
  'opacity',
  'rotation',
  'radius',
  'position',
  'x',
  'y',
  'width',
  'height',
  'blur',
  'spread',
  'gap',
  'thickness',
  'top',
  'right',
  'bottom',
  'left',
  'fontSize',
  'letterSpacing',
  'lineHeight',
  'cornerRadius',
  'polygonCount',
  'innerRadius',
  'startAngle',
  'sweepAngle',
  'weight'
])

const deepResolveBooleanKeys = new Set(['enabled', 'includeStroke', 'layoutIncludeStroke', 'underline', 'strikethrough'])

const deepResolveStringKeys = new Set([
  'color',
  'url',
  'blendMode',
  'gradientType',
  'mode',
  'shadowType',
  'fillRule',
  'href',
  'fontFamily',
  'fontWeight',
  'fontStyle',
  'iconFontName',
  'iconFontFamily'
])

function deepResolveVariables(value: unknown, resolveVariable: OverrideVariableResolver | undefined): unknown {
  if (!resolveVariable) return value
  if (Array.isArray(value)) return value.map(v => deepResolveVariables(v, resolveVariable))
  if (typeof value !== 'object' || value === null) return value

  const out: Record<string, unknown> = {}
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (typeof raw === 'string' && raw.startsWith('$') && key !== 'type') {
      if (deepResolveNumberKeys.has(key)) {
        const v = resolveVariable({ name: raw.substring(1), type: 'number' })
        out[key] = typeof v === 'number' && Number.isFinite(v) ? v : raw
        continue
      }
      if (deepResolveBooleanKeys.has(key)) {
        const v = resolveVariable({ name: raw.substring(1), type: 'boolean' })
        out[key] = typeof v === 'boolean' ? v : raw
        continue
      }
      if (deepResolveStringKeys.has(key)) {
        const v = resolveVariable({ name: raw.substring(1), type: 'string' })
        out[key] = typeof v === 'string' ? v : raw
        continue
      }
    }
    out[key] = deepResolveVariables(raw, resolveVariable)
  }
  return out
}

function normalizePadding(
  input: SerializedSceneNodeLike['padding'],
  resolveVariable: OverrideVariableResolver | undefined
): [number, number, number, number] | undefined {
  if (input === undefined) return undefined
  const scalar = (v: unknown) => resolveNumber(v, resolveVariable) ?? 0

  if (typeof input === 'number' || typeof input === 'string') {
    const all = scalar(input)
    return [all, all, all, all]
  }

  if (Array.isArray(input) && input.length === 2) {
    const v = scalar(input[0])
    const h = scalar(input[1])
    return [v, h, v, h]
  }

  if (Array.isArray(input) && input.length === 4) {
    return [scalar(input[0]), scalar(input[1]), scalar(input[2]), scalar(input[3])]
  }

  return undefined
}

function normalizeLayoutMode(value: unknown): 'none' | 'horizontal' | 'vertical' | undefined {
  if (value === undefined) return undefined
  if (typeof value !== 'string') return 'none'
  const v = value.toLowerCase()
  if (v === 'horizontal') return 'horizontal'
  if (v === 'vertical') return 'vertical'
  return 'none'
}

function normalizeAlignItems(value: unknown): 'start' | 'end' | 'center' | undefined {
  if (value === undefined) return undefined
  if (typeof value !== 'string') return 'start'
  switch (value.toLowerCase()) {
    case 'start':
    case 'flex-start':
    case 'flex_start':
    case 'flex start':
    case 'flexstart':
    case 'min':
      return 'start'
    case 'end':
    case 'flex-end':
    case 'flex_end':
    case 'flex end':
    case 'flexend':
    case 'max':
      return 'end'
    case 'center':
      return 'center'
    default:
      return 'start'
  }
}

function normalizeJustifyContent(value: unknown): 'start' | 'end' | 'center' | 'space_between' | 'space_around' | undefined {
  if (value === undefined) return undefined
  if (typeof value !== 'string') return 'start'
  switch (value.toLowerCase()) {
    case 'start':
    case 'flex-start':
    case 'flex_start':
    case 'flex start':
    case 'flexstart':
      return 'start'
    case 'end':
    case 'flex-end':
    case 'flex_end':
    case 'flex end':
    case 'flexend':
      return 'end'
    case 'center':
      return 'center'
    case 'space_between':
    case 'space-between':
    case 'space between':
    case 'spacebetween':
    case 'between':
      return 'space_between'
    case 'space_around':
    case 'space-around':
    case 'space around':
    case 'spacearound':
    case 'around':
      return 'space_around'
    default:
      return 'start'
  }
}

function normalizeLayoutPosition(value: unknown): 'auto' | 'absolute' | string | undefined {
  if (value === undefined) return undefined
  if (typeof value !== 'string') return 'auto'
  const v = value.toLowerCase()
  if (v === 'auto') return 'auto'
  if (v === 'absolute') return 'absolute'
  return value
}

export function deserializeDescendantOverrideToPatch(
  override: Record<string, unknown>,
  options: DeserializeOverridePatchOptions
): DeserializedNodeOverridePatch {
  const { resolveVariable, nodeType } = options
  const sizingDefaults = defaultSizingBehaviorForNodeType(nodeType)
  const patch: DeserializedNodeOverridePatch = {}

  if (override.context !== undefined) patch.context = override.context
  if (override.theme !== undefined && typeof override.theme === 'object' && override.theme !== null && !Array.isArray(override.theme)) {
    patch.theme = override.theme as Record<string, unknown>
  }

  const name = resolveString(override.name, resolveVariable)
  if (name !== undefined) patch.name = name

  const enabled = resolveBoolean(override.enabled, resolveVariable)
  if (enabled !== undefined) patch.enabled = enabled

  const x = resolveNumber(override.x, resolveVariable)
  if (x !== undefined) patch.x = x

  const y = resolveNumber(override.y, resolveVariable)
  if (y !== undefined) patch.y = y

  const flipX = resolveBoolean(override.flipX, resolveVariable)
  if (flipX !== undefined) patch.flipX = flipX

  const flipY = resolveBoolean(override.flipY, resolveVariable)
  if (flipY !== undefined) patch.flipY = flipY

  const clip = resolveBoolean(override.clip, resolveVariable)
  if (clip !== undefined) patch.clip = clip

  if (override.placeholder !== undefined) patch.placeholder = Boolean(override.placeholder)

  const opacity = resolveNumber(override.opacity, resolveVariable)
  if (opacity !== undefined) patch.opacity = opacity

  const rotation = resolveNumber(override.rotation, resolveVariable)
  if (rotation !== undefined) patch.rotationRadians = deserializeRotationDegreesToRadians(rotation)

  if (override.width !== undefined) {
    const w = override.width
    if (typeof w === 'string' && w.startsWith('$')) {
      const resolved = resolveVariable?.({ name: w.substring(1), type: 'number' })
      if (typeof resolved === 'number' && Number.isFinite(resolved)) patch.width = deserializeSizing(resolved, sizingDefaults.horizontal)
    } else patch.width = deserializeSizing(w as any, sizingDefaults.horizontal)
  }

  if (override.height !== undefined) {
    const h = override.height
    if (typeof h === 'string' && h.startsWith('$')) {
      const resolved = resolveVariable?.({ name: h.substring(1), type: 'number' })
      if (typeof resolved === 'number' && Number.isFinite(resolved)) patch.height = deserializeSizing(resolved, sizingDefaults.vertical)
    } else patch.height = deserializeSizing(h as any, sizingDefaults.vertical)
  }

  if (override.fill !== undefined) {
    const resolved = deepResolveVariables(override.fill, resolveVariable)
    if (isSerializedFill(resolved)) patch.fill = resolved
  }

  if (override.stroke !== undefined) {
    const resolved = deepResolveVariables(override.stroke, resolveVariable)
    if (isSerializedStroke(resolved)) patch.stroke = resolved
  }

  if (override.effect !== undefined) {
    const resolved = deepResolveVariables(override.effect, resolveVariable)
    if (isSerializedEffect(resolved)) patch.effect = resolved
  }

  if (override.geometry !== undefined && isSerializedGeometry(override.geometry)) patch.geometry = override.geometry

  const cornerRadius = resolveNumber(override.cornerRadius, resolveVariable)
  if (cornerRadius !== undefined) patch.cornerRadius = cornerRadius

  const polygonCount = resolveNumber(override.polygonCount, resolveVariable)
  if (polygonCount !== undefined) patch.polygonCount = polygonCount

  const innerRadius = resolveNumber(override.innerRadius, resolveVariable)
  if (innerRadius !== undefined) patch.ellipseInnerRadius = innerRadius

  const startAngle = resolveNumber(override.startAngle, resolveVariable)
  if (startAngle !== undefined) patch.ellipseStartAngle = startAngle

  const sweepAngle = resolveNumber(override.sweepAngle, resolveVariable)
  if (sweepAngle !== undefined) patch.ellipseSweepAngle = sweepAngle

  const layoutMode = normalizeLayoutMode(override.layout)
  const gap = resolveNumber(override.gap, resolveVariable)
  const padding = normalizePadding(override.padding as any, resolveVariable)
  const justifyContent = normalizeJustifyContent(override.justifyContent)
  const alignItems = normalizeAlignItems(override.alignItems)
  const includeStroke =
    resolveBoolean(override.includeStroke, resolveVariable) ?? resolveBoolean(override.layoutIncludeStroke, resolveVariable)

  if (
    layoutMode !== undefined ||
    gap !== undefined ||
    padding !== undefined ||
    justifyContent !== undefined ||
    alignItems !== undefined ||
    includeStroke !== undefined
  ) {
    patch.layout = {
      mode: layoutMode ?? 'none',
      gap: gap ?? 0,
      padding,
      justifyContent: justifyContent ?? 'start',
      alignItems: alignItems ?? 'start',
      includeStroke: includeStroke ?? false
    }
  }

  const layoutPosition = normalizeLayoutPosition(override.layoutPosition)
  if (layoutPosition !== undefined) patch.layoutPosition = layoutPosition

  const content = resolveString(override.content, resolveVariable)
  if (content !== undefined) {
    patch.text = { ...(patch.text ?? { content: '' }), content }
  }

  const href = resolveString(override.href, resolveVariable)
  if (href !== undefined) patch.text = { ...(patch.text ?? { content: '' }), href }

  const underline = resolveBoolean(override.underline, resolveVariable)
  if (underline !== undefined) patch.text = { ...(patch.text ?? { content: '' }), underline }

  const strikethrough = resolveBoolean(override.strikethrough, resolveVariable)
  if (strikethrough !== undefined) patch.text = { ...(patch.text ?? { content: '' }), strikethrough }

  if (override.metadata !== undefined) patch.text = { ...(patch.text ?? { content: '' }), metadata: override.metadata }

  const fontFamily = resolveString(override.fontFamily, resolveVariable)
  if (fontFamily !== undefined) patch.text = { ...(patch.text ?? { content: '' }), fontFamily }

  const fontWeight = resolveString(override.fontWeight, resolveVariable)
  if (fontWeight !== undefined) patch.text = { ...(patch.text ?? { content: '' }), fontWeight }

  const fontStyle = resolveString(override.fontStyle, resolveVariable)
  if (fontStyle !== undefined) patch.text = { ...(patch.text ?? { content: '' }), fontStyle }

  const fontSize = resolveNumber(override.fontSize, resolveVariable)
  if (fontSize !== undefined) patch.text = { ...(patch.text ?? { content: '' }), fontSize }

  const letterSpacing = resolveNumber(override.letterSpacing, resolveVariable)
  if (letterSpacing !== undefined) patch.text = { ...(patch.text ?? { content: '' }), letterSpacing }

  const lineHeight = resolveNumber(override.lineHeight, resolveVariable)
  if (lineHeight !== undefined) patch.text = { ...(patch.text ?? { content: '' }), lineHeight }

  if (typeof override.textAlign === 'string') patch.text = { ...(patch.text ?? { content: '' }), textAlign: override.textAlign }
  if (typeof override.textAlignVertical === 'string')
    patch.text = { ...(patch.text ?? { content: '' }), textAlignVertical: override.textAlignVertical }
  if (typeof override.textGrowth === 'string') patch.text = { ...(patch.text ?? { content: '' }), textGrowth: override.textGrowth }

  const iconFontName = resolveString(override.iconFontName, resolveVariable)
  const iconFontFamily = resolveString(override.iconFontFamily, resolveVariable)
  const iconFontWeight = resolveNumber(override.weight, resolveVariable)
  if (iconFontName !== undefined || iconFontFamily !== undefined || iconFontWeight !== undefined || override.fill !== undefined) {
    patch.icon = {
      iconFontName,
      iconFontFamily,
      iconFontWeight,
      fill: patch.fill
    }
  }

  if (override.fillRule !== undefined && typeof override.fillRule === 'string') patch.path = { fillRule: override.fillRule }

  return patch
}
