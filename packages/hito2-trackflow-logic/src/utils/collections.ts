// =============================================================================
// TrackFlow — Funciones de filtrado y ordenamiento sobre colecciones
// Hito 2: Fundamentos de Programación
// =============================================================================
//
// Principios:
// - Funciones PURAS: no mutan los arrays originales, devuelven nuevos arrays
// - Programación funcional: .filter(), .sort(), .map(), .reduce()
// - Tipado estricto (sin any)
//
// =============================================================================

import {
  type Product,
  type Carrier,
  type ProductCategory,
  type WarehouseLocation,
} from "../types/models";

// ---------------------------------------------------------------------------
// filterProductsByWarehouse
// ---------------------------------------------------------------------------

/**
 * Filtra productos que pertenecen a un almacén específico.
 *
 * @param products - Array de productos (no se muta)
 * @param warehouse - Almacén por el que filtrar
 * @returns Nuevo array con solo los productos de ese almacén
 *
 * Complejidad temporal: O(n)
 */
export function filterProductsByWarehouse(
  products: Product[],
  warehouse: WarehouseLocation
): Product[] {
  return products.filter((product) => product.warehouse === warehouse);
}

// ---------------------------------------------------------------------------
// filterProductsByCategory
// ---------------------------------------------------------------------------

/**
 * Filtra productos pertenecientes a una categoría dada.
 *
 * @param products - Array de productos (no se muta)
 * @param category - Categoría deseada
 * @returns Nuevo array con productos de esa categoría
 *
 * Complejidad temporal: O(n)
 */
export function filterProductsByCategory(
  products: Product[],
  category: ProductCategory
): Product[] {
  return products.filter((product) => product.category === category);
}

// ---------------------------------------------------------------------------
// filterLowStockProducts
// ---------------------------------------------------------------------------

/**
 * Filtra productos cuyo stock está en o por debajo del umbral mínimo.
 * Es decir, aquellos donde `stockQuantity <= minStockThreshold`.
 *
 * @param products - Array de productos (no se muta)
 * @returns Nuevo array con productos en o por debajo del umbral
 *
 * Complejidad temporal: O(n)
 */
export function filterLowStockProducts(products: Product[]): Product[] {
  return products.filter(
    (product) => product.stockQuantity <= product.minStockThreshold
  );
}

// ---------------------------------------------------------------------------
// sortProductsByStock
// ---------------------------------------------------------------------------

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
export function sortProductsByStock(
  products: Product[],
  order: "asc" | "desc"
): Product[] {
  return [...products].sort((a, b) => {
    const diff = a.stockQuantity - b.stockQuantity;
    return order === "asc" ? diff : -diff;
  });
}

// ---------------------------------------------------------------------------
// sortCarriersByReliability
// ---------------------------------------------------------------------------

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
export function sortCarriersByReliability(
  carriers: Carrier[],
  order: "asc" | "desc"
): Carrier[] {
  return [...carriers].sort((a, b) => {
    const diff = a.onTimeRate - b.onTimeRate;
    const reliabilityDiff = order === "asc" ? diff : -diff;

    if (reliabilityDiff !== 0) {
      return reliabilityDiff;
    }

    // Desempate alfabético por nombre
    return a.name.localeCompare(b.name);
  });
}