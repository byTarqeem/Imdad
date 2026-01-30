
import React, { useState } from 'react';
import { MOCK_LISTINGS, WASTE_TYPES, MOCK_CONTRACTS } from '../constants.tsx';

const CompanyView: React.FC = () => {
  const [acceptedWastes, setAcceptedWastes] = useState<string[]>(['ورق', 'بلاستيك']);
  const [dailyCapacity, setDailyCapacity] = useState(15);
  const [showBidModal, setShowBidModal] = useState<string | null>(null);
  const [bidPrice, setBidPrice] = useState('');

  const toggleWaste = (type: string) => {
    setAcceptedWastes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[32px] p-10 shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-2xl font-black text-slate-800 mb-6 text-right">تقديم عرض سعر 💰</h3>
            <div className="space-y-6 text-right">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-3">السعر لكل طن (ريال عماني)</label>
                <input 
                  type="number" 
                  value={bidPrice}
                  onChange={(e) => setBidPrice(e.target.value)}
                  className="w-full bg-slate-50 p-4 rounded-2xl border-2 border-transparent focus:border-[#f6c744] outline-none font-bold"
                  placeholder="مثال: 45"
                />
              </div>
              <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 flex items-center gap-3">
                 <i className="fa-solid fa-circle-info text-yellow-600"></i>
                 <p className="text-[10px] font-bold text-yellow-700">سيصل العرض للمؤسسة للمقارنة مع الشركات الأخرى فوراً.</p>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setShowBidModal(null)}
                  className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl hover:scale-[1.02] transition-all"
                >
                  تأكيد وإرسال
                </button>
                <button 
                  onClick={() => setShowBidModal(null)}
                  className="flex-1 bg-slate-100 text-slate-400 font-black py-4 rounded-2xl"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="relative bg-[#151b28] rounded-[32px] p-10 md:p-16 text-white overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-right w-full md:w-auto">
            <div className="flex items-center justify-end gap-3 mb-4">
              <span className="bg-[#f6c744]/20 text-[#f6c744] px-3 py-1 rounded-full text-[10px] font-black border border-[#f6c744]/30 uppercase tracking-widest">بوابة المنشآت</span>
              <span className="text-emerald-400 text-xs font-bold animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span> البث المباشر للسوق نشط
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">مرحباً، <span className="text-[#f6c744]">بيئة الخضراء</span></h1>
            <p className="text-slate-400 text-lg font-medium opacity-80">نظام إدارة العمليات والتعاقدات المستدامة.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/5 border border-white/10 p-6 rounded-[24px] text-center min-w-[140px]">
                <p className="text-3xl font-black text-[#f6c744]">{MOCK_CONTRACTS.length}</p>
                <p className="text-[10px] text-white/50 font-black mt-1 uppercase">عقود جارية</p>
             </div>
             <div className="bg-white/5 border border-white/10 p-6 rounded-[24px] text-center min-w-[140px]">
                <p className="text-3xl font-black text-white">4.9</p>
                <p className="text-[10px] text-white/50 font-black mt-1 uppercase">التقييم العام</p>
             </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,#1fa98c_0%,transparent_50%)] opacity-20"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Market Feed (Bidding) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-[#f8fafc]/50">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <h2 className="text-xl font-black">سوق الطلبات المفتوح</h2>
              </div>
            </div>
            
            <div className="divide-y divide-gray-50">
              {MOCK_LISTINGS.filter(l => l.status === 'PENDING').map((listing, idx) => (
                <div key={listing.id} className="p-8 hover:bg-[#fffcf0]/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
                  <div className="flex gap-6 items-center flex-1">
                    <div className="w-16 h-16 bg-gray-50 text-[#f6c744] rounded-[20px] flex items-center justify-center font-black text-2xl group-hover:bg-[#f6c744] group-hover:text-slate-900 transition-all shadow-sm">
                      {listing.type === 'ورق' ? <i className="fa-solid fa-file-lines"></i> : <i className="fa-solid fa-bottle-water"></i>}
                    </div>
                    <div className="text-right">
                      <h3 className="font-black text-lg text-slate-800 mb-1">{listing.institutionName}</h3>
                      <div className="flex gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span><i className="fa-solid fa-weight-hanging ml-1"></i> {listing.estimatedQuantity} كجم</span>
                        <span><i className="fa-solid fa-location-dot ml-1"></i> {listing.location}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowBidModal(listing.id)}
                    className="w-full md:w-auto bg-[#f6c744] text-slate-900 px-10 py-4 rounded-2xl text-xs font-black hover:shadow-xl hover:shadow-yellow-200 transition-all active:scale-95"
                  >
                    تقديم عرض سعر
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sustainable Contracts Section */}
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black mb-8 flex items-center justify-end gap-3 text-right">
               العقود المستدامة (مصادر ثابتة)
               <span className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                 <i className="fa-solid fa-handshake"></i>
               </span>
            </h2>
            <div className="space-y-4">
              {MOCK_CONTRACTS.map(contract => (
                <div key={contract.id} className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black">نشط</span>
                      <p className="text-xs font-black text-slate-400">ينتهي في 2025</p>
                   </div>
                   <div className="text-right">
                      <h4 className="font-black text-slate-800">{contract.institutionName}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">جمع {contract.wasteType} • {contract.schedule}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Operational Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-slate-800 mb-8 text-right flex items-center justify-end gap-3">
              إعدادات القدرة والتشغيل
              <i className="fa-solid fa-sliders-h text-slate-300"></i>
            </h3>
            
            <div className="space-y-8">
              <div className="text-right">
                <label className="block text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">المواد المقبولة</label>
                <div className="grid grid-cols-2 gap-2">
                  {WASTE_TYPES.map(type => (
                    <button 
                      key={type}
                      onClick={() => toggleWaste(type)}
                      className={`p-3 rounded-xl text-[10px] font-black transition-all ${
                        acceptedWastes.includes(type) ? 'bg-[#f6c744] text-slate-900 shadow-md' : 'bg-slate-50 text-slate-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <label className="block text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">الطاقة الاستيعابية اليومية</label>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                   <button onClick={() => setDailyCapacity(Math.max(1, dailyCapacity - 1))} className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-slate-400 hover:text-red-500">-</button>
                   <div className="flex-1 text-center">
                      <span className="text-2xl font-black text-slate-800">{dailyCapacity}</span>
                      <span className="text-[10px] font-black text-slate-400 block uppercase">طن/يوم</span>
                   </div>
                   <button onClick={() => setDailyCapacity(dailyCapacity + 1)} className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-slate-400 hover:text-emerald-500">+</button>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-10 bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-slate-800 transition-all text-sm">حفظ الإعدادات</button>
          </div>

          <div className="bg-[#f6c744] p-8 rounded-[32px] text-slate-900 relative overflow-hidden shadow-xl">
             <div className="relative z-10">
                <h4 className="font-black mb-4 uppercase text-xs tracking-widest opacity-60">نصيحة المنصة</h4>
                <p className="text-sm leading-relaxed font-black italic">
                  "زيادة عدد الشاحنات في منطقة 'صحار' سيزيد من فرص فوزك بعقود المؤسسات التعليمية بنسبة 25%."
                </p>
             </div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;
