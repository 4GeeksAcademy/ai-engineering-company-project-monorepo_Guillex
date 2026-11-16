// =============================================================================
// TrackFlow — Funciones de búsqueda
// Hito 2: Fundamentos de Programación
// =============================================================================
//
// Principios:
// - Funciones PURAS: no mutan los arrays originales
// - Algoritmos documentados con complejidad temporal
// - Tipado estricto (sin any)
//
// =============================================================================

import { type Product, type Shipment } from "../types/models";

// ---------------------------------------------------------------------------
// findProductBySKU (búsqueda lineal)
// ---------------------------------------------------------------------------

/**
 * Busca un producto por su SKU (case-insensitive).
 *
 * @param products - Array de productos (no se muta)
 * @param sku - SKU a buscar (sin distinción mayúsculas/minúsculas)
 * @returns El producto si se encuentra, null en caso contrario
 *
 * Algoritmo (búsqueda lineal):
 * 1. Recorrer el array de productos desde el índice 0
 * 2. En cada iteración, comparar el SKU en minúsculas con el buscado
 * 3. Si coincide, devolver el producto inmediatamente
 * 4. Si se termina el array sin encontrar, devolver null
 *
 * Complejidad temporal:
 * - Mejor caso: O(1) — el producto está al inicio
 * - Peor caso: O(n) — el producto está al final o no existe
 * - Caso promedio: O(n)
 *
 * ¿Por qué búsqueda lineal y no binaria?
 * - Los SKU son identificadores que pueden estar en cualquier orden
 * - La búsqueda lineal no requiere que el array esté ordenado
 */
export function findProductBySKU(
  products: Product[],
  sku: string
): Product | null {
  const skuLower = sku.toLowerCase();

  for (let i = 0; i < products.length; i++) {
    if (products[i].sku.toLowerCase() === skuLower) {
      return products[i];
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// findShipmentById (búsqueda lineal)
// ---------------------------------------------------------------------------

/**
 * Busca un envío por su ID único.
 *
 * @param shipments - Array de envíos (no se muta)
 * @param id - ID a buscar
 * @returns El envío si se encuentra, null en caso contrario
 *
 * Algoritmo (búsqueda lineal):
 * 1. Recorrer el array de envíos
 * 2. En cada iteración, comparar el ID
 * 3. Si coincide, devolver el envío inmediatamente
 * 4. Si se termina el array sin encontrar, devolver null
 *
 * Complejidad temporal: O(n)
 */
export function findShipmentById(
  shipments: Shipment[],
  id: string
): Shipment | null {
  for (let i = 0; i < shipments.length; i++) {
    if (shipments[i].id === id) {
      return shipments[i];
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// binarySearchProductByWeight (búsqueda binaria)
// ---------------------------------------------------------------------------

/**
 * Busca un producto por peso exacto usando búsqueda binaria.
 * Retorna el índice del producto en el array.
 *
 * IMPORTANTE: El array DEBE estar ordenado por weightKg ascendente
 * para que el algoritmo funcione correctamente.
 *
 * @param sortedProducts - Array de productos ordenado por weightKg ascendente
 * @param targetWeightKg - Peso exacto a buscar
 * @returns El índice del producto si se encuentra, -1 en caso contrario
 *
 * Algoritmo (búsqueda binaria):
 * 1. Establecer límites: left = 0, right = longitud - 1
 * 2. Mientras left <= right:
 *    a. Calcular el punto medio: mid = (left + right) // 2
 *    b. Si el peso en mid es el buscado, devolver mid
 *    c. Si el peso en mid es menor que el target, buscar en la mitad derecha
 *       (left = mid + 1)
 *    d. Si el peso en mid es mayor que el target, buscar en la mitad izquierda
 *       (right = mid - 1)
 * 3. Si se sale del bucle, el peso no existe → -1
 *
 * Complejidad temporal: O(log n)
 * - En cada paso, el espacio de búsqueda se reduce a la mitad
 * - Con 10 productos: máximo ~4 comparaciones
 * - Con 1000 productos: máximo ~10 comparaciones
 *
 * Ejemplo visual con pesos [1.5, 2.0, 3.2, 4.8, 5.1] buscando 3.2:
 *
 *   left=0  mid=2(3.2)  right=4
 *   ┌──────┬──────┬──────┬──────┬──────┐
 *   │ 1.5  │ 2.0  │ 3.2  │ 4.8  │ 5.1  │
 *   └──────┴──────┴──────┴──────┴──────┘
 *                     ↑
 *                 ¡Encontrado! → retorna 2
 */
export function binarySearchProductByWeight(
  sortedProducts: Product[],
  targetWeightKg: number
): number {
  let left = 0;
  let right = sortedProducts.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    const midWeight = sortedProducts[mid].weightKg;

    if (midWeight === targetWeightKg) {
      return mid;
    }

    if (midWeight < targetWeightKg) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}