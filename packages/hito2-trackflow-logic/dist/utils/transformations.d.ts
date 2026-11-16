import { type Product, type Carrier, type Shipment, type ShipmentStatus, type ProductCategory, type CarrierSelectionResult } from "../types/models";
/**
 * Calcula el costo total de un envío con un transportista dado.
 *
 * Fórmula:
 *   costoTotal = baseRate + (peso × ratePerKg × cantidad) + (distancia × ratePerKm)
 *
 * Recargos por prioridad:
 *   Standard  → +0%
 *   Express   → +30%
 *   Same-day  → +60%
 *
 * @param shipment - Envío (contiene cantidad, destino, prioridad)
 * @param product - Producto (contiene peso)
 * @param carrier - Transportista (contiene tarifas)
 * @returns Costo total calculado en USD
 *
 * Algoritmo:
 * 1. Calcular costo base + costos variables
 * 2. Aplicar recargo según prioridad
 * 3. Redondear a 2 decimales
 */
export declare function calculateShippingCost(shipment: Shipment, product: Product, carrier: Carrier): number;
/**
 * Puntúa la idoneidad de un transportista para un envío específico.
 * La puntuación va de 0 a 100 y considera múltiples factores.
 *
 * Criterios de puntuación:
 *   - País de destino:      +20 si el transportista opera en ese país
 *   - Peso del paquete:     +20 si peso × cantidad <= maxWeightKg
 *   - Prioridad:            +15 si soporta la prioridad del envío
 *   - Frágiles:             +15 si el producto NO es frágil, o si es frágil
 *                            y el carrier lo maneja; 0 si es frágil y no lo maneja
 *   - Fiabilidad:           onTimeRate × 0.3 (máximo 30 puntos)
 *
 * @param carrier - Transportista a evaluar
 * @param shipment - Envío (contiene destino, prioridad, cantidad)
 * @param product - Producto (contiene peso, isFragile)
 * @returns Puntuación del transportista (0-100)
 */
export declare function scoreCarrierForShipment(carrier: Carrier, shipment: Shipment, product: Product): number;
/**
 * Selecciona el mejor transportista para un envío basándose en:
 * 1. Puntuación mínima de 50 (se descartan carriers con score < 50)
 * 2. Coste más bajo entre los que pasan el filtro
 *
 * @param carriers - Array de transportistas candidatos
 * @param shipment - Envío
 * @param product - Producto a enviar
 * @returns El transportista seleccionado y sus métricas, o null si ninguno
 *          cumple los requisitos
 *
 * Algoritmo:
 * 1. Para cada carrier, calcular su score con scoreCarrierForShipment
 * 2. Filtrar carriers con score >= 50
 * 3. Para los que pasan, calcular el costo con calculateShippingCost
 * 4. Seleccionar el de menor costo total
 * 5. Retornar el resultado con carrier, score y costo
 */
export declare function selectBestCarrier(carriers: Carrier[], shipment: Shipment, product: Product): CarrierSelectionResult | null;
/**
 * Cuenta cuántos productos hay en cada categoría.
 *
 * @param products - Array de productos
 * @returns Objeto con la cuenta por categoría
 *
 * Algoritmo:
 * 1. Usar reduce para iterar sobre todos los productos
 * 2. Para cada producto, incrementar el contador de su categoría
 * 3. Retornar el objeto acumulador
 */
export declare function countProductsByCategory(products: Product[]): Record<ProductCategory, number>;
/**
 * Calcula el valor total del inventario sumando unitCostUSD × stockQuantity
 * de cada producto.
 *
 * @param products - Array de productos (no se muta)
 * @returns Valor total del inventario en USD
 *
 * Algoritmo:
 * 1. Usar reduce para sumar unitCostUSD × stockQuantity de cada producto
 * 2. Redondear a 2 decimales
 */
export declare function calculateTotalInventoryValue(products: Product[]): number;
/**
 * Calcula la distancia media de los envíos.
 *
 * @param shipments - Array de envíos
 * @returns Distancia media en km (0 si no hay envíos)
 *
 * Algoritmo:
 * 1. Sumar todas las distancias con reduce
 * 2. Dividir por la longitud del array
 * 3. Redondear a 2 decimales
 * 4. Si el array está vacío, devolver 0
 */
export declare function calculateAverageShipmentDistance(shipments: Shipment[]): number;
/**
 * Agrupa los envíos según su estado.
 *
 * @param shipments - Array de envíos (no se muta)
 * @returns Objeto con arrays de envíos agrupados por cada ShipmentStatus
 *
 * Algoritmo:
 * 1. Inicializar objeto con todos los estados como arrays vacíos
 * 2. Usar reduce para colocar cada envío en su grupo correspondiente
 * 3. Retornar el objeto agrupado
 */
export declare function groupShipmentsByStatus(shipments: Shipment[]): Record<ShipmentStatus, Shipment[]>;
/**
 * Encuentra los N transportistas más usados basado en envíos asignados.
 * Ignora envíos con transportista null.
 *
 * @param shipments - Array de envíos (no se muta)
 * @param topN - Número de transportistas a devolver (por defecto 3)
 * @returns Array con nombre del transportista y conteo de envíos,
 *          ordenados por conteo descendente
 *
 * Algoritmo:
 * 1. Filtrar envíos que tienen transportista asignado (no null)
 * 2. Contar ocurrencias de cada transportista con reduce
 * 3. Convertir el objeto de conteo a array de {carrier, count}
 * 4. Ordenar por count descendente
 * 5. Tomar los primeros topN
 */
export declare function findTopCarriers(shipments: Shipment[], topN?: number): Array<{
    carrier: string;
    count: number;
}>;
//# sourceMappingURL=transformations.d.ts.map