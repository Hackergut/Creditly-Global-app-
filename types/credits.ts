export interface CreditRequest {
  id: string;
  userId: string;
  creditType: string;
  amount: number;
  description: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  documents: CreditDocument[];
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export interface CreditDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'client' | 'admin';
  createdAt: string;
}