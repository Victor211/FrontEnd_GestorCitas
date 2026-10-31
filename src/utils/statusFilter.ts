/** Filtro de estado de las pantallas administrativas (Servicios y Empleados). */
export type StatusFilter = "all" | "active" | "inactive";

export const DEFAULT_STATUS_FILTER: StatusFilter = "all";

/** Valor del parámetro `active` que espera el backend. */
export type ActiveQueryParam = "all" | "true" | "false";

const STATUS_FILTER_TO_PARAM: Record<StatusFilter, ActiveQueryParam> = {
  all: "all",
  active: "true",
  inactive: "false",
};

export function toActiveParam(filter: StatusFilter): ActiveQueryParam {
  return STATUS_FILTER_TO_PARAM[filter];
}
