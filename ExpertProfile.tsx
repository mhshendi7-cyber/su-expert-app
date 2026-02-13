
import React, { useState, useEffect, useRef } from 'react';
import { Expert } from '../types';

interface ExpertProfileProps {
  expert: Expert;
  onBack: () => void;
  onRequest: (expert: Expert, serviceName: string, price: number) => void;
}

const ExpertProfile: React.FC<ExpertProfileProps> = ({ expert, onBack, onRequest }) => {
  const [activeTab, setActiveTab] = useState<'services' | 'gallery' | 'about'>('services');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (activeTab === 'about' && mapContainerRef.current && !mapInstanceRef.current) {
      setTimeout(() => {
        const L = (window as any).L;
        if (!L) return;
        const map = L.map(mapContainerRef.current).setView([expert.location.lat, expert.location.lng], 15);
        mapInstanceRef.current = map;
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);
        const customIcon = L.divIcon({
          className: 'royal-marker',
          html: '<i class="fa-solid fa-location-dot"></i>',
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
        L.marker([expert.location.lat, expert.location.lng], { icon: customIcon }).addTo(map);
      }, 300);
    }
    return () => { if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; } };
  }, [activeTab, expert]);

  return (
    <div className="bg-royal-silk min-h-screen">
      <div className="relative h-80 w-full overflow-hidden">
        <img src={expert.gallery[0]} alt="Header" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-darkMaroon via-royal-maroon/20 to-transparent"></div>
        
        <button onClick={onBack} className="absolute top-8 right-6 w-12 h-12 glass text-royal-maroon rounded-full flex items-center justify-center border border-white/40 shadow-xl z-20 active:scale-90 transition-all">
            <i className="fa-solid fa-chevron-right text-lg"></i>
        </button>

        <div className="absolute bottom-10 right-8 flex items-end gap-6 z-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-[2.5rem] border-[5px] border-white/90 overflow-hidden shadow-2xl bg-white">
                  <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-3 -left-3 w-10 h-10 gold-gradient rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <i className="fa-solid fa-crown text-royal-maroon text-sm"></i>
              </div>
            </div>
            <div className="mb-2">
                <h1 className="text-3xl font-black text-white mb-2 tracking-tight">{expert.name}</h1>
                <div className="flex items-center gap-3">
                    <div className="bg-royal-gold text-royal-maroon text-[10px] px-3 py-1 rounded-lg flex items-center gap-2 font-black shadow-lg">
                        <i className="fa-solid fa-star"></i> {expert.rating}
                    </div>
                    <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">{expert.reviewCount} REVIEWS</span>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white mx-8 -mt-6 rounded-[2rem] shadow-2xl relative z-10 p-6 flex justify-around border border-royal-gold/10">
        <StatItem label="الخبرة" value="10+ سنوات" />
        <div className="w-px h-10 bg-gray-100"></div>
        <StatItem label="النوع" value={expert.gender === 'male' ? 'خبير' : 'خبيرة'} />
        <div className="w-px h-10 bg-gray-100"></div>
        <StatItem label="التقييم" value="استثنائي" />
      </div>

      <div className="flex px-8 mt-10 gap-8 border-b border-royal-gold/10">
        <TabButton active={activeTab === 'services'} label="الخدمات" onClick={() => setActiveTab('services')} />
        <TabButton active={activeTab === 'gallery'} label="الأعمال" onClick={() => setActiveTab('gallery')} />
        <TabButton active={activeTab === 'about'} label="التفاصيل" onClick={() => setActiveTab('about')} />
      </div>

      <div className="p-8">
        {activeTab === 'services' && (
            <div className="space-y-5 animate-in slide-in-from-right duration-500">
                {expert.services.map(service => (
                    <div key={service.id} className="bg-white p-5 rounded-3xl shadow-sm border border-royal-gold/5 flex items-center justify-between group hover:shadow-xl transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-royal-silk flex items-center justify-center text-royal-gold">
                                <i className="fa-solid fa-check-double text-sm"></i>
                            </div>
                            <div>
                                <h4 className="font-black text-royal-maroon text-base mb-1">{service.name}</h4>
                                <div className="text-xs text-royal-gold font-black tracking-wider uppercase">{service.price.toLocaleString()} SDG</div>
                            </div>
                        </div>
                        <button 
                            onClick={() => onRequest(expert, service.name, service.price)}
                            className="bg-royal-maroon text-royal-gold text-[10px] font-black px-6 py-3 rounded-2xl shadow-lg active:scale-90 transition-all uppercase tracking-widest"
                        >
                            طلب الخدمة
                        </button>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'gallery' && (
            <div className="grid grid-cols-2 gap-4 animate-in zoom-in duration-500">
                {expert.gallery.map((img, i) => (
                    <div key={i} className="aspect-square rounded-[2rem] overflow-hidden shadow-lg border-4 border-white transform hover:scale-105 transition-transform">
                        <img src={img} alt="Work" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'about' && (
            <div className="space-y-8 animate-in slide-in-from-left duration-500">
                <div className="bg-white p-6 rounded-[2rem] border border-royal-gold/5 shadow-sm">
                    <h4 className="font-black text-royal-maroon mb-3 text-sm uppercase tracking-widest">BIO / السيرة الذاتية</h4>
                    <p className="text-sm text-gray-500 leading-loose italic">"{expert.bio}"</p>
                </div>
                
                <div className="bg-white p-6 rounded-[2rem] border border-royal-gold/5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-black text-royal-maroon text-sm uppercase tracking-widest">LOCATION / الموقع</h4>
                      <span className="text-[10px] text-royal-gold font-bold">{expert.location.address}</span>
                    </div>
                    <div ref={mapContainerRef} className="h-56 bg-royal-silk rounded-2xl overflow-hidden relative border-2 border-royal-gold/10 z-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <i className="fa-solid fa-spinner animate-spin text-royal-gold text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="text-center">
      <div className="text-xs font-black text-royal-maroon mb-1 tracking-tighter">{value}</div>
      <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{label}</div>
  </div>
);

const TabButton: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({ active, label, onClick }) => (
    <button onClick={onClick} className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${active ? 'text-royal-maroon' : 'text-gray-300'}`}>
        {label}
        {active && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-royal-gold rounded-full"></div>}
    </button>
);

export default ExpertProfile;
