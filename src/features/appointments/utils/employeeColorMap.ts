import type { Employee } from "../../employees/types/employee.types";

export type EmployeeColorMap = Map<number, string>;

export function buildEmployeeColorMap(employees: Employee[]): EmployeeColorMap {
  return new Map(employees.map((employee) => [employee.id, employee.color]));
}
