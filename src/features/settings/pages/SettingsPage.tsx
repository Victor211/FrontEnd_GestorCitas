import { ModulePlaceholder } from "../../../components/common/ModulePlaceholder";
import { PageHeader } from "../../../components/layout/PageHeader";

export function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Configuración"
        description="Ajustá las preferencias generales de tu negocio."
      />
      <ModulePlaceholder />
    </>
  );
}
