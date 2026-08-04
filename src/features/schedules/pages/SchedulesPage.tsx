import { ModulePlaceholder } from "../../../components/common/ModulePlaceholder";
import { PageHeader } from "../../../components/layout/PageHeader";

export function SchedulesPage() {
  return (
    <>
      <PageHeader
        title="Horarios"
        description="Definí los horarios de atención y disponibilidad."
      />
      <ModulePlaceholder />
    </>
  );
}
