export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  percentage: number;
  maxAmount?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}