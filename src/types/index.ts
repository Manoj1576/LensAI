export type UserRole = 'admin' | 'assistant' | 'client';

export type ViewMode = 
  // Common / Auth
  | 'login'
  | 'marketing'
  | 'onboarding'
  | 'settings'
  
  // Admin Views
  | 'workspace'
  | 'leads'
  | 'clients'
  | 'client-detail'
  | 'quotes-new'
  | 'quotations'
  | 'bookings'
  | 'booking-confirmation'
  | 'shoots'
  | 'calendar'
  | 'projects'
  | 'project'
  | 'project-detail'
  | 'photo-upload'
  | 'ai-culling'
  | 'culling-results'
  | 'culling-photo'
  | 'culling-similar'
  | 'culling-summary'
  | 'galleries'
  | 'gallery-create'
  | 'client-gallery'
  | 'payments'
  | 'analytics'
  | 'feedback'
  
  // Assistant Views
  | 'assistant-workspace'
  | 'assistant-shoots'
  | 'assistant-calendar'
  | 'assistant-projects'
  | 'assistant-tasks'
  | 'assistant-culling'
  | 'assistant-gallery-prep'
  
  // Client Views
  | 'client-dashboard'
  | 'client-project'
  | 'client-quote'
  | 'client-payments'
  | 'client-gallery'
  | 'client-favorites'
  | 'client-downloads'
  | 'client-feedback';

export type ProjectStage = 
  | 'inquiry'
  | 'quotation'
  | 'booking'
  | 'shoot'
  | 'photo-upload'
  | 'ai-culling'
  | 'photographer-review'
  | 'gallery'
  | 'delivery'
  | 'payment'
  | 'feedback'
  | 'completed';

export interface WorkflowStageInfo {
  id: ProjectStage;
  stepNumber: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  meta?: string;
}

export type ShootCategory = 
  | 'Wedding'
  | 'Pre-Wedding'
  | 'Portrait'
  | 'Commercial'
  | 'Landscape'
  | 'Fashion'
  | 'Events';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  title: string;
  studioName: string;
}

export interface LeadItem {
  id: string;
  clientName: string;
  partnerName?: string;
  email: string;
  phone: string;
  eventType: ShootCategory;
  eventDate: string;
  location: string;
  budget: number;
  source: 'Instagram' | 'Referral' | 'Website' | 'WeddingWire' | 'Vogue Feature';
  status: 'new' | 'contacted' | 'quoted' | 'follow-up' | 'booked' | 'lost';
  notes: string;
  createdAt: string;
  avatarUrl: string;
}

export interface Client {
  id: string;
  name: string;
  partnerName?: string;
  email: string;
  phone: string;
  location: string;
  eventType: ShootCategory;
  eventDate: string;
  eventTime?: string;
  status: 'Inquiry' | 'Contacted' | 'Quoted' | 'Follow-up' | 'Booked' | 'In Progress' | 'Delivered' | 'Completed';
  pipelineStage: 'new' | 'contacted' | 'quoted' | 'follow-up' | 'booked' | 'lost';
  cullingProgress?: number;
  totalAmount: number;
  paidAmount: number;
  avatarUrl: string;
  coverImageUrl: string;
  packageTitle: string;
  notes?: string;
  assignedCrew?: string[];
  unreadMessages?: number;
  rating?: number;
  feedbackText?: string;
}

export interface ShootSession {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  category: ShootCategory;
  date: string;
  timeRange: string;
  venue: string;
  city: string;
  coverImage: string;
  status: 'Upcoming' | 'In Progress' | 'Culling' | 'Ready for Gallery' | 'Delivered';
  leadPhotographer: string;
  secondShooter?: string;
  cinematographer?: string;
  droneOperator?: string;
  estimatedFrames: number;
  cullingCompletedFrames?: number;
  packageTotal: number;
  advancePaid: number;
  tasks: { id: string; title: string; done: boolean }[];
  shotList: string[];
}

export interface AiCullingPhoto {
  id: string;
  url: string;
  thumbnailUrl: string;
  filename: string;
  burstGroupId?: string;
  isBurstBest?: boolean;
  resolution: string;
  iso: number;
  shutter: string;
  aperture: string;
  focalLength: string;
  timestamp: string;
  
  // AI Metrics
  faceCount: number;
  eyesStatus: 'Open' | 'Closed' | 'Partially Closed';
  eyeClosedConfidence?: number; // 0 - 100%
  sharpnessScore: number; // 0 - 100
  isBlurry?: boolean;
  duplicateRisk: number; // 0 - 100
  qualityScore: number; // 0 - 100
  
  aiRecommendation: 'KEEP' | 'REVIEW' | 'REJECT';
  photographerDecision?: 'KEEP' | 'REVIEW' | 'REJECT';
  reason: string;
  
  tags: ('Closed Eyes' | 'Blurry' | 'Duplicates' | 'Best Shots' | 'Key Moment')[];
  isFavorited?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  rate: number;
  quantity: number;
  unit: string;
  selected: boolean;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  issueDate: string;
  validUntil: string;
  services: ServiceItem[];
  subtotal: number;
  discountPercent: number;
  taxPercent: number; // GST 18%
  total: number;
  advanceRequired: number;
  balanceDue: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Declined' | 'Changes Requested';
  notes: string;
}

export interface PaymentMilestone {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
  transactionRef?: string;
}

export interface ClientReview {
  id: string;
  clientId: string;
  clientName: string;
  partnerName?: string;
  eventType: ShootCategory;
  date: string;
  rating: number;
  scores: {
    photography: number;
    communication: number;
    deliverySpeed: number;
    overallExperience: number;
  };
  quote: string;
  detailedReview: string;
  avatarUrl: string;
  featuredOnWebsite: boolean;
}

export interface AssistantTask {
  id: string;
  shootId: string;
  shootTitle: string;
  taskTitle: string;
  category: 'Gear' | 'Scouting' | 'Culling' | 'Review' | 'Gallery';
  dueDate: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}
