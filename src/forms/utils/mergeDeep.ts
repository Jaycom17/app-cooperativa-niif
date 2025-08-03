export function mergeDeepPreservingOrder(base: any, source: any): any {
  if (Array.isArray(base)) {
    return base.map((item, index) =>
      mergeDeepPreservingOrder(item, source?.[index])
    );
  } else if (base !== null && typeof base === "object") {
    const result: Record<string, any> = {};
    for (const key of Object.keys(base)) {
      result[key] = mergeDeepPreservingOrder(base[key], source?.[key]);
    }
    return result;
  } else {
    return source !== undefined ? source : base;
  }
}