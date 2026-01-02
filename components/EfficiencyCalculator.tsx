import React, { useState } from 'react';
import { TrendingUp, Clock, Coins } from 'lucide-react';

const EfficiencyCalculator: React.FC = () => {
  const [hours, setHours] = useState<number>(5);
  const hourlyRate = 120; // Avg internal cost per hour CHF
  const efficiencyGain = 0.6; // 60% savings

  const hoursSaved = Math.round(hours * 4 * efficiencyGain); // Weekly * 4 weeks
  const moneySaved = hoursSaved * hourlyRate;

  return (
    <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-slate-800 p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
          Bexora Effizienz-Check
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Wie viel Zeit verbringen Sie pro Woche mit manueller Buchhaltung?
        </p>
      </div>

      <div className="mb-10">
        <div className="flex justify-between mb-4 font-semibold">
          <span>2 Std.</span>
          <span className="text-blue-600 text-xl">{hours} Std.</span>
          <span>20+ Std.</span>
        </div>
        <input
          type="range"
          min="2"
          max="20"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full text-blue-600 dark:text-blue-300">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Zeitersparnis / Monat</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">~{hoursSaved}h</p>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full text-green-600 dark:text-green-300">
            <Coins size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Kostenersparnis / Jahr</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">CHF {(moneySaved * 12).toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-center text-slate-400 mt-6">
        *Basierend auf Durchschnittswerten. Ihre individuelle Einsparung kann variieren.
      </p>
    </div>
  );
};

export default EfficiencyCalculator;