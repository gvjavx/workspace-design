'use client';

import { useState, useEffect } from 'react';
import { WorkspaceConfig, PRODUCTS, PRESET_SETUPS } from '@/types/workspace';
import WorkspacePreview from './WorkspacePreview';
import ProductSelector from './ProductSelector';
import { formatCurrency } from '@/lib/utils';
import { ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const DEFAULT_CONFIG: WorkspaceConfig = {
  deskId: 'desk-oak',
  chairId: 'chair-ergo',
  monitorsCount: 1,
  hasLamp: true,
  hasPlant: true,
  hasKeyboardMouse: false,
  hasCoffeeMachine: false,
};

export default function WorkspaceConfigurator() {
  const [config, setConfig] = useState<WorkspaceConfig>(DEFAULT_CONFIG);
  const [isRenting, setIsRenting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('monis_config');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('monis_config', JSON.stringify(config));
  }, [config]);

  const selectedProducts = PRODUCTS.filter(p =>
    p.id === config.deskId ||
    p.id === config.chairId ||
    (p.category === 'monitor' && config.monitorsCount > 0) ||
    (p.id === 'lamp-warm' && config.hasLamp) ||
    (p.id === 'plant-monstera' && config.hasPlant) ||
    (p.id === 'acc-keyboard-mouse' && config.hasKeyboardMouse) ||
    (p.id === 'acc-coffee' && config.hasCoffeeMachine)
  );

  const monitorPrice = PRODUCTS.find(p => p.id === 'monitor-4k')!.pricePerMonth;
  const totalPrice = selectedProducts.reduce((sum, p) => {
    if (p.category === 'monitor') return sum + (monitorPrice * config.monitorsCount);
    return sum + p.pricePerMonth;
  }, 0);

  const handleProductSelect = (id: string) => {
    const product = PRODUCTS.find(p => p.id === id)!;
    if (product.category === 'desk') setConfig({ ...config, deskId: id });
    else if (product.category === 'chair') setConfig({ ...config, chairId: id });
    else if (product.category === 'monitor') setConfig({ ...config, monitorsCount: config.monitorsCount === 2 ? 0 : config.monitorsCount + 1 });
    else if (product.category === 'lamp') setConfig({ ...config, hasLamp: !config.hasLamp });
    else if (product.category === 'plant') setConfig({ ...config, hasPlant: !config.hasPlant });
    else if (product.id === 'acc-keyboard-mouse') setConfig({ ...config, hasKeyboardMouse: !config.hasKeyboardMouse });
    else if (product.id === 'acc-coffee') setConfig({ ...config, hasCoffeeMachine: !config.hasCoffeeMachine });
  };

  return (
    <div className="space-y-8">
      {/* ===== MAIN SHOWCASE: LIVE RENDER ===== */}
      <div className="relative">
        <div className="rounded-[2.5rem] shadow-2xl shadow-stone-900/20 overflow-hidden">
          <WorkspacePreview config={config} />
        </div>

        {/* Floating Price Tag - Ditarik ke top-6, right-6 supaya aman dari objek meja */}
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-6 z-40">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Monthly</p>
            <p className="text-2xl font-black text-stone-900 leading-none">{formatCurrency(totalPrice)}</p>
          </div>
          <button
            onClick={() => setIsRenting(true)}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-500/30"
          >
            Rent Setup
          </button>
        </div>
      </div>

      {/* ===== PRESETS ===== */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mr-2">Quick Presets:</span>
        {PRESET_SETUPS.map(preset => (
          <button
            key={preset.id}
            onClick={() => setConfig(preset.config)}
            className="px-4 py-2 bg-white hover:bg-stone-900 hover:text-white border border-stone-200 rounded-full text-xs font-semibold transition-all shadow-sm"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* ===== CONTROLS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-7">
          <ProductSelector
            selectedIds={[
              config.deskId, config.chairId,
              ...(config.hasLamp ? ['lamp-warm'] : []),
              ...(config.hasPlant ? ['plant-monstera'] : []),
              ...(config.monitorsCount > 0 ? ['monitor-4k'] : []),
              ...(config.hasKeyboardMouse ? ['acc-keyboard-mouse'] : []),
              ...(config.hasCoffeeMachine ? ['acc-coffee'] : [])
            ]}
            onSelectProduct={handleProductSelect}
          />
        </div>

        {/* Summary */}
        <div className="lg:col-span-3">
          <div className="sticky top-24 border border-stone-200 p-6 rounded-3xl bg-white shadow-xl shadow-stone-200/50">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-stone-400">Setup Summary</h3>
            <div className="space-y-3 mb-6">
              {selectedProducts.map(p => (
                <div key={p.id} className="flex justify-between text-sm items-center">
                  <span className="font-medium text-stone-700">{p.name}{p.category === 'monitor' && config.monitorsCount > 1 ? ` x${config.monitorsCount}` : ''}</span>
                  <span className="font-semibold text-stone-500 text-xs">{formatCurrency(p.pricePerMonth * (p.category === 'monitor' ? config.monitorsCount : 1))}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed pt-4 flex justify-between items-center mb-6">
              <span className="font-bold text-stone-900 text-sm">Total / Month</span>
              <span className="text-xl font-black text-stone-900">{formatCurrency(totalPrice)}</span>
            </div>
            <button
              onClick={() => setIsRenting(true)}
              className="w-full bg-stone-900 text-white py-3.5 rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 group shadow-lg shadow-stone-900/20 active:scale-[0.98]"
            >
              Secure This Setup <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-center mt-3 text-stone-400 font-medium">Free delivery & assembly in Seminyak, Canggu, Ubud.</p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isRenting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-3xl max-w-md w-full text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
            <p className="text-stone-600 mb-8">Our concierge will contact you via WhatsApp to finalize delivery and assembly.</p>
            <button
              onClick={() => setIsRenting(false)}
              className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold"
            >
              Back to Editor
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
