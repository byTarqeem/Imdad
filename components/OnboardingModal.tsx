
import React from 'react';
import { UserRole } from '../types';

interface OnboardingModalProps {
  role: UserRole;
  onClose: () => void;
  onConfirm: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ role, onClose, onConfirm }) => {
  const getContent = () => {
    switch (role) {
      case 'INSTITUTION':
        return {
          title: 'ابدأ كمؤسسة تعليمية / خدمية',
          icon: 'fa-building',
          color: '#1fa98c',
          services: [
            'القيام بالتسجيل الرسمي للمؤسسة في منصة إمداد',
            'تحديد أنواع النفايات الناتجة والكميات المتوقعة بدقة',
            'الاطلاع على عروض تنافسية من أفضل شركات إعادة التدوير',
            'اختيار العرض الأنسب بناءً على السعر، الجدول، والتقييمات',
            'توثيق الاتفاقيات رقمياً لضمان الحقوق والشفافية',
            'متابعة عمليات الجمع والتقارير الشهرية عبر لوحة التحكم'
          ]
        };
      case 'RECYCLING_COMPANY':
        return {
          title: 'ابدأ كشركة إعادة تدوير',
          icon: 'fa-truck',
          color: '#f6c744',
          services: [
            'تسجيل بيانات الشركة وقدراتها التشغيلية في المنصة',
            'تحديد أنواع النفايات المقبولة وطاقة الاستيعاب اليومية',
            'تقديم عروض أسعار وجداول جمع للمؤسسات المسجلة',
            'الحصول على عقود مستدامة ومصادر نفايات ثابتة وموثوقة',
            'بناء السمعة الرقمية من خلال نظام التقييمات المتبادل'
          ]
        };
      case 'STUDENT':
        return {
          title: 'ابدأ كطالب (برنامج المكافآت)',
          icon: 'fa-graduation-cap',
          color: '#3b82f6',
          sections: [
            {
              label: 'آلية التسجيل',
              items: [
                'لا يمكن التسجيل إلا إذا كانت مؤسستك التعليمية مسجلة مسبقاً',
                'اختيار اسم المؤسسة من القائمة المعتمدة',
                'التحقق عبر البريد الجامعي أو الرقم الجامعي لضمان المصداقية'
              ]
            },
            {
              label: 'دورك داخل المنصة',
              items: [
                'المشاركة في جمع وفرز النفايات داخل الحرم الجامعي',
                'المساهمة في الحملات البيئية المعتمدة',
                'تسجيل المشاركات ومتابعة الرصيد المتنامي من النقاط'
              ]
            },
            {
              label: 'نظام المكافآت (نقاطك تساوي جوائز)',
              items: [
                'جمع النقاط عبر الفرز الصحيح والمشاركة النشطة',
                'تحويل النقاط إلى قسائم مكافآت (Vouchers) وخصومات',
                'مكافآت عينية بالتعاون مع المؤسسة وشركاء إمداد'
              ]
            }
          ]
        };
      default:
        return null;
    }
  };

  const data = getContent();
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-8">
            <button onClick={onClose} className="text-slate-300 hover:text-slate-500 transition-colors">
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg" style={{ backgroundColor: data.color }}>
              <i className={`fa-solid ${data.icon}`}></i>
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-6 text-right">{data.title}</h2>
          
          <div className="space-y-6 text-right max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {data.services ? (
              <ul className="space-y-4">
                {data.services.map((s, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-600 font-bold leading-relaxed">
                    <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: data.color }}></span>
                    {s}
                  </li>
                ))}
              </ul>
            ) : data.sections ? (
              data.sections.map((sec, i) => (
                <div key={i} className="space-y-3">
                  <h4 className="text-lg font-black" style={{ color: data.color }}>{sec.label}</h4>
                  <ul className="space-y-2">
                    {sec.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-600 font-bold text-sm leading-relaxed">
                        <i className="fa-solid fa-check mt-1 text-xs" style={{ color: data.color }}></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : null}
          </div>

          <div className="mt-12 flex gap-4">
            <button 
              onClick={onConfirm}
              className="flex-1 text-white font-black py-5 rounded-3xl shadow-xl transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: data.color }}
            >
              متابعة التسجيل
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-500 font-black py-5 rounded-3xl hover:bg-slate-200 transition-all"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
