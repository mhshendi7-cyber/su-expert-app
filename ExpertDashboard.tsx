
import React, { useState, useMemo } from 'react';
import { User, ServiceRequest } from '../types';
import Swal from 'sweetalert2';

interface ExpertDashboardProps {
  user: User;
  requests: ServiceRequest[];
  setRequests: React.Dispatch<React.SetStateAction<ServiceRequest[]>>;
}

const ExpertDashboard: React.FC<ExpertDashboardProps> = ({ user, requests, setRequests }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const pendingRequests = useMemo(() => requests.filter(r => r.status === 'pending'), [requests]);

  const handleAction = (id: string, newStatus: 'accepted' | 'completed' | 'cancelled') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    const message = newStatus === 'accepted' ? 'تم القبول' : (newStatus === 'completed' ? 'تم الإكمال' : 'تم الرفض');
    Swal.fire({ title: message, icon: 'success', timer: 1200, showConfirmButton: false, toast: true, position: 'top-end' });
  };

  const toggleSelect = (id: string) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleSelectAll = () => setSelectedIds(selectedIds.length === pendingRequests.length ? [] : pendingRequests.map(r => r.id));

  const handleBulkAction = (newStatus: 'accepted' | 'cancelled') => {
    if (selectedIds.length === 0) return;
    setRequests(prev => prev.map(r => selectedIds.includes(r.id) ? { ...r, status: newStatus } : r));
    setSelectedIds([]);
    Swal.fire({ title: `تمت معالجة ${selectedIds.length} طلبات`, icon: 'success', timer: 1500, showConfirmButton: false, toast: true, position: 'top-end' });
  };

  return (
    <div className="p-8 bg-royal-silk min-h-full font-tajawal">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-royal-darkMaroon mb-1">الإدارة الملكية</h1>
        <p className="text-gray-400 text-xs font-bold tracking-widest uppercase italic">Operational Excellence Center</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <StatTile icon="fa-hourglass-start" value={pendingRequests.length} label="قيد الانتظار" color="text-royal-gold" />
        <StatTile icon="fa-circle-check" value={requests.filter(r => r.status === 'completed').length} label="مكتمل" color="text-green-500" />
        <StatTile icon="fa-chart-line" value={user.walletBalance} label="أرباحك" color="text-royal-maroon" isCurrency />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black text-royal-maroon">الطلبات الواردة</h3>
        {pendingRequests.length > 0 && (
          <button onClick={toggleSelectAll} className="text-[10px] font-black text-royal-gold uppercase tracking-widest px-4 py-2 border border-royal-gold/20 rounded-xl bg-white active:scale-95 transition-all">
            {selectedIds.length === pendingRequests.length ? 'DESELECT ALL' : 'SELECT ALL'}
          </button>
        )}
      </div>

      {selectedIds.length > 0 && (
        <div className="mb-8 gold-gradient p-5 rounded-3xl shadow-2xl animate-in slide-in-from-top duration-300 flex items-center justify-between border-2 border-white">
          <div className="text-royal-maroon">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Bulk Management</div>
            <div className="text-sm font-black">{selectedIds.length} طلبات محددة</div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleBulkAction('accepted')} className="bg-royal-maroon text-white px-6 py-2.5 rounded-2xl text-[10px] font-black active:scale-90 transition-all shadow-lg">قبول الكل</button>
            <button onClick={() => handleBulkAction('cancelled')} className="bg-white/40 text-royal-maroon px-4 py-2.5 rounded-2xl text-[10px] font-black active:scale-90 transition-all">رفض</button>
          </div>
        </div>
      )}
      
      <div className="space-y-5">
        {requests.length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-royal-gold/20">
              <i className="fa-solid fa-moon text-royal-gold/20 text-4xl mb-4"></i>
              <p className="text-gray-400 text-xs font-black uppercase tracking-widest">No active requests yet</p>
          </div>
        ) : (
          requests.map(req => (
            <div key={req.id} className={`bg-white rounded-[2rem] p-6 shadow-sm border-2 transition-all ${selectedIds.includes(req.id) ? 'border-royal-gold bg-royal-lightGold/10' : 'border-transparent'}`}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  {req.status === 'pending' && (
                    <button onClick={() => toggleSelect(req.id)} className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${selectedIds.includes(req.id) ? 'bg-royal-maroon border-royal-maroon text-royal-gold' : 'border-gray-100 bg-gray-50'}`}>
                      {selectedIds.includes(req.id) && <i className="fa-solid fa-check"></i>}
                    </button>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-royal-maroon">{req.serviceName}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">#{req.id.slice(-6).toUpperCase()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-royal-gold">{req.price.toLocaleString()}</div>
                  <div className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">{req.date}</div>
                </div>
              </div>

              {req.status === 'pending' ? (
                <div className="flex gap-3">
                  <button onClick={() => handleAction(req.id, 'accepted')} className="flex-[2] bg-royal-maroon text-royal-gold text-[10px] font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all">قبول الطلب</button>
                  <button onClick={() => handleAction(req.id, 'cancelled')} className="flex-1 bg-gray-50 text-gray-400 text-[10px] font-black py-4 rounded-2xl active:scale-95 transition-all">رفض</button>
                </div>
              ) : req.status === 'accepted' ? (
                <button onClick={() => handleAction(req.id, 'completed')} className="w-full bg-green-500 text-white text-[10px] font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all">تأكيد الخدمة المكتملة</button>
              ) : (
                <div className={`w-full py-4 rounded-2xl text-[10px] font-black flex items-center justify-center gap-3 uppercase tracking-widest ${req.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  <i className={`fa-solid ${req.status === 'completed' ? 'fa-check-double' : 'fa-xmark'}`}></i>
                  {req.status === 'completed' ? 'Mission Success' : 'Request Terminated'}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const StatTile = ({ icon, value, label, color, isCurrency }: any) => (
  <div className="bg-white p-5 rounded-[1.8rem] shadow-sm border border-royal-gold/10 text-center flex flex-col items-center">
    <i className={`fa-solid ${icon} ${color} mb-3 text-lg`}></i>
    <div className="text-sm font-black text-royal-maroon">
      {isCurrency ? value.toLocaleString() : value}
      {isCurrency && <span className="text-[8px] mr-1">SDG</span>}
    </div>
    <div className="text-[8px] text-gray-400 font-black mt-2 uppercase tracking-tighter">{label}</div>
  </div>
);

export default ExpertDashboard;
