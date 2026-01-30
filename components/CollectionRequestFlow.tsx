
import React, { useState } from 'react';
import { MOCK_BIDS, MOCK_ACTIVE_OPERATIONS } from '../constants.tsx';
import { Bid } from '../types.ts';

interface CollectionRequestFlowProps {
  wasteType: string;
  quantity: number;
  onClose: () => void;
}

const CollectionRequestFlow: React.FC<CollectionRequestFlowProps> = ({ wasteType, quantity, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [isSigning, setIsSigning] = useState(false);

  const handleSelectBid = (bid: Bid) => {
    setSelectedBid(bid);
    setStep(2);
  };

  const handleSignContract = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setStep(3);
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="text-right">
        <h3 className="text-2xl font-black text-slate-800 mb-2">عروض شركات التدوير 🏢</h3>
        <p className="text-sm text-slate-500 font-bold">لقد تلقينا 3 عروض لشحنة الـ ({quantity} كجم) من الـ ({wasteType}).</p>
      </div>

      <div className="space-y-4">
        {MOCK_BIDS.map(bid => (
          <div key={bid.id} className="bg-white border-2 border-slate-100 hover:border-[#1fa98c] p-6 rounded-[24px] transition-all group cursor-pointer" onClick={() => handleSelectBid(bid)}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-1 text-[#f6c744]">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fa-solid fa-star text-[10px] ${i < Math.floor(bid.rating) ? 'text-[#f6c744]' : 'text-slate-200'}`}></i>
                ))}
                <span className="text-[10px] font-black text-slate-400 mr-2">({bid.completedJobs} عملية)</span>
              </div>
              <h4 className="font-black text-slate-800 group-hover:text-[#1fa98c] transition-colors">{bid.companyName}</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-right">
              <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-[10px] text-slate-400 font-black mb-1 uppercase">السعر التقديري</p>
                <p className="font-black text-[#1fa98c]">{bid.pricePerTon}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-[10px] text-slate-400 font-black mb-1 uppercase">موعد الجمع</p>
                <p className="font-black text-slate-700 text-xs">{bid.schedule}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="text-right">
        <h3 className="text-2xl font-black text-slate-800 mb-2">توثيق الاتفاقية رقمياً ✍️</h3>
        <p className="text-sm text-slate-500 font-bold">بقبولك عرض <b>{selectedBid?.companyName}</b>، أنت توافق على شروط الخدمة الموحدة.</p>
      </div>

      <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-4 text-right text-xs leading-relaxed text-slate-600 font-medium h-48 overflow-y-auto custom-scrollbar">
        <p>تتعهد الشركة بجمع النفايات في الموعد المحدد: {selectedBid?.schedule}.</p>
        <p>يتم احتساب السعر النهائي بناءً على الوزن الفعلي عند الاستلام.</p>
        <p>تلتزم المؤسسة بفرز النفايات وتجهيزها في نقطة التجميع المتفق عليها.</p>
        <p>يتم إصدار شهادة تدوير موثقة فور إتمام العملية بنجاح.</p>
        <p>تخضع هذه الاتفاقية للقوانين البيئية المعمول بها في سلطنة عمان.</p>
      </div>

      <div className="bg-[#eaf7f3] p-6 rounded-2xl flex items-center justify-between gap-4">
        <i className="fa-solid fa-shield-check text-[#1fa98c] text-2xl"></i>
        <p className="text-[10px] font-bold text-[#1fa98c] leading-relaxed text-right">نظام إمداد يضمن لك الشفافية الكاملة وحفظ الحقوق عبر تقنية العقود الرقمية الموثقة.</p>
      </div>

      <div className="flex gap-4">
        <button 
          disabled={isSigning}
          onClick={handleSignContract}
          className="flex-[2] bg-[#1fa98c] text-white font-black py-5 rounded-3xl shadow-xl hover:shadow-emerald-200 transition-all flex items-center justify-center gap-3"
        >
          {isSigning ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <><i className="fa-solid fa-signature ml-2"></i> توقيع وتأكيد الطلب</>}
        </button>
        {!isSigning && (
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
        <i className="fa-solid fa-truck-ramp-box"></i>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-black text-slate-800 mb-2">طلبك في الطريق! 🚛</h3>
        <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">تم إرسال تأكيد لشركة <b>{selectedBid?.companyName}</b>. يمكنك تتبع الشاحنة الآن من لوحة التحكم.</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 text-right">
          <h4 className="text-xs font-black text-slate-400 mb-4 uppercase tracking-widest">حالة الشحنة الحالية</h4>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#eaf7f3] text-[#1fa98c] rounded-full flex items-center justify-center">
                <i className="fa-solid fa-circle-check"></i>
             </div>
             <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#1fa98c] w-1/3 animate-pulse"></div>
             </div>
             <div className="w-10 h-10 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-truck"></i>
             </div>
          </div>
          <p className="text-[10px] font-black text-[#1fa98c] mt-4">جاري تجهيز الشاحنة للانطلاق للموقع...</p>
        </div>
      </div>

      <button 
        onClick={onClose}
        className="w-full bg-slate-800 text-white font-black py-5 rounded-3xl shadow-xl transition-all"
      >
        العودة للرئيسية
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden relative">
        <div className="h-2 w-full bg-slate-100 absolute top-0">
          <div className="h-full bg-[#1fa98c] transition-all duration-500" style={{ width: `${(step/3)*100}%` }}></div>
        </div>
        
        <div className="p-10 md:p-14">
          <div className="flex justify-between items-center mb-10">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">طلب جمع | {step === 3 ? 'التتبع' : 'اختيار العرض'}</span>
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

export default CollectionRequestFlow;
