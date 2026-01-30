
import React from 'react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, setRole }) => {
  const getRoleLabel = () => {
    switch (role) {
      case 'INSTITUTION': return 'بوابة المؤسسات';
      case 'RECYCLING_COMPANY': return 'بوابة الشركات';
      case 'STUDENT': return 'لوحة الطلاب';
      default: return '';
    }
  };

  const handleLoginClick = () => {
    if (role === 'GUEST') {
      const element = document.getElementById('account-types');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-nav sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setRole('GUEST')}>
              <div className="w-10 h-10 bg-[#1fa98c] rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <i className="fa-solid fa-recycle text-white text-xl"></i>
              </div>
              <span className="text-2xl font-black text-slate-800 tracking-tight">إمداد</span>
            </div>

            <nav className="hidden lg:flex items-center space-x-reverse space-x-8 text-slate-600 font-bold text-sm">
              <button onClick={() => setRole('GUEST')} className="hover:text-[#1fa98c] transition">الرئيسية</button>
              <button className="hover:text-[#1fa98c] transition">كيف نعمل</button>
              <button className="hover:text-[#1fa98c] transition">سوق المكافآت</button>
              <button className="hover:text-[#1fa98c] transition">تواصل معنا</button>
            </nav>

            <div className="flex items-center gap-4">
              {role === 'GUEST' ? (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleLoginClick}
                    className="text-slate-500 font-bold text-sm hover:text-[#1fa98c] transition"
                  >
                    تسجيل الدخول
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">مرحباً بك</p>
                    <p className="text-sm font-black text-slate-700">
                      {getRoleLabel()}
                    </p>
                  </div>
                  <button 
                    onClick={() => setRole('GUEST')}
                    className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2.5 rounded-xl transition group shadow-sm"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#0f172a] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-right">
            <div>
              <h3 className="text-xl font-black mb-6 text-[#f6c744]">إمداد</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                منصة ذكية تربط المؤسسات التعليمية والطلاب بشركات التدوير لتحويل النفايات إلى قيمة مستدامة.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-[#1fa98c]">روابط سريعة</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">عن المنصة</a></li>
                <li><a href="#" className="hover:text-white transition">كيف نعمل</a></li>
                <li><a href="#" className="hover:text-white transition">سوق المكافآت</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-[#1fa98c]">تواصل معنا</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><i className="fa-solid fa-envelope ml-2"></i> info@imdad.om</li>
                <li><i className="fa-solid fa-phone ml-2"></i> +968 244 0000</li>
                <li><i className="fa-solid fa-location-dot ml-2"></i> مسقط، سلطنة عمان</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-[#1fa98c]">تابعنا</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#1fa98c] transition"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#1fa98c] transition"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#1fa98c] transition"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm font-bold">
            &copy; {new Date().getFullYear()} إمداد. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
