
export type UserRole = 'INSTITUTION' | 'RECYCLING_COMPANY' | 'STUDENT' | 'GUEST';

export interface WasteListing {
  id: string;
  institutionId: string;
  institutionName: string;
  type: string;
  estimatedQuantity: number;
  location: string;
  status: 'PENDING' | 'CONTRACTED';
}

export interface Bid {
  id: string;
  companyName: string;
  pricePerTon: string;
  schedule: string;
  rating: number;
  completedJobs: number;
}

export interface CollectionOperation {
  id: string;
  wasteType: string;
  companyName: string;
  status: 'PREPARING' | 'IN_TRANSIT' | 'COMPLETED';
  date: string;
  quantity: number;
}

export interface Contract {
  id: string;
  institutionId: string;
  companyId: string;
  institutionName: string;
  companyName: string;
  wasteType: string;
  price: string;
  schedule: string;
  duration: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
}

export interface AnalyticsData {
  month: string;
  quantity: number;
  recyclingRate: number;
}

export interface Reward {
  id: string;
  title: string;
  provider: string;
  cost: number;
  image: string;
  category: string;
}

export interface StudentActivity {
  id: string;
  date: string;
  action: string;
  points: number;
  location: string;
}

export interface Notification {
  id: string;
  type: 'REWARD' | 'EXPIRY' | 'EVENT' | 'SYSTEM';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}
