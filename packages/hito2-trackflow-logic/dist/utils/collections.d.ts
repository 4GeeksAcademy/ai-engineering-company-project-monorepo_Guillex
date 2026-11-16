import { type Product, type Carrier, type ProductCategory, type WarehouseLocation } from "../types/models";
/**
 * Filtra productos que pertenecen a un almacén específico.
 *
 * @param products - Array de productos (no se muta)
 * @param warehouse - Almacén por el que filtrar
 * @returns Nuevo array con solo los productos de ese almacén
 *
 * Complejidad temporal: O(n)
 */
export declare function filterProductsByWarehouse(products: Product[], warehouse: WarehouseLocation): Product[];
/**
 * Filtra productos pertenecientes a una categoría dada.
 *
 * @param products - Array de productos (no se muta)
 * @param category - Categoría deseada
 * @returns Nuevo array con productos de esa categoría
 *
 * Complejidad temporal: O(n)
 */
export declare function filterProductsByCategory(products: Product[], category: ProductCategory): Product[];
/**
 * Filtra productos cuyo stock está en o por debajo del umbral mínimo.
 * Es decir, aquellos donde `stockQuantity <= minStockThreshold`.
 *
 * @param products - Array de productos (no se muta)
 * @returns Nuevo array con productos en o por debajo del umbral
 *
 * Complejidad temporal: O(n)
 */
export declare function filterLowStockProducts(products: Product[]): Product[];
/**
 * Ordena los productos por nivel de stock.
 * Crea una copia del array original para no mutarlo.
 *
 * @param products - Array de productos (no se muta)
 * @param order - "asc" para ascendente (menor a mayor), "desc" para descendente
 * @returns Nuevo array ordenado por stock
 *
 * Complejidad temporal: O(n log n) — implementación nativa de sort (Timsort)
 */
export declare function sortProductsByStock(products: Product[], order: "asc" | "desc"): Product[];
/**
 * Ordena transportistas por fiabilidad (tasa de entrega a tiempo).
 * En caso de empate, ordena alfabéticamente por nombre.
 *
 * @param carriers - Array de transportistas (no se muta)
 * @param order - "asc" para ascendente, "desc" para descendente
 * @returns Nuevo array ordenado por fiabilidad
 *
 * Complejidad temporal: O(n log n)
 */
export declare function sortCarriersByReliability(carriers: Carrier[], order: "asc" | "desc"): Carrier[];
//# sourceMappingURL=collections.d.ts.map