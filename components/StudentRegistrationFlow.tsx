
import React, { useState } from 'react';
import { MOCK_INSTITUTIONS } from '../constants';

interface StudentRegistrationFlowProps {
  onClose: () => void;
  onComplete: () => void;
}

const StudentRegistrationFlow: React.FC<StudentRegistrationFlowProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendCode = () => {
    setIsVerifying(true);
    // Simulate a brief verification delay then go to success step
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
    }, 1500);
  };

  const renderStep1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="text-right">
        <h3 className="text-2xl font-black text-slate-800 mb-4">أهلاً بك في برنامج سفراء الاستدامة 🌿</h3>
        <p className="text-slate-500 font-medium leading-relaxed">انضم إلى آلاف الطلاب الذين يساهمون يومياً في حماية البيئة والحصول على مكافآت حصرية.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#eaf7f3] p-6 rounded-3xl border border-[#1fa98c]/10 text-right">
          <i className="fa-solid fa-hand-holding-hand text-2xl text-[#1fa98c] mb-4"></i>
          <h4 className="font-black text-slate-800 mb-2">دورك في المنصة</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-bold">المشاركة في جمع وفرز النفايات داخل الحرم الجامعي، تسجيل مشاركاتك البيئية، وقيادة حملات التوعية بين زملائك.</p>
        </div>
        <div className="bg-[#fff3cd] p-6 rounded-3xl border border-[#f6c744]/20 text-right">
          <i className="fa-solid fa-gift text-2xl text-[#e0a200] mb-4"></i>
          <h4 className="font-black text-slate-800 mb-2">نظام المكافآت</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-bold">كل مشاركة تمنحك نقاطاً يمكنك استبدالها بقسائم شرائية، خصومات من الكافيهات، وجوائز قيمة من شركائنا.</p>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-4 text-right">
        <i className="fa-solid fa-circle-info text-[#3b82f6] text-xl"></i>
        <p className="text-xs font-bold text-slate-500 leading-relaxed">
          <span className="text-[#3b82f6] block mb-1">تنبيه هام:</span>
          لا يمكنك التسجيل إلا إذا كانت مؤسستك التعليمية مشتركة مسبقاً في منصة إمداد.
        </p>
      </div>

      <button 
        onClick={() => setStep(2)}
        className="w-full bg-[#3b82f6] text-white font-black py-5 rounded-3xl shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-3"
      >
        ابدأ التسجيل الآن <i className="fa-solid fa-arrow-left"></i>
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="text-right">
        <h3 className="text-2xl font-black text-slate-800 mb-4">التحقق من المؤسسة 🏫</h3>
        <p className="text-slate-500 font-medium leading-relaxed">يرجى اختيار مؤسستك التعليمية للتحقق من أهليتك للتسجيل.</p>
      </div>

      <div className="space-y-6 text-right">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">اختر الجامعة / الكلية</label>
          <div className="relative">
            <select 
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent focus:border-[#3b82f6] rounded-2xl p-4 font-bold text-slate-700 outline-none transition-all appearance-none"
            >
              <option value="">-- اختر من القائمة --</option>
              {MOCK_INSTITUTIONS.map(inst => (
                <option key={inst.id} value={inst.id}>{inst.name}</option>
              ))}
            </select>
            <i className="fa-solid fa-chevron-down absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
          </div>
        </div>

        {selectedInstitution && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">البريد الإلكتروني الجامعي</label>
            <input 
              type="email" 
              placeholder="example@edu.om"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent focus:border-[#3b82f6] rounded-2xl p-4 font-bold text-slate-700 outline-none transition-all"
            />
            <p className="text-[10px] text-slate-400 mt-2 font-bold">سنقوم بالتحقق الفوري من انتمائك لهذه المؤسسة.</p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button 
          disabled={!selectedInstitution || !email || isVerifying}
          onClick={handleSendCode}
          className="flex-[2] bg-[#3b82f6] disabled:bg-slate-200 text-white font-black py-5 rounded-3xl shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-3"
        >
          {isVerifying ? (
            <><i className="fa-solid fa-circle-notch animate-spin"></i> جاري التحقق...</>
          ) : (
            <><i className="fa-solid fa-paper-plane ml-2"></i> إرسال الرمز ودخول المنصة</>
          )}
        </button>
        {!isVerifying && (
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
        <i className="fa-solid fa-circle-check"></i>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-black text-slate-800 mb-4">تم التحقق بنجاح! 🎉</h3>
        <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">أهلاً بك يا بطل الاستدامة. تم تفعيل حسابك، يمكنك الآن البدء في رحلة التغيير.</p>
      </div>

      <button 
        onClick={onComplete}
        className="w-full bg-[#1fa98c] text-white font-black py-5 rounded-3xl shadow-xl hover:shadow-emerald-200 transition-all flex items-center justify-center gap-3"
      >
        دخول صفحتي الشخصية <i className="fa-solid fa-gauge-high"></i>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden relative">
        <div className="h-2 w-full bg-slate-100 absolute top-0">
          <div className="h-full bg-[#3b82f6] transition-all duration-500" style={{ width: `${(step/3)*100}%` }}></div>
        </div>
        
        <div className="p-10 md:p-14">
          <div className="flex justify-between items-center mb-10">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">الخطوة {step} من 3</span>
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

export default StudentRegistrationFlow;
