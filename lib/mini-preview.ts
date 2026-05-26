import { getMiniProduct, getMiniProductVersion, miniDefaultCompareSelection } from "@/src/data";

export const MINI_COMPARE_STORAGE_KEY = "hk-insurance-agent-mini-compare-selection";

export type MiniCompareSelection = {
  productId: string;
  versionId: string;
};

export function getDefaultMiniCompareSelection(): MiniCompareSelection[] {
  return miniDefaultCompareSelection;
}

export function resolveMiniCompareSelection(selection: MiniCompareSelection[]) {
  return selection
    .map((item) => {
      const product = getMiniProduct(item.productId);
      const version = getMiniProductVersion(item.productId, item.versionId);
      if (!product || !version) return null;
      return { product, version };
    })
    .filter(Boolean) as Array<{
      product: NonNullable<ReturnType<typeof getMiniProduct>>;
      version: NonNullable<ReturnType<typeof getMiniProductVersion>>;
    }>;
}
