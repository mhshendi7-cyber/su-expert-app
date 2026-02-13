
import React, { useState } from 'react';
import { User, UserRole, Gender } from '../types';
import Swal from 'sweetalert2';

interface OnboardingProps {
  onComplete: (user: User) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'client' as UserRole,
    gender: 'male' as Gender,
    dob: '',
    nationalId: '',
    idFile: null as File | null,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(Math.max(0, step - 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.nationalId) {
        Swal.fire({
            title: 'خطأ',
            text: 'يرجى إكمال جميع الحقول المطلوبة',
            icon: 'error',
            confirmButtonColor: '#5D0E0E'
        });
        return;
    }

    const newUser: User = {
      id: `u-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      role: formData.role,
      gender: formData.gender,
      isVerified: true, 
      walletBalance: 0,
      suPoints: 100, 
    };
    onComplete(newUser);
  };

  return (
    <div className="flex flex-col min-h-screen bg-royal-darkMaroon p-8 overflow-y-auto damask-pattern relative">
      <div className="flex flex-col items-center mb-12 mt-10 relative z-10">
        <div className="w-28 h-28 border-[3px] border-royal-gold rounded-full flex flex-col items-center justify-center bg-royal-maroon shadow-2xl mb-6">
           <div className="text-5xl font-black text-white italic tracking-tighter">SU</div>
        </div>
        <div className="text-royal-gold font-black text-4xl tracking-[0.2em]">SU PREMIER</div>
        <div className="h-0.5 w-32 bg-royal-gold/40 rounded-full mt-4"></div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] p-10 border border-royal-gold/20 relative z-10">
        {step === 0 && (
          <div className="text-center animate-in fade-in zoom-in duration-700">
             <h2 className="text-3xl font-black text-royal-darkMaroon mb-6 leading-tight">عالم من الفخامة والتميز</h2>
             <p className="text-gray-400 text-sm mb-12 leading-relaxed px-4 font-medium">الوصول الحصري لأفضل الخبراء السودانيين في منصة واحدة صممت للنخبة.</p>
             
             <div className="space-y-4">
                <button onClick={nextStep} className="w-full gold-gradient text-royal-maroon font-black py-5 rounded-[2rem] shadow-xl active:scale-95 transition-all text-sm uppercase tracking-widest">البدء الآن</button>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-8">Excellence in every interaction</div>
             </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-in slide-in-from-left duration-500">
            <div className="flex items-center gap-3 mb-8">
               <button onClick={prevStep} className="text-royal-maroon w-8 h-8 rounded-full bg-royal-silk flex items-center justify-center"><i className="fa-solid fa-arrow-right"></i></button>
               <h2 className="text-2xl font-black text-royal-darkMaroon">البيانات الأساسية</h2>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-royal-maroon/60 uppercase tracking-widest mr-2">الاسم الكامل</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-royal-silk border-2 border-transparent rounded-2xl p-5 text-sm font-bold focus:border-royal-gold/30 focus:outline-none transition-all" 
                  placeholder="ادخل اسمك الرسمي"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-royal-maroon/60 uppercase tracking-widest mr-2">رقم الهاتف</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-royal-silk border-2 border-transparent rounded-2xl p-5 text-sm font-bold focus:border-royal-gold/30 focus:outline-none transition-all" 
                  placeholder="09XXXXXXXX"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-royal-maroon/60 uppercase tracking-widest mr-2">الجنس</label>
                    <select 
                        value={formData.gender}
                        onChange={e => setFormData({...formData, gender: e.target.value as Gender})}
                        className="w-full bg-royal-silk border-2 border-transparent rounded-2xl p-5 text-sm font-bold focus:border-royal-gold/30 focus:outline-none"
                    >
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-royal-maroon/60 uppercase tracking-widest mr-2">نوع العضوية</label>
                    <select 
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value as UserRole})}
                        className="w-full bg-royal-silk border-2 border-transparent rounded-2xl p-5 text-sm font-bold focus:border-royal-gold/30 focus:outline-none"
                    >
                        <option value="client">عميل</option>
                        <option value="expert">خبير</option>
                    </select>
                  </div>
              </div>
            </div>
            <button onClick={nextStep} className="w-full bg-royal-maroon text-royal-gold font-black py-5 rounded-[2rem] mt-10 shadow-2xl active:scale-95 transition-all uppercase tracking-widest text-xs">التالي</button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-left duration-500">
            <div className="flex items-center gap-3 mb-8">
               <button onClick={prevStep} className="text-royal-maroon w-8 h-8 rounded-full bg-royal-silk flex items-center justify-center"><i className="fa-solid fa-arrow-right"></i></button>
               <h2 className="text-2xl font-black text-royal-darkMaroon">توثيق العضوية</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-royal-maroon/60 uppercase tracking-widest mr-2">تاريخ الميلاد</label>
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={e => setFormData({...formData, dob: e.target.value})}
                  className="w-full bg-royal-silk border-2 border-transparent rounded-2xl p-5 text-sm font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-royal-maroon/60 uppercase tracking-widest mr-2">رقم الهوية / الجواز</label>
                <input 
                  type="text" 
                  value={formData.nationalId}
                  onChange={e => setFormData({...formData, nationalId: e.target.value})}
                  className="w-full bg-royal-silk border-2 border-transparent rounded-2xl p-5 text-sm font-bold" 
                  placeholder="الرقم الرسمي المعتمد"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-royal-maroon/60 uppercase tracking-widest mr-2">صورة المستند</label>
                <div className="relative border-2 border-dashed border-royal-gold/30 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-royal-silk/50 cursor-pointer hover:bg-royal-silk transition-all group">
                    <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={e => setFormData({...formData, idFile: e.target.files?.[0] || null})}
                    />
                    <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-royal-gold mb-4 group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-fingerprint text-3xl"></i>
                    </div>
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{formData.idFile ? formData.idFile.name : 'رفع صورة المستند'}</span>
                </div>
              </div>
            </div>
            
            <button onClick={nextStep} className="w-full bg-royal-maroon text-royal-gold font-black py-5 rounded-[2rem] mt-10 shadow-2xl active:scale-95 transition-all text-xs tracking-widest">التالي</button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in zoom-in duration-700 text-center">
            <div className="w-24 h-24 gold-gradient text-royal-maroon rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-2xl">
                <i className="fa-solid fa-crown text-5xl"></i>
            </div>
            <h2 className="text-3xl font-black text-royal-darkMaroon mb-4 tracking-tight">عضوية معتمدة</h2>
            <p className="text-gray-400 text-sm mb-10 px-6 font-medium leading-loose">لقد تم التحقق من بياناتك. أنت الآن جزء من شبكة سُو الحصرية للتميز.</p>
            
            <div className="bg-royal-silk p-6 rounded-[2.5rem] mb-10 text-right border-2 border-royal-gold/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-royal-gold"></div>
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-royal-maroon rounded-2xl flex items-center justify-center text-royal-gold font-black text-3xl shadow-lg border-2 border-royal-gold/20">
                        {formData.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-black text-royal-darkMaroon text-lg">{formData.name}</div>
                        <div className="text-[10px] text-royal-gold font-black uppercase tracking-[0.3em]">{formData.role === 'client' ? 'عضو ملكي' : 'خبير معتمد'}</div>
                    </div>
                </div>
            </div>

            <button onClick={handleSubmit} className="w-full bg-royal-maroon text-royal-gold font-black py-5 rounded-[2rem] shadow-2xl animate-pulse active:scale-95 transition-all text-sm tracking-[0.2em] uppercase">دخول المنصة</button>
          </div>
        )}
      </div>

      <div className="mt-auto pt-10 pb-6 text-center">
         <div className="text-[9px] text-white/30 font-black tracking-[0.5em] uppercase mb-4">SU PREMIER &copy; 2025</div>
         <div className="flex justify-center gap-8">
            <i className="fa-brands fa-instagram text-white/20 hover:text-royal-gold transition-colors text-xl"></i>
            <i className="fa-brands fa-whatsapp text-white/20 hover:text-royal-gold transition-colors text-xl"></i>
            <i className="fa-brands fa-x-twitter text-white/20 hover:text-royal-gold transition-colors text-xl"></i>
         </div>
      </div>
    </div>
  );
};

export default Onboarding;
