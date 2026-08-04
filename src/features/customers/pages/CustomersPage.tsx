import { ModulePlaceholder } from "../../../components/common/ModulePlaceholder";
import { PageHeader } from "../../../components/layout/PageHeader";

export function CustomersPage() {
  return (
    <>
      <PageHeader
        title="Clientes"
        description="Consultá y administrá la base de clientes de tu negocio."
      />
      <ModulePlaceholder />
    </>
  );
}
