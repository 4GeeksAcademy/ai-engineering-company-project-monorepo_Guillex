// =============================================================================
// TrackFlow — Modelos de dominio
// Hito 2: Fundamentos de Programación
// =============================================================================
// Este archivo define TODAS las interfaces y tipos del sistema de gestión
// de almacenes y transportistas de TrackFlow.
// =============================================================================
// ---------------------------------------------------------------------------
// Guardias de tipo (type guards)
// ---------------------------------------------------------------------------
/**
 * Comprueba si un valor es un WarehouseLocation válido.
 */
export function isWarehouseLocation(value) {
    return value === "Los Angeles" || value === "Zaragoza";
}
/**
 * Comprueba si un valor es un ProductCategory válido.
 */
export function isProductCategory(value) {
    const valid = ["Fashion", "Electronics", "Cosmetics", "Home", "Other"];
    return valid.includes(value);
}
/**
 * Comprueba si un valor es un ProductStatus válido.
 */
export function isProductStatus(value) {
    const valid = ["Active", "Low stock", "Out of stock", "Discontinued"];
    return valid.includes(value);
}
/**
 * Comprueba si un valor es un ShipmentPriority válido.
 */
export function isShipmentPriority(value) {
    const valid = ["Standard", "Express", "Same-day"];
    return valid.includes(value);
}
/**
 * Comprueba si un valor es un ShipmentStatus válido.
 */
export function isShipmentStatus(value) {
    const valid = ["Pending", "Assigned", "In transit", "Delivered", "Failed"];
    return valid.includes(value);
}
/**
 * Comprueba si un valor es una Country válida.
 */
export function isCountry(value) {
    const valid = ["United States", "Spain"];
    return valid.includes(value);
}
/**
 * Comprueba si un valor es un MovementType válido.
 */
export function isMovementType(value) {
    const valid = ["Inbound", "Outbound", "Transfer", "Adjustment"];
    return valid.includes(value);
}
//# sourceMappingURL=models.js.map