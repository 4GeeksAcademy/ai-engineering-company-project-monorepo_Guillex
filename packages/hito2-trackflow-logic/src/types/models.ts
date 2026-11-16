// =============================================================================
// TrackFlow — Modelos de dominio
// Hito 2: Fundamentos de Programación
// =============================================================================
// Este archivo define TODAS las interfaces y tipos del sistema de gestión
// de almacenes y transportistas de TrackFlow.
// =============================================================================

// ---------------------------------------------------------------------------
// Tipos alias (compartidos por varias interfaces)
// ---------------------------------------------------------------------------

/** Ubicaciones de almacén de TrackFlow */
export type WarehouseLocation = "Los Angeles" | "Zaragoza";

/** Países donde TrackFlow opera */
export type Country = "United States" | "Spain";

/** Categorías de producto */
export type ProductCategory = "Fashion" | "Electronics" | "Cosmetics" | "Home" | "Other";

/** Estado de un producto en inventario */
export type ProductStatus = "Active" | "Low stock" | "Out of stock" | "Discontinued";

/** Prioridad de envío */
export type ShipmentPriority = "Standard" | "Express" | "Same-day";

/** Estado de un envío */
export type ShipmentStatus = "Pending" | "Assigned" | "In transit" | "Delivered" | "Failed";

/** Tipo de movimiento de inventario */
export type MovementType = "Inbound" | "Outbound" | "Transfer" | "Adjustment";

// ---------------------------------------------------------------------------
// Dimensiones
// ---------------------------------------------------------------------------

/** Dimensiones de un producto en centímetros */
export interface Dimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}

// ---------------------------------------------------------------------------
// Destino de envío
// ---------------------------------------------------------------------------

/** Dirección de destino para un envío */
export interface Destination {
  city: string;
  country: Country;
  postalCode: string;
  /** Distancia desde el almacén de origen en km */
  distanceKm: number;
}

// ---------------------------------------------------------------------------
// Producto (Product)
// ---------------------------------------------------------------------------

/**
 * Representa un producto almacenado en los almacenes de TrackFlow.
 */
export interface Product {
  /** Stock Keeping Unit (ej: "SHOE-BLK-42") */
  sku: string;
  /** Nombre del producto */
  name: string;
  /** Categoría del producto */
  category: ProductCategory;
  /** Peso en kilogramos */
  weightKg: number;
  /** Largo, ancho, alto en cm */
  dimensions: Dimensions;
  /** Almacén actual */
  warehouse: WarehouseLocation;
  /** Unidades disponibles */
  stockQuantity: number;
  /** Stock mínimo antes de alerta */
  minStockThreshold: number;
  /** Costo por unidad en USD */
  unitCostUSD: number;
  /** Requiere manejo especial */
  isFragile: boolean;
  /** Estado actual */
  status: ProductStatus;
}

// ---------------------------------------------------------------------------
// Envío (Shipment)
// ---------------------------------------------------------------------------

/**
 * Representa un pedido de entrega que necesita ser enviado a un cliente.
 */
export interface Shipment {
  /** ID único de envío (ej: "SH-2024-8821") */
  id: string;
  /** SKU del producto siendo enviado */
  sku: string;
  /** Número de unidades */
  quantity: number;
  /** Almacén de origen */
  origin: WarehouseLocation;
  /** Destino de entrega */
  destination: Destination;
  /** Nivel de urgencia */
  priority: ShipmentPriority;
  /** Valor declarado para seguro en USD */
  declaredValueUSD: number;
  /** Transportista asignado (null si no asignado) */
  carrier: string | null;
  /** Estado actual */
  status: ShipmentStatus;
  /** Fecha de creación del pedido */
  createdAt: Date;
}

// ---------------------------------------------------------------------------
// Transportista (Carrier)
// ---------------------------------------------------------------------------

/**
 * Representa un transportista de entregas con el que TrackFlow trabaja.
 */
export interface Carrier {
  /** ID del transportista (ej: "CAR-UPS") */
  id: string;
  /** Nombre del transportista (ej: "UPS") */
  name: string;
  /** Países donde opera */
  operatesIn: Country[];
  /** Costo base de entrega (USD) */
  baseRateUSD: number;
  /** Costo adicional por kg (USD) */
  ratePerKgUSD: number;
  /** Costo adicional por km (USD) */
  ratePerKmUSD: number;
  /** Tiempo promedio de entrega en días */
  avgDeliveryDays: number;
  /** Tasa de entrega a tiempo (0-100) */
  onTimeRate: number;
  /** Peso máximo de paquete que aceptan (kg) */
  maxWeightKg: number;
  /** Puede manejar ítems frágiles */
  handlesFragile: boolean;
  /** Prioridades que soportan */
  acceptsPriority: ShipmentPriority[];
}

// ---------------------------------------------------------------------------
// Movimiento de inventario (InventoryMovement)
// ---------------------------------------------------------------------------

/**
 * Rastrea cambios en el inventario (entrada o salida).
 */
export interface InventoryMovement {
  /** ID del movimiento */
  id: string;
  /** SKU del producto */
  sku: string;
  /** Ubicación del almacén */
  warehouse: WarehouseLocation;
  /** Entrada o salida */
  type: MovementType;
  /** Número de unidades movidas */
  quantity: number;
  /** Razón del movimiento */
  reason: string;
  /** Cuándo sucedió */
  timestamp: Date;
}

// ---------------------------------------------------------------------------
// Tipos de retorno para validaciones
// ---------------------------------------------------------------------------

/** Resultado de una validación de negocio */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/** Resultado de selección de mejor transportista */
export interface CarrierSelectionResult {
  carrier: Carrier;
  score: number;
  cost: number;
}

// ---------------------------------------------------------------------------
// Guardias de tipo (type guards)
// ---------------------------------------------------------------------------

/**
 * Comprueba si un valor es un WarehouseLocation válido.
 */
export function isWarehouseLocation(value: string): value is WarehouseLocation {
  return value === "Los Angeles" || value === "Zaragoza";
}

/**
 * Comprueba si un valor es un ProductCategory válido.
 */
export function isProductCategory(value: string): value is ProductCategory {
  const valid: ProductCategory[] = ["Fashion", "Electronics", "Cosmetics", "Home", "Other"];
  return valid.includes(value as ProductCategory);
}

/**
 * Comprueba si un valor es un ProductStatus válido.
 */
export function isProductStatus(value: string): value is ProductStatus {
  const valid: ProductStatus[] = ["Active", "Low stock", "Out of stock", "Discontinued"];
  return valid.includes(value as ProductStatus);
}

/**
 * Comprueba si un valor es un ShipmentPriority válido.
 */
export function isShipmentPriority(value: string): value is ShipmentPriority {
  const valid: ShipmentPriority[] = ["Standard", "Express", "Same-day"];
  return valid.includes(value as ShipmentPriority);
}

/**
 * Comprueba si un valor es un ShipmentStatus válido.
 */
export function isShipmentStatus(value: string): value is ShipmentStatus {
  const valid: ShipmentStatus[] = ["Pending", "Assigned", "In transit", "Delivered", "Failed"];
  return valid.includes(value as ShipmentStatus);
}

/**
 * Comprueba si un valor es una Country válida.
 */
export function isCountry(value: string): value is Country {
  const valid: Country[] = ["United States", "Spain"];
  return valid.includes(value as Country);
}

/**
 * Comprueba si un valor es un MovementType válido.
 */
export function isMovementType(value: string): value is MovementType {
  const valid: MovementType[] = ["Inbound", "Outbound", "Transfer", "Adjustment"];
  return valid.includes(value as MovementType);
}