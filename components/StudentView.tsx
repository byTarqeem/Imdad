
import React, { useState } from 'react';
import { MOCK_REWARDS, MOCK_STUDENT_ACTIVITIES, MOCK_NOTIFICATIONS } from '../constants';

const StudentView: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 relative">
      {/* Alert Banner for Urgent Notifications (e.g. Points Expiring) */}
      {MOCK_NOTIFICATIONS.find(n => n.type === 'EXPIRY' && !n.isRead) && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center justify-between text-right animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center animate-pulse">
              <i className="fa-solid fa-clock"></i>
            </div>
            <div>
              <p className="text-sm font-black text-red-800">تنبيه هام: نقاطك ستنتهي قريباً!</p>
              <p className="text-xs text-red-600 font-bold">لديك نقاط ستنتهي صلاحيتها خلال 48 ساعة. استبدلها الآن.</p>
            </div>
          </div>
          <button className="text-xs font-black text-red-800 underline underline-offset-4">استبدل الآن</button>
        </div>
      )}

      {/* Welcome Hero for Students */}
      <div className="relative imdad-gradient rounded-[40px] p-8 md:p-14 text-white overflow-hidden shadow-2xl">
        {/* Notification Bell */}
        <div className="absolute top-8 left-8 z-20">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all group"
          >
            <i className="fa-solid fa-bell text-xl"></i>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full text-[10px] font-black flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-16 left-0 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 text-right">
              <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <button className="text-[10px] font-black text-[#1fa98c]">تحديد الكل كمقروء</button>
                <h4 className="font-black text-slate-800 text-sm">التنبيهات</h4>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {MOCK_NOTIFICATIONS.map(n => (
                  <div key={n.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!n.isRead ? 'bg-[#eaf7f3]/30' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{n.date}</span>
                      <h5 className={`text-xs font-black ${n.type === 'EXPIRY' ? 'text-red-600' : 'text-slate-800'}`}>{n.title}</h5>
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 text-xs font-black text-slate-400 bg-white hover:bg-gray-50 transition-all">مشاهدة جميع التنبيهات</button>
            </div>
          )}
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="text-right">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#f6c744] text-slate-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">مستوى: حامي البيئة</span>
              <span className="text-white/80 text-sm font-bold">• 150 كجم تم تدويرها</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">مرحباً، <span className="text-[#f6c744]">أحمد البلوشي</span> 👋</h1>
            <p className="text-white/90 text-xl font-medium max-w-xl leading-relaxed">بمساهماتك المستمرة، ساعدت في توفير ما يعادل <span className="text-[#f6c744] font-black">12 شجرة</span> من الانبعاثات الكربونية.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[40px] text-center shadow-2xl min-w-[200px]">
              <p className="text-6xl font-black text-[#f6c744] mb-2 tracking-tighter">840</p>
              <p className="text-xs text-white/70 font-black uppercase tracking-[0.2em]">إجمالي النقاط</p>
            </div>
            <div className="hidden lg:block">
               <div className="w-32 h-32 bg-[#f6c744] rounded-full flex items-center justify-center shadow-2xl border-8 border-white/10 group cursor-pointer hover:rotate-12 transition-transform">
                  <i className="fa-solid fa-medal text-5xl text-slate-900 group-hover:scale-110 transition-transform"></i>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#f6c744]/30"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content: Rewards Market */}
        <div className="lg:col-span-8 space-y-8">
          {/* Personalized Section for Upcoming Events */}
          <div className="bg-[#eaf7f3] p-8 rounded-[40px] border border-[#1fa98c]/10 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="text-right">
                <h3 className="text-xl font-black text-slate-800 mb-2">فعالية قادمة: حملة "جامعة خضراء" 🌳</h3>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">شاركنا يوم الأحد القادم في فرز النفايات الإلكترونية واحصل على 200 نقطة إضافية!</p>
             </div>
             <button className="bg-[#1fa98c] text-white px-8 py-3 rounded-2xl font-black text-sm shadow-lg hover:shadow-emerald-900/10 transition-all">سجّل اهتمامك</button>
          </div>

          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
              <h2 className="text-3xl font-black flex items-center gap-4">
                <span className="w-12 h-12 bg-[#eaf7f3] text-[#1fa98c] rounded-2xl flex items-center justify-center shadow-sm">
                  <i className="fa-solid fa-gift"></i>
                </span>
                سوق المكافآت
              </h2>
              <div className="flex bg-gray-50 p-1.5 rounded-2xl">
                {['الكل', 'طعام', 'تقنية', 'دراسة'].map((cat, i) => (
                  <button key={i} className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${i === 0 ? 'bg-white shadow-sm text-[#1fa98c]' : 'text-slate-400 hover:text-slate-600'}`}>{cat}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {MOCK_REWARDS.map(reward => (
                <div key={reward.id} className="bg-white border border-gray-100 rounded-[32px] overflow-hidden group hover:border-[#1fa98c] transition-all hover:shadow-2xl hover:shadow-emerald-900/5 flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={reward.image} alt={reward.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-[#1fa98c] uppercase tracking-widest shadow-sm">
                      {reward.category}
                    </div>
                  </div>
                  <div className="p-8 flex-grow">
                    <h3 className="font-black text-xl text-slate-800 mb-2 group-hover:text-[#1fa98c] transition-colors text-right">{reward.title}</h3>
                    <p className="text-xs text-slate-400 font-bold mb-6 flex items-center justify-end gap-2">
                      {reward.provider} <i className="fa-solid fa-store opacity-40"></i>
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <button className="bg-[#1fa98c] text-white px-8 py-3.5 rounded-2xl text-sm font-black hover:bg-[#158a72] shadow-lg hover:shadow-[#1fa98c]/30 transition-all active:scale-95">استبدال</button>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-slate-800">{reward.cost}</span>
                        <div className="w-10 h-10 bg-[#fff3cd] rounded-full flex items-center justify-center">
                          <i className="fa-solid fa-coins text-[#e0a200]"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Activity & Scanner */}
        <div className="lg:col-span-4 space-y-8">
          {/* QR Scanner Card */}
          <div className="bg-[#151b28] rounded-[40px] p-10 text-white text-center border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl mx-auto mb-8 flex items-center justify-center group-hover:bg-[#1fa98c]/20 group-hover:border-[#1fa98c]/30 transition-all duration-500">
                <i className="fa-solid fa-qrcode text-5xl text-[#f6c744] group-hover:scale-110 transition-transform"></i>
              </div>
              <h3 className="text-2xl font-black mb-4">مسح رمز التحقق</h3>
              <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">امسح الرمز الموجود في محطة التدوير أو سلة المهملات الذكية لإضافة النقاط فوراً.</p>
              <button className="w-full bg-[#f6c744] text-slate-900 font-black py-5 rounded-3xl hover:bg-[#e0a200] shadow-xl hover:shadow-[#f6c744]/20 transition-all active:scale-95">فتح الكاميرا للبدء</button>
            </div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#1fa98c]/10 rounded-full blur-[80px]"></div>
          </div>

          {/* Activity Log */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-10">
              <i className="fa-solid fa-history text-slate-300"></i>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">آخر النشاطات</h3>
            </div>
            <div className="space-y-10">
              {MOCK_STUDENT_ACTIVITIES.map(activity => (
                <div key={activity.id} className="flex gap-6 items-start relative pb-4 border-r-2 border-dashed border-gray-100 pr-8 last:border-0 last:pb-0">
                  <div className="absolute -right-[9px] top-0 w-4 h-4 bg-[#1fa98c] rounded-full border-4 border-white shadow-md group-hover:scale-125 transition-transform"></div>
                  <div className="flex-1 text-right">
                    <p className="text-[15px] font-black text-slate-800 leading-tight mb-2">{activity.action}</p>
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-black text-[#1fa98c] bg-[#eaf7f3] px-3 py-1 rounded-full">+{activity.points}</span>
                       <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{activity.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-12 py-4 bg-gray-50 text-slate-600 font-black text-xs rounded-2xl hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">مشاهدة السجل الكامل</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
