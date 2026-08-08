export interface BusinessSettings {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  timezone: string;
  whatsappConfigured: boolean;
}

export interface UpdateBusinessSettingsRequest {
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  timezone: string;
}

export interface SettingsFormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  timezone: string;
}
