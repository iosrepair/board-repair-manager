
export interface User {
  id: string;
  fullName: string;
  storeName: string;
  document: string; // CPF/CNPJ
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: Date;
}

export interface ServiceOrder {
  id: string;
  userId: string;
  deviceModel: string;
  defectDescription: string;
  repairType: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  estimatedCompletion?: Date;
  completedAt?: Date;
  warrantyTerms: string;
  notes?: string;
}
