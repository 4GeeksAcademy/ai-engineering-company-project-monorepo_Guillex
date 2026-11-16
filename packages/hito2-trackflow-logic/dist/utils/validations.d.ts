import { type Product, type Shipment, type Carrier, type ValidationResult } from "../types/models";
/**
 * Valida un producto según las reglas de negocio de TrackFlow.
 *
 * @param product - Producto a validar
 * @returns ValidationResult con el resultado de la validación
 */
export declare function validateProduct(product: Product): ValidationResult;
/**
 * Valida un envío según las reglas de negocio de TrackFlow.
 *
 * @param shipment - Envío a validar
 * @returns ValidationResult con el resultado de la validación
 */
export declare function validateShipment(shipment: Shipment): ValidationResult;
/**
 * Valida un transportista según las reglas de negocio de TrackFlow.
 *
 * @param carrier - Transportista a validar
 * @returns ValidationResult con el resultado de la validación
 */
export declare function validateCarrier(carrier: Carrier): ValidationResult;
//# sourceMappingURL=validations.d.ts.map