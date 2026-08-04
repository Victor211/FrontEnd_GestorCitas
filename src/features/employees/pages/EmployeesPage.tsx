import { ModulePlaceholder } from "../../../components/common/ModulePlaceholder";
import { PageHeader } from "../../../components/layout/PageHeader";

export function EmployeesPage() {
  return (
    <>
      <PageHeader
        title="Empleados"
        description="Gestioná el equipo que trabaja en tu negocio."
      />
      <ModulePlaceholder />
    </>
  );
}
