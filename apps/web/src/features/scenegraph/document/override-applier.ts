import { type DeserializedNodeProperties, type SerializedSceneNodeLike } from './node-properties'
import { deserializeDescendantOverrideToPatch, type DeserializedNodeOverridePatch, type OverrideVariableResolver } from './overrides'

/**
 * 将 overrides 的 patch 应用到节点属性
 * @param base 基础节点属性
 * @param overrides 覆盖属性
 * @param nodeType 节点类型
 * @param resolveVariable 变量解析器
 * @returns 应用覆盖后的节点属性
 */
export function applyOverridesToNode(
  base: DeserializedNodeProperties,
  overrides: Record<string, unknown>,
  nodeType: string,
  resolveVariable?: OverrideVariableResolver
): DeserializedNodeProperties {
  const patch = deserializeDescendantOverrideToPatch(overrides, {
    nodeType,
    resolveVariable
  })
  
  return applyNodeOverridePatch(base, patch)
}

/**
 * 应用节点覆盖补丁
 * @param base 基础节点属性
 * @param patch 覆盖补丁
 * @returns 应用补丁后的节点属性
 */
export function applyNodeOverridePatch(
  base: DeserializedNodeProperties,
  patch: DeserializedNodeOverridePatch
): DeserializedNodeProperties {
  const mergedText = patch.text === undefined
    ? base.text
    : {
        ...(base.text ?? { content: '' }),
        ...patch.text,
        content: patch.text?.content ?? base.text?.content ?? ''
      }

  const mergedLayout = patch.layout === undefined
    ? base.layout
    : {
        ...(base.layout ?? {
          mode: 'none' as const,
          gap: 0,
          justifyContent: 'start' as const,
          alignItems: 'start' as const,
          includeStroke: false
        }),
        ...patch.layout
      }

  const mergedIcon = patch.icon === undefined ? base.icon : { ...(base.icon ?? {}), ...patch.icon }
  const mergedPath = patch.path === undefined ? base.path : { ...(base.path ?? {}), ...patch.path }

  return {
    ...base,
    ...patch,
    width: patch.width ?? base.width,
    height: patch.height ?? base.height,
    text: mergedText,
    layout: mergedLayout,
    icon: mergedIcon,
    path: mergedPath
  }
}

/**
 * 批量应用节点覆盖补丁
 * @param base 基础节点属性
 * @param patches 覆盖补丁数组
 * @returns 应用所有补丁后的节点属性
 */
export function applyNodeOverridePatches(
  base: DeserializedNodeProperties,
  patches: DeserializedNodeOverridePatch[]
): DeserializedNodeProperties {
  let out = base
  for (const patch of patches) {
    out = applyNodeOverridePatch(out, patch)
  }
  return out
}

/**
 * 从 descendants 生成覆盖补丁
 * @param descendants 后代节点覆盖
 * @param getNodeTypeForPath 获取节点类型的函数
 * @param resolveVariable 变量解析器
 * @returns 路径到补丁的映射
 */
export function generateOverridesPatches(
  descendants: Record<string, unknown>,
  getNodeTypeForPath: (path: string) => string,
  resolveVariable?: OverrideVariableResolver
): Record<string, DeserializedNodeOverridePatch> {
  const patches: Record<string, DeserializedNodeOverridePatch> = {}
  
  for (const [path, override] of Object.entries(descendants)) {
    if (!override || typeof override !== 'object' || Array.isArray(override)) {
      continue
    }
    
    patches[path] = deserializeDescendantOverrideToPatch(override as Record<string, unknown>, {
      nodeType: getNodeTypeForPath(path),
      resolveVariable
    })
  }
  
  return patches
}
