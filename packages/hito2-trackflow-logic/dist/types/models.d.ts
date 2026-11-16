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
/** Dimensiones de un producto en centímetros */
export interface Dimensions {
    lengthCm: number;
    widthCm: number;
    heightCm: number;
}
/** Dirección de destino para un envío */
export interface Destination {
    city: string;
    country: Country;
    postalCode: string;
    /** Distancia desde el almacén de origen en km */
    distanceKm: number;
}
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
/**
 * Comprueba si un valor es un WarehouseLocation válido.
 */
export declare function isWarehouseLocation(value: string): value is WarehouseLocation;
/**
 * Comprueba si un valor es un ProductCategory válido.
 */
export declare function isProductCategory(value: string): value is ProductCategory;
/**
 * Comprueba si un valor es un ProductStatus válido.
 */
export declare function isProductStatus(value: string): value is ProductStatus;
/**
 * Comprueba si un valor es un ShipmentPriority válido.
 */
export declare function isShipmentPriority(value: string): value is ShipmentPriority;
/**
 * Comprueba si un valor es un ShipmentStatus válido.
 */
export declare function isShipmentStatus(value: string): value is ShipmentStatus;
/**
 * Comprueba si un valor es una Country válida.
 */
export declare function isCountry(value: string): value is Country;
/**
 * Comprueba si un valor es un MovementType válido.
 */
export declare function isMovementType(value: string): value is MovementType;
//# sourceMappingURL=models.d.ts.map