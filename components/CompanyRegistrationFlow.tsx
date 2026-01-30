
import React, { useState } from 'react';
import { WASTE_TYPES } from '../constants.tsx';

interface CompanyRegistrationFlowProps {
  onClose: () => void;
  onComplete: () => void;
}

const CompanyRegistrationFlow: React.FC<CompanyRegistrationFlowProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    crNumber: '',
    location: '',
    fleetSize: 1,
    wasteTypes: [] as string[],
    capacity: 10,
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step === 2) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(3);
      }, 2000);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleToggleWaste = (type: string) => {
    setFormData(prev => ({
      ...prev,
      wasteTypes: prev.wasteTypes.includes(type)
        ? prev.wasteTypes.filter(t => t !== type)
        : [...prev.wasteTypes, type]
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="text-right">
        <h3 className="text-2xl font-black text-slate-800 mb-4">البيانات القانونية للشركة 🏭</h3>
        <p className="text-slate-500 font-medium leading-relaxed text-sm">يرجى إدخال بيانات السجل التجاري والموقع الرئيسي لبدء تفعيل حسابك كشريك لوجستي.</p>
      </div>

      <div className="space-y-4 text-right">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">اسم الشركة الرسمي</label>
          <input 
            type="text" 
            placeholder="مثال: شركة مسقط للتدوير الحديث"
            className="w-full bg-slate-50 border-2 border-transparent focus:border-[#f6c744] rounded-2xl p-4 font-bold text-slate-700 outline-none transition-all"
            value={formData.companyName}
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">رقم السجل التجاري</label>
            <input 
              type="text" 
              placeholder="CR-XXXXXX"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-[#f6c744] rounded-2xl p-4 font-bold text-slate-700 outline-none transition-all text-left"
              value={formData.crNumber}
              onChange={(e) => setFormData({...formData, crNumber: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">المدينة / المقر</label>
            <input 
              type="text" 
              placeholder="مثال: صحار"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-[#f6c744] rounded-2xl p-4 font-bold text-slate-700 outline-none transition-all"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>
      </div>

      <button 
        disabled={!formData.companyName || !formData.crNumber || !formData.location}
        onClick={handleNext}
        className="w-full bg-[#f6c744] text-slate-900 font-black py-5 rounded-3xl shadow-xl hover:shadow-yellow-200 transition-all flex items-center justify-center gap-3"
      >
        متابعة القدرات التشغيلية <i className="fa-solid fa-arrow-left"></i>
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="text-right">
        <h3 className="text-2xl font-black text-slate-800 mb-4">القدرة التشغيلية 🚛</h3>
        <p className="text-slate-500 font-medium leading-relaxed text-sm">حدد أنواع المواد التي يمكنك معالجتها وحجم الأسطول المتاح.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {WASTE_TYPES.map(type => (
          <button 
            key={type}
            onClick={() => handleToggleWaste(type)}
            className={`p-4 rounded-2xl border-2 transition-all font-bold text-xs text-right flex items-center justify-between ${
              formData.wasteTypes.includes(type) 
              ? 'border-[#f6c744] bg-[#fffcf0] text-[#e0a200]' 
              : 'border-slate-100 bg-slate-50 text-slate-500'
            }`}
          >
            {formData.wasteTypes.includes(type) ? <i className="fa-solid fa-check-double"></i> : <div className="w-3 h-3 rounded-full border border-slate-300"></div>}
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 text-right">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">عدد الشاحنات</label>
          <input 
            type="number" 
            className="w-full bg-slate-50 border-2 border-transparent focus:border-[#f6c744] rounded-2xl p-4 font-bold text-slate-700 outline-none transition-all"
            value={formData.fleetSize}
            onChange={(e) => setFormData({...formData, fleetSize: Number(e.target.value)})}
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">القدرة اليومية (طن)</label>
          <input 
            type="number" 
            className="w-full bg-slate-50 border-2 border-transparent focus:border-[#f6c744] rounded-2xl p-4 font-bold text-slate-700 outline-none transition-all"
            value={formData.capacity}
            onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          disabled={formData.wasteTypes.length === 0 || isSubmitting}
          onClick={handleNext}
          className="flex-[2] bg-[#f6c744] text-slate-900 font-black py-5 rounded-3xl shadow-xl hover:shadow-yellow-200 transition-all flex items-center justify-center gap-3"
        >
          {isSubmitting ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <><i className="fa-solid fa-check-to-slot ml-2"></i> إتمام التسجيل والبدء</>}
        </button>
        {!isSubmitting && (
          <button 
            onClick={() => setStep(1)}
            className="flex-1 bg-slate-100 text-slate-500 font-black py-5 rounded-3xl hover:bg-slate-200 transition-all"
          >
            رجوع
          </button>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner border border-yellow-100">
        <i className="fa-solid fa-truck-fast"></i>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-black text-slate-800 mb-4">مرحباً بك في سوق إمداد! 📈</h3>
        <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">تم إدراج شركتك (<b>{formData.companyName}</b>) بنجاح. يمكنك الآن المزايدة على طلبات الجمع المتاحة.</p>
      </div>

      <button 
        onClick={onComplete}
        className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl shadow-xl transition-all flex items-center justify-center gap-3"
      >
        دخول لوحة تحكم العمليات <i className="fa-solid fa-gauge-high"></i>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden relative">
        <div className="h-2 w-full bg-slate-100 absolute top-0">
          <div className="h-full bg-[#f6c744] transition-all duration-500" style={{ width: `${(step/3)*100}%` }}></div>
        </div>
        
        <div className="p-10 md:p-14">
          <div className="flex justify-between items-center mb-10">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">تسجيل شركة تدوير | الخطوة {step}</span>
            <button onClick={onClose} className="text-slate-300 hover:text-slate-500 transition-colors">
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationFlow;
