
import React, { useState } from 'react';
import { UserRole } from '../types.ts';
import OnboardingModal from './OnboardingModal.tsx';
import StudentRegistrationFlow from './StudentRegistrationFlow.tsx';
import InstitutionRegistrationFlow from './InstitutionRegistrationFlow.tsx';
import CompanyRegistrationFlow from './CompanyRegistrationFlow.tsx';

interface LandingPageProps {
  setRole: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setRole }) => {
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const [showStudentFlow, setShowStudentFlow] = useState(false);
  const [showInstitutionFlow, setShowInstitutionFlow] = useState(false);
  const [showCompanyFlow, setShowCompanyFlow] = useState(false);

  const scrollToAccounts = () => {
    document.getElementById('account-types')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStart = (role: UserRole) => {
    if (role === 'STUDENT') {
      setShowStudentFlow(true);
    } else {
      setPendingRole(role);
    }
  };

  return (
    <div className="bg-[#f9fbfa]">
      {pendingRole && (
        <OnboardingModal 
          role={pendingRole} 
          onClose={() => setPendingRole(null)} 
          onConfirm={() => {
            if (pendingRole === 'INSTITUTION') {
              setShowInstitutionFlow(true);
            } else if (pendingRole === 'RECYCLING_COMPANY') {
              setShowCompanyFlow(true);
            } else {
              setRole(pendingRole);
            }
            setPendingRole(null);
          }} 
        />
      )}

      {showStudentFlow && (
        <StudentRegistrationFlow 
          onClose={() => setShowStudentFlow(false)} 
          onComplete={() => {
            setRole('STUDENT');
            setShowStudentFlow(false);
          }} 
        />
      )}

      {showInstitutionFlow && (
        <InstitutionRegistrationFlow 
          onClose={() => setShowInstitutionFlow(false)} 
          onComplete={() => {
            setRole('INSTITUTION');
            setShowInstitutionFlow(false);
          }} 
        />
      )}

      {showCompanyFlow && (
        <CompanyRegistrationFlow 
          onClose={() => setShowCompanyFlow(false)} 
          onComplete={() => {
            setRole('RECYCLING_COMPANY');
            setShowCompanyFlow(false);
          }} 
        />
      )}

      {/* Hero Section */}
      <section className="imdad-gradient pt-24 pb-48 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full border border-white/20 mb-8 backdrop-blur-md">
            <i className="fa-solid fa-recycle text-[#f6c744] animate-spin-slow" style={{ animationDuration: '8s' }}></i>
            <span className="font-black text-sm uppercase tracking-widest">إمداد</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.15] mb-8">
            حوّل النفايات إلى <br/> <span className="text-[#f6c744]">ثروة مستدامة</span>
          </h1>
          <p className="text-lg md:text-2xl opacity-90 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
            الوسيط الرقمي الأول الذي يربط المؤسسات والطلاب بشركات التدوير لضمان مستقبل أخضر وشفافية كاملة في كل شحنة.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button 
              onClick={scrollToAccounts}
              className="bg-transparent border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
            >
              اكتشف خدماتنا <i className="fa-solid fa-chevron-down text-sm animate-bounce"></i>
            </button>
            <button className="bg-white/10 border border-white/20 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-colors">
              تعرف على رؤيتنا
            </button>
          </div>
        </div>
        
        {/* Background Decorative Circles */}
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#f6c744]/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-[#f9fbfa] curve-mask"></div>
      </section>

      {/* Stats Container */}
      <section className="max-w-6xl mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: "+10K", t: "طن تم تدويره", i: "recycle", c: "yellow" },
            { n: "120+", t: "شركة تدوير", i: "truck", c: "yellow" },
            { n: "500+", t: "مؤسسة مسجلة", i: "building", c: "yellow" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] shadow-2xl shadow-emerald-900/5 text-center feature-card-hover border border-gray-50 group transition-all duration-500">
              <div className="w-16 h-16 bg-[#fff3cd] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <i className={`fa-solid fa-${stat.i} text-3xl text-[#e0a200]`}></i>
              </div>
              <h3 className="text-4xl font-black text-slate-800 mb-2 tracking-tighter">{stat.n}</h3>
              <p className="text-slate-400 font-black text-sm uppercase tracking-widest">{stat.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Account Types Section */}
      <section id="account-types" className="py-32 max-w-7xl mx-auto px-4 scroll-mt-20">
        <div className="text-center mb-20">
          <span className="bg-[#eaf7f3] text-[#1fa98c] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6 inline-block">انضم إلينا</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">اختر نوع حسابك</h2>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">سواء كنت فرداً أو مؤسسة، "إمداد" توفر لك الأدوات اللازمة للتميز البيئي.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Student Card */}
          <div className="bg-white p-12 rounded-[48px] border-2 border-gray-100 hover:border-[#3b82f6] transition-all shadow-sm group flex flex-col">
            <div className="w-16 h-16 bg-[#3b82f6] rounded-[24px] flex items-center justify-center text-white text-3xl mb-10 group-hover:rotate-6 transition-transform shadow-lg shadow-blue-100">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <h3 className="text-3xl font-black mb-4">حساب طالب</h3>
            <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed text-right">ساهم في تدوير نفاياتك الشخصية في الحرم الجامعي، اجمع النقاط واستبدلها بمكافآت حصرية.</p>
            <ul className="space-y-4 mb-12 flex-grow text-right">
              {["اجمع نقاط مقابل كل كجم", "استبدل النقاط بقهوة وكوبونات", "شارك في تحديات الكليات"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-sm font-bold text-slate-700">
                  <i className="fa-solid fa-circle-check text-[#3b82f6]"></i> {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleStart('STUDENT')}
              className="w-full bg-[#3b82f6] text-white font-black py-5 rounded-3xl shadow-xl hover:shadow-blue-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              ابدأ كطالب <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>

          {/* Institution Card */}
          <div className="bg-white p-12 rounded-[48px] border-2 border-gray-100 hover:border-[#1fa98c] transition-all shadow-sm group flex flex-col scale-105 shadow-2xl shadow-emerald-900/10 z-10 relative">
            <div className="w-16 h-16 bg-[#1fa98c] rounded-[24px] flex items-center justify-center text-white text-3xl mb-10 group-hover:rotate-6 transition-transform shadow-lg shadow-emerald-100">
              <i className="fa-solid fa-building"></i>
            </div>
            <h3 className="text-3xl font-black mb-4">مؤسسة تعليمية</h3>
            <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed text-right">إدارة شاملة لنفايات المؤسسة، توثيق العقود الرقمية، والحصول على تقارير الأثر البيئي الموثقة.</p>
            <ul className="space-y-4 mb-12 flex-grow text-right">
              {["إدارة طلبات الجمع بضغطة زر", "مقارنة عروض الشركات", "تقارير الاستدامة ESG الموثقة"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-sm font-bold text-slate-700">
                  <i className="fa-solid fa-circle-check text-[#1fa98c]"></i> {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleStart('INSTITUTION')}
              className="w-full bg-[#1fa98c] text-white font-black py-5 rounded-3xl shadow-xl hover:shadow-emerald-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              ابدأ كمؤسسة <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>

          {/* Recycle Company Card */}
          <div className="bg-white p-12 rounded-[48px] border-2 border-gray-100 hover:border-[#f6c744] transition-all shadow-sm group flex flex-col">
            <div className="w-16 h-16 bg-[#f6c744] rounded-[24px] flex items-center justify-center text-slate-900 text-3xl mb-10 group-hover:rotate-6 transition-transform shadow-lg shadow-yellow-100">
              <i className="fa-solid fa-truck"></i>
            </div>
            <h3 className="text-3xl font-black mb-4">شركة تدوير</h3>
            <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed text-right">الوصول لسوق النفايات المفتوح، تقديم عروض الأسعار، وتوسيع نطاق أعمالك في القطاع المؤسسي.</p>
            <ul className="space-y-4 mb-12 flex-grow text-right">
              {["سوق شحنات مفتوح ومباشر", "تتبع حي ودقيق للشاحنات", "إدارة العقود والمدفوعات رقمياً"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-sm font-bold text-slate-700">
                  <i className="fa-solid fa-circle-check text-[#f6c744]"></i> {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleStart('RECYCLING_COMPANY')}
              className="w-full bg-[#f6c744] text-slate-900 font-black py-5 rounded-3xl shadow-xl hover:shadow-yellow-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              ابدأ كشركة تدوير <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Steps Timeline Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="bg-[#fff3cd] text-[#9a6b00] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 inline-block">رحلة الاستدامة</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8">6 خطوات نحو التغيير</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium mb-20 text-xl">صممنا "إمداد" لتكون رحلة سهلة وشفافة تضمن حقوق الجميع وتخدم البيئة.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
            {[
              { t: "سجّل الآن", d: "أنشئ حسابك وأكمل بيانات التحقق", i: "user-plus" },
              { t: "أضف شحنة", d: "حدد نوع النفايات والكمية والموعد", i: "box-open" },
              { t: "قارن العروض", d: "اختر أفضل عرض من شركات التدوير", i: "scale-balanced" },
              { t: "تتبع المسار", d: "راقب الشاحنة حتى وصولها للموقع", i: "map-location-dot" },
              { t: "تأكيد QR", d: "امسح الرمز لضمان دقة الاستلام", i: "qrcode" },
              { t: "تقرير الأثر", d: "استلم شهادة التدوير الموثقة", i: "file-shield" },
            ].map((s, i) => (
              <div key={i} className="group relative">
                <div className="w-24 h-24 bg-white border-2 border-gray-100 rounded-[32px] flex items-center justify-center mx-auto mb-8 text-3xl text-[#1fa98c] relative group-hover:border-[#1fa98c] group-hover:bg-[#eaf7f3] transition-all duration-500 group-hover:scale-110 shadow-sm group-hover:shadow-xl group-hover:shadow-emerald-900/5">
                  <i className={`fa-solid fa-${s.i}`}></i>
                  <span className="absolute -top-3 -right-3 w-9 h-9 bg-[#f6c744] text-slate-900 rounded-full text-sm font-black flex items-center justify-center shadow-lg border-4 border-white">{i+1}</span>
                </div>
                <h4 className="font-black text-slate-800 mb-3 text-lg leading-tight">{s.t}</h4>
                <p className="text-slate-400 text-xs font-bold leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
