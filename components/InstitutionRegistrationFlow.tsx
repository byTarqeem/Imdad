
import React, { useState } from 'react';
import { WASTE_TYPES } from '../constants.tsx';

interface InstitutionRegistrationFlowProps {
  onClose: () => void;
  onComplete: () => void;
}

const InstitutionRegistrationFlow: React.FC<InstitutionRegistrationFlowProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    email: '',
    wasteTypes: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      wasteTypes: prev.wasteTypes.includes(type)
        ? prev.wasteTypes.filter(t => t !== type)
        : [...prev.wasteTypes, type]
    }));
  };

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

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="text-right">
        <h3 className="text-2xl font-black text-slate-800 mb-4">بيانات المؤسسة الرسمية 🏛️</h3>
        <p className="text-slate-500 font-medium leading-relaxed">يرجى تزويدنا بالبيانات الأساسية لبدء عملية التوثيق الرقمي لمؤسستك.</p>
      </div>

      <div className="space-y-4 text-right">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">اسم المؤسسة</label>
          <input 
            type="text" 
            placeholder="مثال: جامعة مسقط"
            className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1fa98c] rounded-2xl p-4 font-bold text-slate-700 outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">نوع المؤسسة</label>
          <div className="relative">
            <select 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1fa98c] rounded-2xl p-4 font-bold text-slate-700 outline-none transition-all appearance-none"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="">-- اختر النوع --</option>
              <option value="UNIVERSITY">جامعة / كلية</option>
              <option value="HOSPITAL">مستشفى / مركز صحي</option>
              <option value="SCHOOL">مدرسة</option>
              <option value="HOUSING">مجمع سكني / شقق</option>
              <option value="OTHER">أخرى</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
          </div>
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">الموقع الجغرافي</label>
          <input 
            type="text" 
            placeholder="المدينة، المنطقة"
            className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1fa98c] rounded-2xl p-4 font-bold text-slate-700 outline-none transition-all"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>
      </div>

      <button 
        disabled={!formData.name || !formData.type || !formData.location}
        onClick={handleNext}
        className="w-full bg-[#1fa98c] disabled:bg-slate-200 text-white font-black py-5 rounded-3xl shadow-xl hover:shadow-emerald-200 transition-all flex items-center justify-center gap-3"
      >
        المتابعة لملف النفايات <i className="fa-solid fa-arrow-left"></i>
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="text-right">
        <h3 className="text-2xl font-black text-slate-800 mb-4">توصيف النفايات ♻️</h3>
        <p className="text-slate-500 font-medium leading-relaxed">حدد أنواع المواد التي ترغب في إدراجها ضمن خطة الجمع المستدامة.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {WASTE_TYPES.map(type => (
          <button 
            key={type}
            onClick={() => handleCheckboxChange(type)}
            className={`p-4 rounded-2xl border-2 transition-all font-bold text-sm text-right flex items-center justify-between ${
              formData.wasteTypes.includes(type) 
              ? 'border-[#1fa98c] bg-[#eaf7f3] text-[#1fa98c]' 
              : 'border-slate-100 bg-slate-50 text-slate-500'
            }`}
          >
            {formData.wasteTypes.includes(type) ? <i className="fa-solid fa-circle-check"></i> : <div className="w-4 h-4 rounded-full border border-slate-300"></div>}
            {type}
          </button>
        ))}
      </div>

      <div className="text-right">
        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">البريد الإلكتروني للتواصل</label>
        <input 
          type="email" 
          placeholder="admin@institution.om"
          className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1fa98c] rounded-2xl p-4 font-bold text-slate-700 outline-none transition-all"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="flex gap-4">
        <button 
          disabled={formData.wasteTypes.length === 0 || !formData.email || isSubmitting}
          onClick={handleNext}
          className="flex-[2] bg-[#1fa98c] disabled:bg-slate-200 text-white font-black py-5 rounded-3xl shadow-xl hover:shadow-emerald-200 transition-all flex items-center justify-center gap-3"
        >
          {isSubmitting ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <><i className="fa-solid fa-check ml-2"></i> إتمام التسجيل الرسمي</>}
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
      <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner border border-emerald-100">
        <i className="fa-solid fa-file-shield"></i>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-black text-slate-800 mb-4">تم تقديم طلب التسجيل! 📋</h3>
        <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">سيقوم فريق إمداد بمراجعة بيانات مؤسستك (<b>{formData.name}</b>) وتفعيل حسابك الرسمي خلال 24 ساعة.</p>
      </div>

      <button 
        onClick={onComplete}
        className="w-full bg-[#1fa98c] text-white font-black py-5 rounded-3xl shadow-xl hover:shadow-emerald-200 transition-all flex items-center justify-center gap-3"
      >
        دخول لوحة التحكم التجريبية <i className="fa-solid fa-gauge-high"></i>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden relative">
        <div className="h-2 w-full bg-slate-100 absolute top-0">
          <div className="h-full bg-[#1fa98c] transition-all duration-500" style={{ width: `${(step/3)*100}%` }}></div>
        </div>
        
        <div className="p-10 md:p-14">
          <div className="flex justify-between items-center mb-10">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">تسجيل مؤسسة | الخطوة {step}</span>
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

export default InstitutionRegistrationFlow;
