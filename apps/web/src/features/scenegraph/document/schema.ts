export const NODE_TYPES = [
  'frame',
  'group',
  'rectangle',
  'ellipse',
  'line',
  'polygon',
  'path',
  'text',
  'note',
  'prompt',
  'context',
  'icon_font',
  'ref',
  'connection'
] as const

export type NodeType = (typeof NODE_TYPES)[number]

export const NODE_PROPERTY_KEYS = [
  'name',
  'context',
  'theme',
  'enabled',
  'width',
  'height',
  'x',
  'y',
  'rotation',
  'flipX',
  'flipY',
  'clip',
  'placeholder',
  'fills',
  'strokeFills',
  'strokeWidth',
  'strokeAlignment',
  'lineJoin',
  'lineCap',
  'opacity',
  'textContent',
  'textAlign',
  'textAlignVertical',
  'textGrowth',
  'fontSize',
  'letterSpacing',
  'lineHeight',
  'fontFamily',
  'fontWeight',
  'fontStyle',
  'cornerRadius',
  'iconFontName',
  'iconFontFamily',
  'iconFontWeight',
  'effects',
  'pathData',
  'fillRule',
  'polygonCount',
  'ellipseInnerRadius',
  'ellipseStartAngle',
  'ellipseSweep',
  'layoutIncludeStroke',
  'layoutMode',
  'layoutPosition',
  'layoutChildSpacing',
  'layoutPadding',
  'layoutJustifyContent',
  'layoutAlignItems',
  'verticalSizing',
  'horizontalSizing',
  'modelName',
  'metadata'
] as const

export type NodePropertyKey = (typeof NODE_PROPERTY_KEYS)[number]

export const OVERRIDDEN_PROPERTY_TO_SERIALIZED_KEY: Partial<Record<NodePropertyKey, string>> = {
  name: 'name',
  context: 'context',
  theme: 'theme',
  enabled: 'enabled',
  width: 'width',
  height: 'height',
  horizontalSizing: 'width',
  verticalSizing: 'height',
  x: 'x',
  y: 'y',
  rotation: 'rotation',
  flipX: 'flipX',
  flipY: 'flipY',
  clip: 'clip',
  fills: 'fill',
  strokeFills: 'stroke',
  strokeWidth: 'stroke',
  strokeAlignment: 'stroke',
  lineJoin: 'stroke',
  lineCap: 'stroke',
  opacity: 'opacity',
  textContent: 'content',
  textAlign: 'textAlign',
  textAlignVertical: 'textAlignVertical',
  textGrowth: 'textGrowth',
  fontSize: 'fontSize',
  letterSpacing: 'letterSpacing',
  lineHeight: 'lineHeight',
  fontFamily: 'fontFamily',
  fontWeight: 'fontWeight',
  fontStyle: 'fontStyle',
  cornerRadius: 'cornerRadius',
  iconFontName: 'iconFontName',
  iconFontFamily: 'iconFontFamily',
  effects: 'effect',
  pathData: 'geometry',
  fillRule: 'fillRule',
  polygonCount: 'polygonCount',
  ellipseInnerRadius: 'innerRadius',
  ellipseStartAngle: 'startAngle',
  ellipseSweep: 'sweepAngle',
  layoutChildSpacing: 'gap',
  layoutMode: 'layout',
  layoutPadding: 'padding',
  layoutJustifyContent: 'justifyContent',
  layoutAlignItems: 'alignItems',
  layoutPosition: 'layoutPosition'
}

export function getSerializedOverrideKeyForProperty(key: NodePropertyKey) {
  return OVERRIDDEN_PROPERTY_TO_SERIALIZED_KEY[key]
}

export function isNodeType(value: unknown): value is NodeType {
  return typeof value === 'string' && (NODE_TYPES as readonly string[]).includes(value)
}

export function isNodePropertyKey(value: unknown): value is NodePropertyKey {
  return typeof value === 'string' && (NODE_PROPERTY_KEYS as readonly string[]).includes(value)
}

