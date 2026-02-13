
import React from 'react';
import { User } from '../types';

interface WalletProps {
  user: User;
  onBack: () => void;
}

const Wallet: React.FC<WalletProps> = ({ user, onBack }) => {
  return (
    <div className="p-8 bg-royal-silk min-h-full">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black text-royal-darkMaroon">المحفظة</h1>
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-royal-gold shadow-lg">
            <i className="fa-solid fa-crown text-xl"></i>
        </div>
      </div>

      {/* Premium Glass Card */}
      <div className="relative overflow-hidden bg-royal-maroon rounded-[2.8rem] p-10 shadow-[0_25px_60px_rgba(0,0,0,0.3)] mb-10 border-[3px] border-royal-gold/30">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="grid grid-cols-4 gap-8 p-6 transform -rotate-12 scale-150">
                {Array.from({length: 16}).map((_, i) => (
                    <i key={i} className="fa-solid fa-gem text-6xl text-white"></i>
                ))}
            </div>
        </div>
        
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div className="text-royal-gold/80 text-[10px] font-black uppercase tracking-[0.3em]">Royal Balance</div>
              <div className="flex gap-1">
                <div className="w-8 h-5 bg-royal-gold/20 rounded border border-white/20"></div>
                <div className="w-8 h-5 bg-royal-gold/40 rounded border border-white/20"></div>
              </div>
            </div>

            <div className="text-white text-5xl font-black mb-14 tracking-tighter flex items-baseline gap-3">
                {user.walletBalance.toLocaleString()}
                <span className="text-sm font-bold text-royal-gold tracking-widest">SDG</span>
            </div>
            
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <div className="text-white/40 text-[9px] font-black uppercase tracking-widest">Card Holder</div>
                    <div className="text-white text-sm font-bold tracking-tight">{user.name.toUpperCase()}</div>
                </div>
                <div className="text-right">
                    <div className="text-white/40 text-[9px] font-black uppercase tracking-widest">Tier</div>
                    <div className="text-royal-gold text-xs font-black uppercase tracking-[0.2em]">Diamond Elite</div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-10">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-royal-gold/10 text-center space-y-2">
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">SU-Points</div>
            <div className="text-2xl font-black text-royal-maroon">{user.suPoints}</div>
            <div className="text-[8px] text-royal-gold font-bold">نقاط التميز</div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-royal-gold/10 text-center space-y-2">
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Rank</div>
            <div className="text-2xl font-black text-royal-maroon">#12</div>
            <div className="text-[8px] text-royal-gold font-bold">الترتيب المحلى</div>
          </div>
      </div>

      <div className="space-y-4">
        <button className="w-full bg-royal-maroon text-royal-gold font-black py-5 rounded-[1.5rem] shadow-xl flex items-center justify-center gap-4 active:scale-95 transition-all uppercase tracking-[0.2em] text-xs">
            <i className="fa-solid fa-money-bill-transfer"></i>
            شحن الرصيد الفوري
        </button>
        <button className="w-full bg-white text-royal-maroon font-black py-5 rounded-[1.5rem] border-2 border-royal-gold/20 flex items-center justify-center gap-4 active:scale-95 transition-all uppercase tracking-[0.2em] text-xs">
            <i className="fa-solid fa-clock-rotate-left text-royal-gold"></i>
            تاريخ المعاملات
        </button>
      </div>

      <div className="mt-16 text-center">
        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.5em] mb-4">Secured by Royal Protocol</p>
        <div className="flex justify-center gap-6 opacity-30">
          <i className="fa-brands fa-cc-visa text-2xl"></i>
          <i className="fa-brands fa-cc-mastercard text-2xl"></i>
          <i className="fa-brands fa-cc-apple-pay text-2xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
