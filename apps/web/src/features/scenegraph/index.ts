export async function loadScenegraphModule() {
  return (await import('../../restored/unbundled-safe/app/chunk-009.js')) as any
}

export { uuidV4 } from './document/uuid'
export {
  upgradeDocumentAny,
  upgrade_1_0_to_2_0,
  upgrade_2_0_to_2_1,
  upgrade_2_1_to_2_2,
  upgrade_2_2_to_2_3,
  upgrade_2_3_to_2_4,
  upgrade_2_4_to_2_5,
  upgrade_2_5_to_2_6,
  upgrade_2_6_to_2_7,
  upgrade_2_7_to_2_8,
  upgrade_2_8_to_2_9,
  upgrade_2_9_to_2_10
} from './document/upgrade'

export {
  NODE_PROPERTY_KEYS,
  NODE_TYPES,
  OVERRIDDEN_PROPERTY_TO_SERIALIZED_KEY,
  getSerializedOverrideKeyForProperty,
  isNodePropertyKey,
  isNodeType
} from './document/schema'

export {
  degreesToRadians,
  deserializeRotationDegreesToRadians,
  formatSizingBehavior,
  isSerializedEffect,
  isSerializedEffectItem,
  isSerializedFill,
  isSerializedFillItem,
  isSerializedScalar,
  isSerializedStroke,
  normalizeToArray,
  parseSizingBehaviorString,
  parseSizingValue,
  radiansToDegrees,
  serializeRotationRadiansToDegrees,
  serializeSizingValue
} from './document/value'

export { collectSerializedOverrideKeysFromPropertyKeys, deserializeNodeProperties, deserializeSizing } from './document/node-properties'

export {
  applyNodeOverridePatch,
  applyNodeOverridePatches,
  deserializeDescendantOverrideToPatch,
  deserializeDescendantsOverridesToPatches
} from './document/overrides'
