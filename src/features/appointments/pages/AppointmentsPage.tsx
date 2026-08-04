import { ModulePlaceholder } from "../../../components/common/ModulePlaceholder";
import { PageHeader } from "../../../components/layout/PageHeader";

export function AppointmentsPage() {
  return (
    <>
      <PageHeader
        title="Agenda"
        description="Visualizá y gestioná los turnos de tu negocio."
      />
      <ModulePlaceholder />
    </>
  );
}
