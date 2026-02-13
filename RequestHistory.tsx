
import React from 'react';
import { ServiceRequest } from '../types';

interface RequestHistoryProps {
  requests: ServiceRequest[];
  onBack: () => void;
}

const RequestHistory: React.FC<RequestHistoryProps> = ({ requests, onBack }) => {
  return (
    <div className="p-8 animate-in fade-in duration-500 bg-royal-silk min-h-full">
      <div className="flex items-center gap-6 mb-12">
        <button onClick={onBack} className="text-royal-maroon w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all border border-royal-gold/10">
            <i className="fa-solid fa-arrow-right text-xl"></i>
        </button>
        <div>
          <h1 className="text-3xl font-black text-royal-darkMaroon">الطلبات الحصرية</h1>
          <p className="text-royal-gold text-[9px] font-black tracking-[0.3em] uppercase">Service Ledger</p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 opacity-20 text-center">
            <div className="w-24 h-24 bg-royal-stone rounded-full flex items-center justify-center mb-6">
              <i className="fa-solid fa-file-invoice text-6xl"></i>
            </div>
            <p className="font-black text-xl uppercase tracking-widest">سجل الطلبات فارغ</p>
        </div>
      ) : (
        <div className="space-y-6">
            {requests.map(req => (
                <div key={req.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-royal-gold/10 flex flex-col gap-5 relative overflow-hidden group hover:shadow-2xl transition-all">
                    <div className="absolute top-0 left-0 w-2 h-full gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-center justify-between border-b-2 border-royal-silk pb-5">
                        <div className="space-y-1">
                            <div className="text-[10px] text-gray-300 font-black uppercase tracking-widest">Ref: {req.id.split('-')[1].toUpperCase()}</div>
                            <h4 className="font-black text-royal-darkMaroon text-lg leading-tight">{req.serviceName}</h4>
                        </div>
                        <StatusBadge status={req.status} />
                    </div>
                    
                    <div className="flex justify-between items-center px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-royal-silk rounded-xl flex items-center justify-center text-royal-gold shadow-inner">
                              <i className="fa-solid fa-user-shield"></i>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Expert</span>
                              <span className="text-royal-maroon font-black text-sm">{req.expertName}</span>
                            </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none block mb-1">Investment</span>
                          <div className="text-royal-darkMaroon font-black text-xl leading-none">{req.price.toLocaleString()} <span className="text-[10px] text-royal-gold">SDG</span></div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] bg-royal-silk/50 p-4 rounded-2xl border border-royal-gold/5">
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-calendar-day text-royal-gold"></i>
                            {req.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-clock text-royal-gold"></i>
                            {req.time}
                        </div>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button className="flex-[2] py-4 text-[10px] font-black uppercase tracking-[0.2em] gold-gradient text-royal-maroon rounded-2xl shadow-xl active:scale-95 transition-all">التفاصيل</button>
                        <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] bg-royal-silk text-gray-400 rounded-2xl border border-royal-gold/10">إلغاء</button>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    let color = 'bg-gray-50 text-gray-400 border-gray-100';
    let label = 'مراجعة';

    if (status === 'accepted') { color = 'bg-blue-50 text-blue-500 border-blue-100'; label = 'مقبول'; }
    if (status === 'completed') { color = 'bg-green-50 text-green-500 border-green-100'; label = 'مكتمل'; }
    if (status === 'cancelled') { color = 'bg-red-50 text-red-500 border-red-100'; label = 'ملغي'; }

    return (
        <span className={`${color} text-[10px] font-black px-4 py-2 rounded-xl border-2 uppercase tracking-widest`}>{label}</span>
    );
};

export default RequestHistory;
