import {
  deserializeRotationDegreesToRadians,
  isSerializedEffect,
  isSerializedFill,
  isSerializedStroke,
  parseSizingValue,
  type ParsedSizingValue,
  type SerializedEffect,
  type SerializedFill,
  type SerializedStroke,
  type SizingBehavior
} from './value'
import { getSerializedOverrideKeyForProperty, isNodePropertyKey, type NodePropertyKey, type NodeType } from './schema'

export type SerializedNodeTextAlign = 'left' | 'center' | 'right' | string
export type SerializedNodeTextAlignVertical = 'top' | 'middle' | 'bottom' | string
export type SerializedNodeTextGrowth = 'auto' | 'fixed-width' | 'fixed-width-height' | string

export type SerializedSceneNodeLike = {
  type: NodeType | string
  id?: string
  name?: string
  enabled?: boolean
  x?: number
  y?: number
  rotation?: number
  opacity?: number
  flipX?: boolean
  flipY?: boolean
  clip?: boolean
  placeholder?: boolean
  layout?: string
  gap?: number | string
  padding?: number | string | [number | string, number | string] | [number | string, number | string, number | string, number | string]
  justifyContent?: string
  alignItems?: string
  includeStroke?: boolean
  layoutPosition?: string
  width?: number | string
  height?: number | string
  fill?: SerializedFill
  stroke?: SerializedStroke
  effect?: SerializedEffect
  geometry?: unknown
  fillRule?: string
  iconFontName?: string
  iconFontFamily?: string
  weight?: number | string

  content?: string
  fontFamily?: string
  fontSize?: number
  fontWeight?: string
  fontStyle?: string
  letterSpacing?: number
  lineHeight?: number
  textAlign?: SerializedNodeTextAlign
  textAlignVertical?: SerializedNodeTextAlignVertical
  textGrowth?: SerializedNodeTextGrowth
}

export type DeserializedSizing = { value: number; behavior: SizingBehavior }

export type DeserializedNodeProperties = {
  name?: string
  enabled: boolean
  x: number
  y: number
  rotationRadians: number
  opacity: number
  flipX: boolean
  flipY: boolean
  clip: boolean
  placeholder: boolean
  layoutPosition: 'auto' | 'absolute' | string
  layout?: {
    mode: 'none' | 'horizontal' | 'vertical'
    gap: number
    padding?: [number, number, number, number]
    justifyContent: 'start' | 'end' | 'center' | 'space_between' | 'space_around'
    alignItems: 'start' | 'end' | 'center'
    includeStroke: boolean
  }
  width: DeserializedSizing
  height: DeserializedSizing
  fill?: SerializedFill
  stroke?: SerializedStroke
  effect?: SerializedEffect
  geometry?: unknown
  icon?: {
    iconFontName?: string
    iconFontFamily?: string
    iconFontWeight?: number
    fill?: SerializedFill
  }
  path?: {
    fillRule?: string
  }
  text?: {
    content: string
    fontFamily?: string
    fontSize?: number
    fontWeight?: string
    fontStyle?: string
    letterSpacing?: number
    lineHeight?: number
    textAlign?: SerializedNodeTextAlign
    textAlignVertical?: SerializedNodeTextAlignVertical
    textGrowth?: SerializedNodeTextGrowth
  }
}

function defaultSizingBehaviorForNodeType(type: string): { horizontal: SizingBehavior; vertical: SizingBehavior } {
  if (type === 'frame') return { horizontal: 'fit_content', vertical: 'fit_content' }
  return { horizontal: 'fixed', vertical: 'fixed' }
}

function parsedSizingToDeserializedSizing(parsed: ParsedSizingValue): DeserializedSizing {
  if (parsed.behavior === 'fixed') return { behavior: 'fixed', value: parsed.value }
  return { behavior: parsed.behavior, value: parsed.fallback }
}

export function deserializeSizing(input: number | string | undefined, defaultBehavior: SizingBehavior): DeserializedSizing {
  if (input === undefined) return { behavior: defaultBehavior, value: 0 }
  if (typeof input === 'string' && input.startsWith('$')) return { behavior: defaultBehavior, value: 0 }
  return parsedSizingToDeserializedSizing(parseSizingValue(input))
}

function parseNumberOrDefault(input: number | string | undefined, fallback: number) {
  if (input === undefined) return fallback
  if (typeof input === 'number') return Number.isFinite(input) ? input : fallback
  if (input.startsWith('$')) return fallback
  const n = Number.parseFloat(input)
  return Number.isFinite(n) ? n : fallback
}

function parseNumberOrUndefined(input: number | string | undefined) {
  if (input === undefined) return undefined
  if (typeof input === 'number') return Number.isFinite(input) ? input : undefined
  if (input.startsWith('$')) return undefined
  const n = Number.parseFloat(input)
  return Number.isFinite(n) ? n : undefined
}

function normalizePadding(input: SerializedSceneNodeLike['padding']): [number, number, number, number] | undefined {
  if (input === undefined) return undefined
  if (typeof input === 'number' || typeof input === 'string') {
    const all = parseNumberOrDefault(input, 0)
    return [all, all, all, all]
  }
  if (Array.isArray(input) && input.length === 2) {
    const v = parseNumberOrDefault(input[0], 0)
    const h = parseNumberOrDefault(input[1], 0)
    return [v, h, v, h]
  }
  if (Array.isArray(input) && input.length === 4) {
    return [
      parseNumberOrDefault(input[0], 0),
      parseNumberOrDefault(input[1], 0),
      parseNumberOrDefault(input[2], 0),
      parseNumberOrDefault(input[3], 0)
    ]
  }
  return undefined
}

function normalizeLayoutMode(value: unknown): 'none' | 'horizontal' | 'vertical' {
  if (typeof value !== 'string') return 'none'
  const v = value.toLowerCase()
  if (v === 'horizontal') return 'horizontal'
  if (v === 'vertical') return 'vertical'
  return 'none'
}

function normalizeAlignItems(value: unknown): 'start' | 'end' | 'center' {
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

function normalizeJustifyContent(value: unknown): 'start' | 'end' | 'center' | 'space_between' | 'space_around' {
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

function normalizeLayoutPosition(value: unknown): 'auto' | 'absolute' | string {
  if (typeof value !== 'string') return 'auto'
  const v = value.toLowerCase()
  if (v === 'auto') return 'auto'
  if (v === 'absolute') return 'absolute'
  return value
}

export function collectSerializedOverrideKeysFromPropertyKeys(keys: Iterable<string>) {
  const out = new Set<string>()
  for (const key of keys) {
    if (!isNodePropertyKey(key)) continue
    const mapped = getSerializedOverrideKeyForProperty(key as NodePropertyKey)
    if (mapped) out.add(mapped)
  }
  return Array.from(out.values()).sort((a, b) => a.localeCompare(b))
}

export function deserializeNodeProperties(node: SerializedSceneNodeLike): DeserializedNodeProperties {
  const sizingDefaults = defaultSizingBehaviorForNodeType(node.type)

  const rotationDegrees = typeof node.rotation === 'number' ? node.rotation : 0
  const opacity = typeof node.opacity === 'number' ? node.opacity : 1

  const out: DeserializedNodeProperties = {
    name: node.name,
    enabled: node.enabled ?? true,
    x: node.x ?? 0,
    y: node.y ?? 0,
    rotationRadians: deserializeRotationDegreesToRadians(rotationDegrees),
    opacity,
    flipX: node.flipX ?? false,
    flipY: node.flipY ?? false,
    clip: node.clip ?? false,
    placeholder: node.placeholder ?? false,
    layoutPosition: normalizeLayoutPosition(node.layoutPosition),
    width: deserializeSizing(node.width, sizingDefaults.horizontal),
    height: deserializeSizing(node.height, sizingDefaults.vertical)
  }

  if (node.fill !== undefined && isSerializedFill(node.fill)) out.fill = node.fill
  if (node.stroke !== undefined && isSerializedStroke(node.stroke)) out.stroke = node.stroke
  if (node.effect !== undefined && isSerializedEffect(node.effect)) out.effect = node.effect
  if (node.geometry !== undefined) out.geometry = node.geometry

  const layoutMode = normalizeLayoutMode(node.layout)
  if (layoutMode !== 'none') {
    out.layout = {
      mode: layoutMode,
      gap: parseNumberOrDefault(node.gap, 0),
      padding: normalizePadding(node.padding),
      justifyContent: normalizeJustifyContent(node.justifyContent),
      alignItems: normalizeAlignItems(node.alignItems),
      includeStroke: node.includeStroke ?? false
    }
  }

  if (node.type === 'icon_font') {
    out.icon = {
      iconFontName: node.iconFontName,
      iconFontFamily: node.iconFontFamily,
      iconFontWeight: parseNumberOrUndefined(node.weight),
      fill: node.fill !== undefined && isSerializedFill(node.fill) ? node.fill : undefined
    }
  }

  if (node.type === 'path') {
    out.path = { fillRule: node.fillRule }
  }

  if (node.type === 'text' || node.type === 'note' || node.type === 'prompt' || node.type === 'context') {
    out.text = {
      content: typeof node.content === 'string' ? node.content : '',
      fontFamily: node.fontFamily,
      fontSize: node.fontSize,
      fontWeight: node.fontWeight,
      fontStyle: node.fontStyle,
      letterSpacing: node.letterSpacing,
      lineHeight: node.lineHeight,
      textAlign: node.textAlign,
      textAlignVertical: node.textAlignVertical,
      textGrowth: node.textGrowth
    }
  }

  return out
}

