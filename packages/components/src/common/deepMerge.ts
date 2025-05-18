import deepmerge from 'deepmerge'

/**
 * Custom implementation to skip out marked properties from deep merging
 */
function isPlainObject(item: unknown): item is Record<string, any> {
  return (
    item !== null &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    // Advance handing
    // Skip React elements which have type popery
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    !(typeof (item as any).type === 'function') &&
    !(item instanceof Date) &&
    !(item instanceof RegExp) &&
    !(item instanceof Map) &&
    !(item instanceof Set)
  )
}

export function safeDeepMerge<T>(target: any, source: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return deepmerge<T>(target, source, {
    isMergeableObject: isPlainObject,
  })
}
