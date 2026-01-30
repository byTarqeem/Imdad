
import { AnalyticsData, Contract, WasteListing, Reward, StudentActivity, Notification, Bid, CollectionOperation } from './types.ts';

export const WASTE_TYPES = ['بلاستيك', 'ورق', 'معادن', 'إلكترونيات', 'زجاج'];

export const MOCK_BIDS: Bid[] = [
  { id: 'b1', companyName: 'شركة البيئة الخضراء', pricePerTon: '45 OMR', schedule: 'الأحد - 8 صباحاً', rating: 4.9, completedJobs: 124 },
  { id: 'b2', companyName: 'الشركة العمانية للتدوير', pricePerTon: '42 OMR', schedule: 'الاثنين - 10 صباحاً', rating: 4.7, completedJobs: 89 },
  { id: 'b3', companyName: 'حلول الاستدامة الذكية', pricePerTon: '48 OMR', schedule: 'الأربعاء - 2 ظهراً', rating: 4.5, completedJobs: 210 },
];

export const MOCK_ACTIVE_OPERATIONS: CollectionOperation[] = [
  { id: 'op1', wasteType: 'ورق', companyName: 'شركة البيئة الخضراء', status: 'IN_TRANSIT', date: '2024-05-24', quantity: 450 },
  { id: 'op2', wasteType: 'بلاستيك', companyName: 'الشركة العمانية للتدوير', status: 'COMPLETED', date: '2024-05-20', quantity: 200 },
];

export const MOCK_INSTITUTIONS = [
  { id: 'u1', name: 'جامعة السلطان قابوس' },
  { id: 'u2', name: 'جامعة التقنية والعلوم التطبيقية' },
  { id: 'u3', name: 'جامعة مسقط' },
  { id: 'u4', name: 'الكلية الحديثة للتجارة والعلوم' },
  { id: 'u5', name: 'جامعة الشرقية' },
  { id: 'u6', name: 'كلية مسقط' },
];

export const MOCK_LISTINGS: WasteListing[] = [
  { id: '1', institutionId: 'u1', institutionName: 'جامعة السلطان قابوس', type: 'ورق', estimatedQuantity: 500, location: 'مسقط', status: 'PENDING' },
  { id: '2', institutionId: 'u2', institutionName: 'مستشفى مسقط الخاص', type: 'بلاستيك', estimatedQuantity: 200, location: 'بوشر', status: 'PENDING' },
  { id: '3', institutionId: 'u3', institutionName: 'مدرسة التفوق', type: 'إلكترونيات', estimatedQuantity: 50, location: 'السيب', status: 'CONTRACTED' },
];

export const MOCK_CONTRACTS: Contract[] = [
  { id: 'c1', institutionId: 'u1', companyId: 'r1', institutionName: 'جامعة السلطان قابوس', companyName: 'شركة البيئة الخضراء', wasteType: 'ورق', price: '50 OMR/طن', schedule: 'أسبوعي', duration: 'سنة', status: 'ACTIVE' },
];

export const MOCK_ANALYTICS: AnalyticsData[] = [
  { month: 'يناير', quantity: 400, recyclingRate: 75 },
  { month: 'فبراير', quantity: 600, recyclingRate: 82 },
  { month: 'مارس', quantity: 550, recyclingRate: 88 },
  { month: 'أبريل', quantity: 700, recyclingRate: 90 },
];

export const MOCK_REWARDS: Reward[] = [
  { id: 'r1', title: 'قهوة مجانية', provider: 'كافيه الحرم', cost: 50, category: 'طعام وشراب', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=200' },
  { id: 'r2', title: 'قسيمة طباعة (100 ورقة)', provider: 'مكتبة الجامعة', cost: 100, category: 'أدوات دراسية', image: 'https://images.unsplash.com/photo-1586075010633-2470ff207866?auto=format&fit=crop&q=80&w=200' },
  { id: 'r3', title: 'اشتراك صالة رياضية شهر', provider: 'المركز الرياضي', cost: 500, category: 'صحة', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200' },
  { id: 'r4', title: 'سماعات بلوتوث', provider: 'متجر التقنية', cost: 1500, category: 'إلكترونيات', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200' },
];

export const MOCK_STUDENT_ACTIVITIES: StudentActivity[] = [
  { id: 'a1', date: '2024-05-20', action: 'تدوير 3 كجم بلاستيك', points: 15, location: 'كلية مسقط' },
  { id: 'a2', date: '2024-05-18', action: 'تدوير 5 كجم ورق', points: 25, location: 'كلية مسقط' },
  { id: 'a3', date: '2024-05-15', action: 'المشاركة في حملة تنظيف', points: 100, location: 'كلية مسقط' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'EXPIRY', title: 'نقاطك ستنتهي قريباً!', message: 'لديك 50 نقطة ستنتهي صلاحيتها خلال 48 ساعة. استبدلها الآن!', date: 'منذ ساعتين', isRead: false },
  { id: 'n2', type: 'REWARD', title: 'مكافأة جديدة متاحة', message: 'تم إضافة "كوبون خصم 20%" لمتجر الكتب الجامعي.', date: 'منذ 5 ساعات', isRead: false },
  { id: 'n3', type: 'EVENT', title: 'فعالية تنظيف الشاطئ', message: 'انضم لزملائك يوم الجمعة القادم في حملة تنظيف شاطئ السيب.', date: 'منذ يوم', isRead: true },
];
