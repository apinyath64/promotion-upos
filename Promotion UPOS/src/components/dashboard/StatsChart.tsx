import React from 'react';
import { motion } from 'framer-motion';

const miniData = [40, 70, 45, 90, 65, 85, 55, 100, 80, 95];

export const StatsChart: React.FC<{ color?: string }> = ({ color = '#6366f1' }) => {
  return (
    <div className="flex items-end gap-1 h-12 w-24">
      {miniData.map((val, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${val}%` }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="flex-1 rounded-t-sm"
          style={{ backgroundColor: color, opacity: 0.2 + (val / 100) * 0.8 }}
        />
      ))}
    </div>
  );
};

export const MainChart: React.FC = () => {
  return (
    <div className="w-full h-64 bg-slate-50/50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Grid Lines Mock */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-20 pointer-events-none">
        {[1, 2, 3, 4].map(i => <div key={i} className="border-t border-slate-400 w-full h-0" />)}
      </div>

      <div className="flex justify-between items-start relative z-10">
        <div>
          <h3 className="text-lg font-bold text-slate-800">ประสิทธิภาพโปรโมชั่น (30 วันล่าสุด)</h3>
          <p className="text-sm text-slate-500">วิเคราะห์จำนวนการใช้งานแบบรายวัน</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-xs font-bold text-slate-600">ใช้งานจริง</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <span className="text-xs font-medium">เป้าหมาย</span>
          </div>
        </div>
      </div>

      {/* Main Chart Line Mock */}
      <div className="flex-1 flex items-end justify-between gap-2 pt-8 relative z-10">
        {[30, 45, 35, 60, 50, 80, 70, 90, 85, 120, 100, 110].map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${(val / 120) * 100}%` }}
              className="w-full bg-indigo-500/10 group-hover/bar:bg-indigo-500/20 rounded-t-md relative transition-colors"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                {val} ครั้ง
              </div>
            </motion.div>
            <span className="text-[10px] font-bold text-slate-400">สัปดาห์ {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
