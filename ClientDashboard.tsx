
import React, { useState, useEffect, useRef } from 'react';
import { User, Expert } from '../types';
import { MOCK_EXPERTS } from '../constants';

interface ClientDashboardProps {
  user: User;
  onExpertSelect: (expert: Expert) => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, onExpertSelect }) => {
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  
  const filteredByGender = MOCK_EXPERTS.filter(expert => expert.gender === user.gender);
  
  const filteredExperts = activeCategory === 'الكل' 
    ? filteredByGender 
    : filteredByGender.filter(e => e.skills.some(s => s.includes(activeCategory)));

  useEffect(() => {
    if (viewMode === 'map' && mapRef.current && !mapInstance.current) {
      const L = (window as any).L;
      if (!L) return;

      const map = L.map(mapRef.current).setView([15.5007, 32.5599], 13);
      mapInstance.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);

      filteredExperts.forEach(expert => {
        const customIcon = L.divIcon({
          className: 'royal-marker',
          html: `<i class="fa-solid fa-crown text-[10px]"></i>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36]
        });

        const marker = L.marker([expert.location.lat, expert.location.lng], { icon: customIcon }).addTo(map);
        marker.on('click', () => onExpertSelect(expert));
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [viewMode, filteredExperts, onExpertSelect]);

  return (
    <div className="p-6 bg-royal-silk min-h-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-royal-darkMaroon leading-tight">نخبة الخبراء</h1>
          <p className="text-royal-gold text-[10px] font-black tracking-[0.4em] uppercase mt-1">Exclusive Selection</p>
        </div>
        <button 
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          className="w-14 h-14 bg-white rounded-[1.5rem] shadow-xl flex items-center justify-center text-royal-maroon border-2 border-royal-gold/10 active:scale-90 transition-all"
        >
          <i className={`fa-solid ${viewMode === 'list' ? 'fa-map-pin' : 'fa-list-staggered'} text-xl`}></i>
        </button>
      </div>

      {viewMode === 'list' ? (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="relative group">
            <input 
                type="text" 
                placeholder="ابحث عن خبير أو مهارة مميزة..." 
                className="w-full bg-white py-5 pr-14 pl-8 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.05)] border-2 border-transparent focus:border-royal-gold/30 focus:outline-none transition-all text-sm font-bold placeholder:text-gray-300"
            />
            <i className="fa-solid fa-magnifying-glass absolute top-1/2 -translate-y-1/2 right-6 text-royal-gold group-focus-within:scale-125 transition-transform"></i>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {['الكل', 'عناية', 'تجميل', 'مساج', 'تراث'].map((cat) => (
                <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-10 py-4 rounded-[1.5rem] text-[10px] font-black tracking-[0.2em] transition-all uppercase ${activeCategory === cat ? 'bg-royal-maroon text-royal-gold shadow-2xl scale-105' : 'bg-white text-gray-400 border border-royal-gold/10'}`}
                >
                    {cat}
                </button>
            ))}
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="h-[2px] flex-1 bg-royal-gold/20"></div>
                <h3 className="text-[10px] font-black text-royal-gold uppercase tracking-[0.4em]">Curated Excellence</h3>
                <div className="h-[2px] flex-1 bg-royal-gold/20"></div>
            </div>
            
            {filteredExperts.map(expert => (
                <ExpertCard key={expert.id} expert={expert} onClick={() => onExpertSelect(expert)} />
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-in zoom-in duration-700 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] h-[68vh] border-[6px] border-white relative z-0">
             <div ref={mapRef} className="w-full h-full"></div>
             <div className="absolute top-8 left-8 right-8 bg-royal-darkMaroon/95 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl z-[1000] border-2 border-royal-gold/20">
                <p className="text-[11px] font-black text-royal-gold text-center tracking-[0.2em] uppercase">Interactive Expert Navigation</p>
             </div>
        </div>
      )}
    </div>
  );
};

const ExpertCard: React.FC<{ expert: Expert; onClick: () => void }> = ({ expert, onClick }) => (
    <div 
        onClick={onClick}
        className="group relative bg-white rounded-[2.5rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-2 border-transparent hover:border-royal-gold/30 hover:shadow-2xl transition-all flex gap-6 cursor-pointer active:scale-[0.97]"
    >
        <div className="relative">
            <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-[3px] border-royal-silk group-hover:border-royal-gold transition-all duration-500 shadow-xl scale-100 group-hover:scale-105">
                <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 gold-gradient text-royal-maroon text-[11px] px-4 py-1.5 rounded-full font-black shadow-xl border-2 border-white flex items-center gap-2 whitespace-nowrap">
                <i className="fa-solid fa-star text-[9px]"></i> {expert.rating}
            </div>
        </div>

        <div className="flex-1 flex flex-col justify-between py-2">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h4 className="font-black text-royal-darkMaroon text-xl tracking-tight leading-none">{expert.name}</h4>
                    <div className="w-6 h-6 bg-royal-silk rounded-lg flex items-center justify-center text-royal-gold">
                      <i className="fa-solid fa-crown text-[10px]"></i>
                    </div>
                </div>
                <p className="text-[11px] text-gray-400 font-bold leading-relaxed line-clamp-2 opacity-80 italic">"{expert.bio}"</p>
                <div className="flex flex-wrap gap-2 pt-2">
                    {expert.skills.slice(0, 2).map((skill, i) => (
                        <span key={i} className="bg-royal-silk text-royal-maroon text-[9px] px-4 py-1.5 rounded-xl font-black border border-royal-gold/5 uppercase tracking-wider">{skill}</span>
                    ))}
                </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-royal-silk">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    <i className="fa-solid fa-location-arrow text-royal-gold text-sm"></i>
                    {expert.location.address.split('،')[1]}
                </div>
                <div className="text-[10px] font-black text-white bg-royal-darkMaroon px-5 py-3 rounded-2xl shadow-xl hover:bg-royal-maroon transition-all scale-100 active:scale-95">عرض العضوية</div>
            </div>
        </div>
    </div>
);

export default ClientDashboard;
