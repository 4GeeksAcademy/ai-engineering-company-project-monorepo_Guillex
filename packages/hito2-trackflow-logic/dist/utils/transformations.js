// =============================================================================
// TrackFlow — Transformaciones, scoring, costos y agregaciones
// Hito 2: Fundamentos de Programación
// =============================================================================
//
// Principios:
// - Funciones PURAS: no mutan los arrays originales
// - Programación funcional: .map(), .filter(), .reduce(), .sort()
// - Tipado estricto (sin any)
//
// =============================================================================
// ---------------------------------------------------------------------------
// calculateShippingCost
// ---------------------------------------------------------------------------
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
export function calculateShippingCost(shipment, product, carrier) {
    const baseCost = carrier.baseRateUSD;
    const weightCost = product.weightKg * carrier.ratePerKgUSD * shipment.quantity;
    const distanceCost = shipment.destination.distanceKm * carrier.ratePerKmUSD;
    const subtotal = baseCost + weightCost + distanceCost;
    const surchargeMultiplier = getPrioritySurcharge(shipment.priority);
    const total = subtotal * surchargeMultiplier;
    return Math.round(total * 100) / 100;
}
/**
 * Devuelve el multiplicador de recargo según la prioridad.
 *
 * Standard  → 1.00 (sin recargo)
 * Express   → 1.30 (+30%)
 * Same-day  → 1.60 (+60%)
 */
function getPrioritySurcharge(priority) {
    switch (priority) {
        case "Standard":
            return 1.0;
        case "Express":
            return 1.3;
        case "Same-day":
            return 1.6;
        default:
            return 1.0;
    }
}
// ---------------------------------------------------------------------------
// scoreCarrierForShipment
// ---------------------------------------------------------------------------
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
export function scoreCarrierForShipment(carrier, shipment, product) {
    let score = 0;
    const destinationCountry = shipment.destination.country;
    if (carrier.operatesIn.includes(destinationCountry)) {
        score += 20;
    }
    const totalWeight = product.weightKg * shipment.quantity;
    if (totalWeight <= carrier.maxWeightKg) {
        score += 20;
    }
    if (carrier.acceptsPriority.includes(shipment.priority)) {
        score += 15;
    }
    if (!product.isFragile) {
        score += 15;
    }
    else if (carrier.handlesFragile) {
        score += 15;
    }
    const reliabilityScore = carrier.onTimeRate * 0.3;
    score += Math.min(reliabilityScore, 30);
    return Math.round(score * 100) / 100;
}
// ---------------------------------------------------------------------------
// selectBestCarrier
// ---------------------------------------------------------------------------
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
export function selectBestCarrier(carriers, shipment, product) {
    const scoredCarriers = carriers
        .map((carrier) => ({
        carrier,
        score: scoreCarrierForShipment(carrier, shipment, product),
        cost: calculateShippingCost(shipment, product, carrier),
    }))
        .filter((entry) => entry.score >= 50);
    if (scoredCarriers.length === 0) {
        return null;
    }
    const best = scoredCarriers.reduce((bestCarrier, current) => current.cost < bestCarrier.cost ? current : bestCarrier);
    return {
        carrier: best.carrier,
        score: best.score,
        cost: best.cost,
    };
}
// ---------------------------------------------------------------------------
// countProductsByCategory
// ---------------------------------------------------------------------------
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
export function countProductsByCategory(products) {
    const initialCount = {
        Fashion: 0,
        Electronics: 0,
        Cosmetics: 0,
        Home: 0,
        Other: 0,
    };
    return products.reduce((acc, product) => {
        acc[product.category]++;
        return acc;
    }, initialCount);
}
// ---------------------------------------------------------------------------
// calculateTotalInventoryValue
// ---------------------------------------------------------------------------
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
export function calculateTotalInventoryValue(products) {
    const total = products.reduce((acc, product) => acc + product.unitCostUSD * product.stockQuantity, 0);
    return Math.round(total * 100) / 100;
}
// ---------------------------------------------------------------------------
// calculateAverageShipmentDistance
// ---------------------------------------------------------------------------
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
export function calculateAverageShipmentDistance(shipments) {
    if (shipments.length === 0) {
        return 0;
    }
    const totalDistance = shipments.reduce((acc, shipment) => acc + shipment.destination.distanceKm, 0);
    const average = totalDistance / shipments.length;
    return Math.round(average * 100) / 100;
}
// ---------------------------------------------------------------------------
// groupShipmentsByStatus
// ---------------------------------------------------------------------------
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
export function groupShipmentsByStatus(shipments) {
    const groups = {
        Pending: [],
        Assigned: [],
        "In transit": [],
        Delivered: [],
        Failed: [],
    };
    return shipments.reduce((acc, shipment) => {
        acc[shipment.status].push(shipment);
        return acc;
    }, groups);
}
// ---------------------------------------------------------------------------
// findTopCarriers
// ---------------------------------------------------------------------------
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
export function findTopCarriers(shipments, topN = 3) {
    const carrierCounts = shipments.reduce((acc, shipment) => {
        if (shipment.carrier !== null) {
            acc[shipment.carrier] = (acc[shipment.carrier] || 0) + 1;
        }
        return acc;
    }, {});
    return Object.entries(carrierCounts)
        .map(([carrier, count]) => ({ carrier, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, topN);
}
//# sourceMappingURL=transformations.js.map