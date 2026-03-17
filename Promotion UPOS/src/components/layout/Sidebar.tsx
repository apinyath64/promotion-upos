import React from 'react';
import { 
  BarChart3, 
  Tag, 
  History, 
  Settings, 
  LayoutDashboard,
  LogOut,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'แดชบอร์ด', icon: LayoutDashboard, active: false },
  { id: 'promotions', label: 'รายการโปรโมชั่น', icon: Tag, active: true },
  { id: 'history', label: 'ประวัติการใช้งาน', icon: History, active: false },
  { id: 'reports', label: 'รายงานส่วนลด', icon: BarChart3, active: false },
  { id: 'settings', label: 'ตั้งค่าระบบ', icon: Settings, active: false },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0">
      {/* Brand Logo */}
      <div className="p-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Tag className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">UPOS</h1>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest leading-none mt-0.5">Promotion</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              item.active 
                ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className={item.active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
              <span className="font-semibold text-sm">{item.label}</span>
            </div>
            {item.active && <ChevronRight size={16} />}
          </button>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white shadow-sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">Admin UPOS</p>
            <p className="text-xs text-slate-500 truncate">administrator@upos.com</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors rounded-xl font-semibold text-sm">
          <LogOut size={18} />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
};
