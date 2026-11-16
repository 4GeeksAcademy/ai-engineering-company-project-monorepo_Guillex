// =============================================================================
// TrackFlow — Validaciones de reglas de negocio
// Hito 2: Fundamentos de Programación
// =============================================================================
//
// Principios:
// - Funciones PURAS: reciben datos, devuelven ValidationResult
// - No mutan los objetos originales
// - Cada validación cubre TODAS las reglas especificadas en el briefing
//
// =============================================================================

import {
  type Product,
  type Shipment,
  type Carrier,
  type ValidationResult,
} from "../types/models";

// ---------------------------------------------------------------------------
// validateProduct
// ---------------------------------------------------------------------------

/**
 * Valida un producto según las reglas de negocio de TrackFlow.
 *
 * @param product - Producto a validar
 * @returns ValidationResult con el resultado de la validación
 */
export function validateProduct(product: Product): ValidationResult {
  const errors: string[] = [];

  if (!product.sku || product.sku.trim() === "") {
    errors.push("SKU is required and must not be empty");
  }

  if (product.weightKg <= 0 || product.weightKg > 100) {
    errors.push("weightKg must be greater than 0 and less than or equal to 100");
  }

  if (product.dimensions.lengthCm <= 0 || product.dimensions.lengthCm > 200) {
    errors.push("lengthCm must be greater than 0 and less than or equal to 200");
  }
  if (product.dimensions.widthCm <= 0 || product.dimensions.widthCm > 200) {
    errors.push("widthCm must be greater than 0 and less than or equal to 200");
  }
  if (product.dimensions.heightCm <= 0 || product.dimensions.heightCm > 200) {
    errors.push("heightCm must be greater than 0 and less than or equal to 200");
  }

  if (product.stockQuantity < 0) {
    errors.push("stockQuantity must be greater than or equal to 0");
  }

  if (product.minStockThreshold < 0) {
    errors.push("minStockThreshold must be greater than or equal to 0");
  }

  if (product.unitCostUSD <= 0) {
    errors.push("unitCostUSD must be greater than 0");
  }

  return { valid: errors.length === 0, errors };
}

// ---------------------------------------------------------------------------
// validateShipment
// ---------------------------------------------------------------------------

/**
 * Valida un envío según las reglas de negocio de TrackFlow.
 *
 * @param shipment - Envío a validar
 * @returns ValidationResult con el resultado de la validación
 */
export function validateShipment(shipment: Shipment): ValidationResult {
  const errors: string[] = [];

  if (shipment.quantity <= 0) {
    errors.push("quantity must be greater than 0");
  }

  if (shipment.declaredValueUSD <= 0) {
    errors.push("declaredValueUSD must be greater than 0");
  }

  if (shipment.destination.distanceKm < 0) {
    errors.push("distanceKm must be greater than or equal to 0");
  }

  return { valid: errors.length === 0, errors };
}

// ---------------------------------------------------------------------------
// validateCarrier
// ---------------------------------------------------------------------------

/**
 * Valida un transportista según las reglas de negocio de TrackFlow.
 *
 * @param carrier - Transportista a validar
 * @returns ValidationResult con el resultado de la validación
 */
export function validateCarrier(carrier: Carrier): ValidationResult {
  const errors: string[] = [];

  if (carrier.baseRateUSD < 0) {
    errors.push("baseRateUSD must be greater than or equal to 0");
  }
  if (carrier.ratePerKgUSD < 0) {
    errors.push("ratePerKgUSD must be greater than or equal to 0");
  }
  if (carrier.ratePerKmUSD < 0) {
    errors.push("ratePerKmUSD must be greater than or equal to 0");
  }

  if (carrier.avgDeliveryDays <= 0) {
    errors.push("avgDeliveryDays must be greater than 0");
  }

  if (!carrier.operatesIn || carrier.operatesIn.length === 0) {
    errors.push("operatesIn must contain at least one country");
  }

  if (carrier.onTimeRate < 0 || carrier.onTimeRate > 100) {
    errors.push("onTimeRate must be between 0 and 100");
  }

  if (carrier.maxWeightKg <= 0) {
    errors.push("maxWeightKg must be greater than 0");
  }

  return { valid: errors.length === 0, errors };
}