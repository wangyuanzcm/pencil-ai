import { uuidV4 } from './uuid'

function degToRad(deg: number) {
  return (deg * Math.PI) / 180
}

function parseRgbaToHex(input: string) {
  const m = input
    .replace(/\s/g, '')
    .toLowerCase()
    .match(/^rgba?\((\d+),(\d+),(\d+)(?:,([0-9]*\.?[0-9]+))?\)$/)
  if (!m) return null
  const r = parseInt(m[1], 10)
  const g = parseInt(m[2], 10)
  const b = parseInt(m[3], 10)
  const a = m[4] !== undefined ? Math.min(1, Math.max(0, parseFloat(m[4]))) : 1
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return null
  const hex = (v: number) => Math.round(v).toString(16).padStart(2, '0')
  const rr = hex(r)
  const gg = hex(g)
  const bb = hex(b)
  const aa = hex(a * 255)
  return a < 1 ? `#${rr}${gg}${bb}${aa}` : `#${rr}${gg}${bb}`
}

function hasFill(e: any) {
  return (e.fillColor != null && e.fillColor !== 'transparent') || e.fillGradient != null
}

function hasStroke(e: any) {
  return Boolean(e.strokeColor && e.strokeWidth)
}

function hasEffect(e: any) {
  return Boolean((e.blurFilter && e.blurFilter > 0) || (e.dropShadowFilter && e.dropShadowFilter.enabled))
}

function pickFill(e: any) {
  if (e.fillGradient) return null
  if (e.fillColor != null) {
    const c = parseRgbaToHex(e.fillColor)
    return c ?? e.fillColor
  }
  return '#000000'
}

function pickStroke(e: any) {
  const out: any = {}
  if (e.strokeWidth) out.thickness = e.strokeWidth
  if (e.lineJoin) out.join = e.lineJoin
  if (e.strokeColor) out.fill = e.strokeColor
  switch (e.strokeAlignment) {
    case 0:
      out.align = 'outside'
      break
    case 0.5:
      out.align = 'center'
      break
    case 1:
      out.align = 'inside'
      break
  }
  out.cap = e.lineCap
  return out
}

function pickEffect(e: any) {
  const effects: any[] = []
  if (e.blurFilter && e.blurFilter > 0) effects.push({ type: 'blur', radius: e.blurFilter })
  if (e.dropShadowFilter?.enabled) {
    const o = e.dropShadowFilter
    effects.push({
      type: 'shadow',
      shadowType: 'outer',
      offset: { x: o.offset?.x ?? 0, y: o.offset?.y ?? 0 },
      blur: o.blur ?? 0,
      spread: o.spread ?? 0,
      color: o.color ?? '#000000ff'
    })
  }
  if (effects.length === 0) return undefined
  return effects.length === 1 ? effects[0] : effects
}

function convertV1Node(node: any): any | null {
  const e = node?.properties ?? {}
  const out: any = {
    id: node?.id || uuidV4(),
    x: e.x ?? 0,
    y: e.y ?? 0
  }

  if (e.flipX) out.flipX = true
  if (e.flipY) out.flipY = true
  if (e.disabled) out.disabled = true
  if (e.rotation) out.rotation = degToRad(e.rotation) * -1
  if (e.opacity != null && e.opacity !== 1) out.opacity = e.opacity
  if (hasStroke(e)) out.stroke = pickStroke(e)
  if (hasEffect(e)) out.effect = pickEffect(e)
  if (hasFill(e)) {
    const fill = pickFill(e)
    if (fill != null) out.fill = fill
  }

  const type = node?.type
  if (type === 'frame') {
    const next: any = { type: 'frame', ...out, width: e.width ?? 0, height: e.height ?? 0 }
    if (e.cornerRadius) next.cornerRadius = e.cornerRadius
    if (e.frameMaskDisabled !== undefined) next.frameMaskDisabled = e.frameMaskDisabled
    if (Array.isArray(node.children) && node.children.length) next.children = node.children.map(convertV1Node).filter(Boolean)
    return next
  }

  if (type === 'group') {
    const next: any = { type: 'group', ...out }
    if (Array.isArray(node.children) && node.children.length) next.children = node.children.map(convertV1Node).filter(Boolean)
    return next
  }

  if (type === 'rectangle') {
    const next: any = { type: 'rectangle', ...out, width: e.width ?? 0, height: e.height ?? 0 }
    if (e.cornerRadius) next.cornerRadius = e.cornerRadius
    return next
  }

  if (type === 'ellipse') return { type: 'ellipse', ...out, width: e.width ?? 0, height: e.height ?? 0 }
  if (type === 'line') return { type: 'line', ...out, width: e.width ?? 0, height: e.height ?? 0 }

  if (type === 'path') {
    const next: any = { type: 'path', ...out, width: e.width ?? 0, height: e.height ?? 0 }
    if (e.pathData) next.geometry = e.pathData
    return next
  }

  if (type === 'text') {
    const next: any = { type: 'text', ...out }
    if (e.textContent) next.content = e.textContent
    if (e.fontFamily) next.fontFamily = e.fontFamily
    if (e.fontSize) next.fontSize = e.fontSize
    if (e.fontWeight) next.fontWeight = String(e.fontWeight)
    if (e.fontStyle && e.fontStyle !== 'normal') next.fontStyle = e.fontStyle
    if (e.letterSpacing) next.letterSpacing = e.letterSpacing
    if (e.textGrowth) next.textGrowth = e.textGrowth
    if (e.lineHeight) next.lineHeight = e.lineHeight
    if (e.textAlign) next.textAlign = e.textAlign
    switch (e.textAlignVertical) {
      case 'top':
        next.textAlignVertical = 'top'
        break
      case 'center':
      case 'middle':
        next.textAlignVertical = 'middle'
        break
      case 'bottom':
        next.textAlignVertical = 'bottom'
        break
    }
    switch (e.textGrowth) {
      case 'auto':
        break
      case 'fixed-width':
        next.width = e.width ?? 0
        break
      case 'fixed-width-height':
        next.width = e.width ?? 0
        next.height = e.height ?? 0
        break
    }
    return next
  }

  if (type === 'sticky_note') {
    const next: any = { type: 'note', ...out, width: e.width ?? 0, height: e.height ?? 0 }
    if (e.textContent) next.textContent = e.textContent
    return next
  }

  if (type === 'ref') {
    const next: any = { type: 'ref', ...out }
    if (e.overrides) next.overrides = e.overrides
    if (Array.isArray(node.children) && node.children.length) next.children = node.children.map(convertV1Node).filter(Boolean)
    return next
  }

  return null
}

export function upgrade_1_0_to_2_0(doc: any) {
  const out: any[] = []
  if (Array.isArray(doc.children)) {
    for (const child of doc.children) {
      const converted = convertV1Node(child)
      if (converted) out.push(converted)
    }
  }
  if (Array.isArray(doc.connections)) {
    for (const c of doc.connections) {
      out.push({
        type: 'connection',
        id: c.id || uuidV4(),
        x: 0,
        y: 0,
        source: { path: c.sourceNodeId, anchor: c.sourceAnchor },
        target: { path: c.targetNodeId, anchor: c.targetAnchor }
      })
    }
  }
  return { version: '2.0', children: out }
}

export function upgrade_2_0_to_2_1(doc: any) {
  const e = structuredClone(doc)
  const walk = (r: any) => {
    if (typeof r !== 'object' || r == null) return
    if ('frameMaskDisabled' in r) {
      ;(r as any).clip = !(r as any).frameMaskDisabled
      delete (r as any).frameMaskDisabled
    }
    if ('disabled' in r) {
      ;(r as any).enabled = !(r as any).disabled
      delete (r as any).disabled
    }
    for (const v of Object.values(r)) walk(v)
  }
  walk(e)
  e.version = '2.1'
  return e
}

export function upgrade_2_1_to_2_2(doc: any) {
  const e = structuredClone(doc)
  const walk = (r: any) => {
    if (typeof r !== 'object' || r == null) return
    if (Array.isArray(r)) return r.forEach(walk)
    if ('type' in r && r.type === 'ref' && 'overrides' in r) {
      const overrides = r.overrides
      delete r.overrides
      for (const o of overrides) {
        if (!('property' in o) || typeof o.property !== 'string' || !('value' in o)) continue
        let target = r
        if ('path' in o) {
          if (typeof o.path !== 'string') continue
          r.descendants ||= {}
          r.descendants[o.path] ||= {}
          target = r.descendants[o.path]
        }
        target[o.property] = o.value
      }
      return
    }
    for (const v of Object.values(r)) walk(v)
  }
  walk(e)
  e.version = '2.2'
  return e
}

export function upgrade_2_2_to_2_3(doc: any) {
  const e = structuredClone(doc)
  const walk = (r: any) => {
    if (r?.type === 'image') {
      r.type = 'rectangle'
      delete r.imageUrl
      r.fill = { type: 'image', url: r.url, mode: 'fill' }
    }
    if (Array.isArray(r?.children)) for (const c of r.children) walk(c)
  }
  if (Array.isArray(e.children)) for (const c of e.children) walk(c)
  e.version = '2.3'
  return e
}

export function upgrade_2_3_to_2_4(doc: any) {
  const e = structuredClone(doc)
  const walk = (r: any) => {
    const layout = r.layout
    delete r.layout
    if (r.type === 'frame' || r.type === 'group') {
      if (layout) {
        r.layout = layout.mode ?? 'none'
        r.gap = layout.spacing
        r.layoutIncludeStroke = layout.includeStroke
        r.padding = layout.padding
        r.justifyContent = layout.justify
        r.alignItems = layout.align
      } else {
        r.layout = 'none'
      }
    }
    if (r.type === 'frame') {
      if (r.width == null) r.width = 0
      if (r.height == null) r.height = 0
      if (r.clip == null) r.clip = true
    }
    if (Array.isArray(r.children)) for (const c of r.children) walk(c)
  }
  if (Array.isArray(e.children)) for (const c of e.children) walk(c)
  e.version = '2.4'
  return e
}

export function upgrade_2_4_to_2_5(doc: any) {
  const e = structuredClone(doc)
  const walk = (r: any) => {
    if (r.type === 'text' && r.size != null) {
      if (r.size.width != null) r.width = r.size.width
      if (r.size.height != null) r.height = r.size.height
      delete r.size
    }
    if (Array.isArray(r.children)) for (const c of r.children) walk(c)
  }
  if (Array.isArray(e.children)) for (const c of e.children) walk(c)
  e.version = '2.5'
  return e
}

export function upgrade_2_5_to_2_6(doc: any) {
  const e = structuredClone(doc)
  const adjustGradient = (o: any) => {
    if (o.type !== 'gradient') return
    const w = o.size?.width ?? 1
    const h = o.size?.height ?? 1
    const cx = o.center?.x ?? 0.5
    const cy = o.center?.y ?? 0.5
    if (o.size == null) o.size = {}
    o.size.width = h
    o.size.height = o.gradientType === 'linear' && typeof w === 'number' ? w / 2 : w
    if (o.gradientType === 'linear' && typeof o.rotation === 'number' && typeof o.size.height === 'number') {
      const rad = degToRad(o.rotation * -1)
      const b = o.size.height / 2
      o.center = { x: cx + Math.sin(rad) * b, y: cy - Math.cos(rad) * b }
    }
  }
  const walkFill = (o: any) => {
    if (Array.isArray(o)) for (const s of o) adjustGradient(s)
    else if (typeof o === 'object' && o) adjustGradient(o)
  }
  const walk = (o: any) => {
    if (o.fill) walkFill(o.fill)
    if (o.stroke?.fill) walkFill(o.stroke.fill)
    if (Array.isArray(o.children)) for (const c of o.children) walk(c)
    if (o.descendants) for (const d of Object.values(o.descendants)) walk(d)
  }
  if (Array.isArray(e.children)) for (const c of e.children) walk(c)
  e.version = '2.6'
  return e
}

export function upgrade_2_6_to_2_7(doc: any) {
  const e = structuredClone(doc)
  const walk = (r: any) => {
    if ((r.type === 'ellipse' || r.type === 'ref') && typeof r.sweepAngle === 'number') r.sweepAngle = -r.sweepAngle
    if (Array.isArray(r.children)) for (const c of r.children) walk(c)
    if (r.descendants) for (const d of Object.values(r.descendants)) walk(d)
  }
  if (Array.isArray(e.children)) for (const c of e.children) walk(c)
  e.version = '2.7'
  return e
}

export function upgrade_2_7_to_2_8(doc: any) {
  const e = structuredClone(doc)
  e.version = '2.8'
  return e
}

export function upgrade_2_8_to_2_9(doc: any) {
  const e = structuredClone(doc)
  e.version = '2.9'
  return e
}

export function upgrade_2_9_to_2_10(doc: any) {
  const e = structuredClone(doc)
  e.version = '2.10'
  if ('imports' in e && typeof e.imports === 'object' && e.imports) {
    e.imports = Object.fromEntries(
      Object.entries(e.imports).map(([k, v]) => {
        if (typeof v === 'string' && !v.startsWith('pencil:')) {
          const encoded = v
            .split('/')
            .map(seg => encodeURIComponent(seg))
            .join('/')
          return [k, encoded]
        }
        return [k, v]
      })
    )
  }
  return e
}

export function upgradeDocumentAny(doc: any) {
  let t = doc
  if (t?.version === '1.0') t = upgrade_1_0_to_2_0(t)
  if (t?.version === '2.0') t = upgrade_2_0_to_2_1(t)
  if (t?.version === '2.1') t = upgrade_2_1_to_2_2(t)
  if (t?.version === '2.2') t = upgrade_2_2_to_2_3(t)
  if (t?.version === '2.3') t = upgrade_2_3_to_2_4(t)
  if (t?.version === '2.4') t = upgrade_2_4_to_2_5(t)
  if (t?.version === '2.5') t = upgrade_2_5_to_2_6(t)
  if (t?.version === '2.6') t = upgrade_2_6_to_2_7(t)
  if (t?.version === '2.7') t = upgrade_2_7_to_2_8(t)
  if (t?.version === '2.8') t = upgrade_2_8_to_2_9(t)
  if (t?.version === '2.9') t = upgrade_2_9_to_2_10(t)
  return t
}

