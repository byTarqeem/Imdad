
import React, { useState, useEffect } from 'react';
import { WASTE_TYPES, MOCK_LISTINGS, MOCK_CONTRACTS, MOCK_ANALYTICS, MOCK_ACTIVE_OPERATIONS } from '../constants.tsx';
import { getSustainabilityTips } from '../geminiService.ts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CollectionRequestFlow from './CollectionRequestFlow.tsx';

const InstitutionView: React.FC = () => {
  const [wasteType, setWasteType] = useState(WASTE_TYPES[0]);
  const [quantity, setQuantity] = useState<number>(500);
  const [tips, setTips] = useState('جاري جلب نصائح مخصصة من الذكاء الاصطناعي...');
  const [loadingTips, setLoadingTips] = useState(false);
  const [showRequestFlow, setShowRequestFlow] = useState(false);

  useEffect(() => {
    fetchTips();
  }, [wasteType]);

  const fetchTips = async () => {
    setLoadingTips(true);
    const newTips = await getSustainabilityTips(wasteType);
    setTips(newTips);
    setLoadingTips(false);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRequestFlow(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {showRequestFlow && (
        <CollectionRequestFlow 
          wasteType={wasteType} 
          quantity={quantity} 
          onClose={() => setShowRequestFlow(false)} 
        />
      )}

      {/* Welcome Hero */}
      <div className="relative imdad-gradient rounded-[32px] p-10 md:p-16 text-white overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
          <div className="text-right">
            <div className="flex items-center justify-end gap-3 mb-4">
              <span className="text-white/60 text-xs font-bold">آخر دخول: منذ ساعتين •</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-black border border-white/30 uppercase tracking-widest">بوابة الشركاء</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">مرحباً، <span className="text-[#f6c744]">جامعة السلطان قابوس</span></h1>
            <p className="text-white/80 text-lg max-w-xl font-medium">مركز التحكم الخاص بك لإدارة الاستدامة والتعاقدات الرقمية والمبادرات الطلابية.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-[24px] text-center min-w-[140px] shadow-sm">
                <p className="text-3xl font-black text-[#f6c744]">88%</p>
                <p className="text-[10px] text-white/70 font-black mt-1 uppercase">معدل التدوير</p>
             </div>
             <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-[24px] text-center min-w-[140px] shadow-sm">
                <p className="text-3xl font-black text-white">1.2</p>
                <p className="text-[10px] text-white/70 font-black mt-1 uppercase">طن مجمع/شهر</p>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Quick Actions & AI Assistant */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
            <h2 className="text-xl font-black mb-8 flex items-center justify-end gap-3">
              نشر عرض جديد للسوق
              <span className="w-10 h-10 bg-[#eaf7f3] text-[#1fa98c] rounded-xl flex items-center justify-center shadow-sm">
                <i className="fa-solid fa-plus text-sm"></i>
              </span>
            </h2>
            <form className="space-y-6" onSubmit={handleRequestSubmit}>
              <div className="text-right">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">نوع المادة</label>
                <div className="relative">
                  <select 
                    value={wasteType}
                    onChange={(e) => setWasteType(e.target.value)}
                    className="w-full bg-[#f8fafc] border-transparent rounded-[16px] focus:ring-2 focus:ring-[#1fa98c] p-4 font-bold text-slate-700 outline-none transition-all appearance-none text-right"
                  >
                    {WASTE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <i className="fa-solid fa-chevron-down absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs"></i>
                </div>
              </div>
              <div className="text-right">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">الكمية التقديرية (كجم)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="مثلاً 500" 
                    className="w-full bg-[#f8fafc] border-transparent rounded-[16px] focus:ring-2 focus:ring-[#1fa98c] p-4 font-bold text-slate-700 outline-none transition-all text-right" 
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs uppercase">كجم</span>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#1fa98c] text-white font-black py-5 rounded-[16px] shadow-lg hover:shadow-[#1fa98c]/20 transition-all hover:scale-[1.02]">
                طلب جمع النفايات
              </button>
            </form>
          </div>

          {/* AI Smart Insight Card */}
          <div className="bg-[#151b28] rounded-[32px] p-8 text-white relative overflow-hidden group border border-slate-800 shadow-xl">
            <div className="relative z-10">
              <div className="flex items-center justify-end gap-3 mb-6">
                <h3 className="font-black text-right">مساعد إمداد الذكي</h3>
                <div className="w-10 h-10 bg-[#f6c744]/20 rounded-xl flex items-center justify-center text-[#f6c744] shadow-inner">
                  <i className="fa-solid fa-sparkles animate-pulse"></i>
                </div>
              </div>
              <div className="min-h-[140px] flex items-center text-right">
                 {loadingTips ? (
                    <div className="space-y-3 w-full">
                      <div className="h-3 bg-white/5 rounded w-full animate-pulse ml-auto"></div>
                      <div className="h-3 bg-white/5 rounded w-5/6 animate-pulse ml-auto"></div>
                      <div className="h-3 bg-white/5 rounded w-4/6 animate-pulse ml-auto"></div>
                    </div>
                 ) : (
                    <p className="text-sm leading-relaxed text-slate-300 font-medium italic">
                      "{tips}"
                    </p>
                 )}
              </div>
              <button onClick={fetchTips} className="mt-6 flex items-center gap-2 text-xs font-black text-[#f6c744] hover:underline ml-auto">
                 تحديث النصائح البيئية <i className="fa-solid fa-rotate"></i>
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#1fa98c]/10 rounded-full blur-[50px]"></div>
          </div>
        </div>

        {/* Analytics & Operations */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Operations Tracking */}
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-[#f8fafc]">
               <button className="text-[10px] font-black text-slate-400 bg-white border border-gray-200 px-4 py-2 rounded-full hover:bg-slate-50 transition-all">متابعة التفاصيل</button>
               <h2 className="text-xl font-black flex items-center gap-3">
                متابعة عمليات الجمع الحالية
                <span className="w-10 h-10 bg-white shadow-sm text-[#1fa98c] rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-map-location-dot"></i>
                </span>
              </h2>
            </div>
            <div className="p-8 space-y-6">
              {MOCK_ACTIVE_OPERATIONS.map(op => (
                <div key={op.id} className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border-2 border-slate-50 rounded-3xl hover:border-[#1fa98c]/20 transition-all">
                  <div className="flex items-center gap-3 order-3 md:order-1">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${
                      op.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600 animate-pulse'
                    }`}>
                      {op.status === 'COMPLETED' ? 'تم الاستلام' : 'في الطريق'}
                    </span>
                  </div>
                  <div className="flex-1 text-center md:text-right order-2">
                    <h4 className="font-black text-slate-800 mb-1">{op.companyName}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{op.wasteType} • {op.quantity} كجم • {op.date}</p>
                  </div>
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#1fa98c] order-1 md:order-3">
                    <i className={`fa-solid ${op.status === 'COMPLETED' ? 'fa-check-circle' : 'fa-truck-fast'}`}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Chart */}
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-10">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-2 items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">كمية التدوير (كجم)</span>
                    <span className="w-3 h-3 bg-[#1fa98c] rounded-full"></span>
                  </div>
                </div>
                <h2 className="text-xl font-black flex items-center gap-3">
                  مؤشر الأداء البيئي والتقارير
                  <span className="w-10 h-10 bg-[#eaf7f3] text-[#1fa98c] rounded-xl flex items-center justify-center">
                    <i className="fa-solid fa-chart-line"></i>
                  </span>
                </h2>
             </div>
             <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_ANALYTICS} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: '800'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: '800'}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: '800', fontFamily: 'Cairo'}}
                  />
                  <Bar dataKey="quantity" fill="#1fa98c" radius={[12, 12, 0, 0]} barSize={45}>
                    {MOCK_ANALYTICS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 3 ? '#158a72' : '#1fa98c'} className="hover:opacity-80 transition-opacity" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-center">
               <button className="flex items-center gap-3 text-xs font-black text-[#1fa98c] hover:underline">
                  تحميل تقرير الاستدامة الشهري (PDF) <i className="fa-solid fa-file-pdf"></i>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionView;
