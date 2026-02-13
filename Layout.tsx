
import React from 'react';
import { User } from '../types';

interface LayoutProps {
  user: User;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onBack: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, currentScreen, onNavigate, onBack, onLogout, children }) => {
  const isHomeScreen = currentScreen === 'client_dashboard' || currentScreen === 'expert_dashboard';

  return (
    <div className="flex flex-col min-h-screen bg-royal-silk">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-royal-darkMaroon text-white px-5 py-4 flex items-center justify-between shadow-xl border-b border-royal-gold/20">
        <div className="flex items-center gap-3">
          {!isHomeScreen && (
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-royal-gold hover:bg-white/10 rounded-full transition-all">
              <i className="fa-solid fa-arrow-right text-xl"></i>
            </button>
          )}
          <div className="relative">
            <div className="w-11 h-11 rounded-full border-2 border-royal-gold p-0.5 overflow-hidden bg-white shadow-inner">
              <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=D4AF37&color=fff`} alt="Profile" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-royal-darkMaroon rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-black truncate max-w-[120px]">{user.name}</h2>
            <span className="text-[10px] text-royal-gold font-bold uppercase tracking-widest">{user.role === 'client' ? 'عميل ملكي' : 'خبير معتمد'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button onClick={() => onNavigate('wallet')} className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 active:scale-95 transition-all">
             <i className="fa-solid fa-crown text-royal-gold text-xs"></i>
             <span className="text-xs font-bold">{user.walletBalance.toLocaleString()}</span>
           </button>
           <button onClick={onLogout} className="text-white/40 hover:text-royal-gold transition-colors">
              <i className="fa-solid fa-power-off text-lg"></i>
           </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-28">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass border-t border-royal-gold/10 px-8 py-4 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-[2.5rem] z-50">
        <NavItem 
          active={currentScreen === 'client_dashboard' || currentScreen === 'expert_dashboard'} 
          onClick={() => onNavigate(user.role === 'client' ? 'client_dashboard' : 'expert_dashboard')}
          icon="fa-house-user"
          label="الرئيسية"
        />
        <NavItem 
          active={currentScreen === 'requests'} 
          onClick={() => onNavigate('requests')}
          icon="fa-receipt"
          label="الطلبات"
        />
        
        <div className="relative -top-10">
            <button 
                onClick={() => onNavigate('wallet')}
                className="w-16 h-16 gold-gradient text-royal-maroon rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.4)] border-4 border-white active:scale-90 transition-transform"
            >
                <i className="fa-solid fa-wallet text-2xl"></i>
            </button>
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-bold text-royal-maroon whitespace-nowrap">المحفظة</div>
        </div>

        <NavItem 
          active={currentScreen === 'wallet'} 
          onClick={() => onNavigate('wallet')}
          icon="fa-gem"
          label="النقاط"
        />
        <NavItem 
          active={currentScreen === 'settings'} 
          onClick={() => {}}
          icon="fa-fingerprint"
          label="الأمان"
        />
      </nav>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: string; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all group ${active ? 'text-royal-maroon' : 'text-gray-300'}`}>
    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-royal-maroon/5' : ''}`}>
      <i className={`fa-solid ${icon} text-lg ${active ? 'scale-110' : 'group-hover:scale-110'}`}></i>
    </div>
    <span className={`text-[9px] font-black uppercase tracking-tighter ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
  </button>
);

export default Layout;
