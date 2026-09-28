'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { WorkspaceConfig, PRODUCTS } from '@/types/workspace';
import Image from 'next/image';

interface WorkspacePreviewProps {
  config: WorkspaceConfig;
}

export default function WorkspacePreview({ config }: WorkspacePreviewProps) {
  const getTransparentImg = (img?: string) => {
    if (!img) return '';
    const filename = img.split('/').pop()?.replace('.jpg', '.png');
    return `/image/transparent/${filename}`;
  };

  const desk = PRODUCTS.find(p => p.id === config.deskId);
  const chair = PRODUCTS.find(p => p.id === config.chairId);
  const monitor = PRODUCTS.find(p => p.id === 'monitor-4k');
  const lamp = PRODUCTS.find(p => p.id === 'lamp-warm');
  const plant = PRODUCTS.find(p => p.id === 'plant-monstera');
  const kb = PRODUCTS.find(p => p.id === 'acc-keyboard-mouse');
  const coffee = PRODUCTS.find(p => p.id === 'acc-coffee');

  return (
    <div className="relative w-full aspect-[4/3] bg-stone-950 rounded-[2.5rem] overflow-hidden shadow-2xl">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/image/Bali-Workspace.jpg" alt="Bali" fill className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/20 to-transparent" />
      </div>

      {/* Workspace Scene */}
      <div className="relative z-10 w-full h-full">
        
        {/* 1. Kursi (Dibelakang Meja) */}
        <motion.div className="absolute bottom-[10%] left-[28%] w-[40%] h-[60%] z-10">
          <Image src={getTransparentImg(chair?.image)} alt="Chair" fill className="object-contain" priority />
        </motion.div>

        {/* 2. Meja (Ukuran Asli/Normal, tapi digeser ke atas: bottom-[8%]) */}
        <motion.div className="absolute bottom-[-20%] left-[10%] w-[80%] h-[90%] z-20">
          <Image src={getTransparentImg(desk?.image)} alt="Desk" fill className="object-contain" priority />
        </motion.div>

        {/* 3. Items Di Atas Meja (Menempel persis di permukaan meja yang sudah dinaikkan) */}
        
        {/* Monitor */}
        {config.monitorsCount > 0 && (
          <motion.div className="absolute bottom-[40%] left-[36%] w-[28%] h-[40%] z-30">
            <Image src={getTransparentImg(monitor?.image)} alt="Monitor" fill className="object-contain" />
          </motion.div>
        )}

        {/* Keyboard & Mouse */}
        {config.hasKeyboardMouse && (
          <motion.div className="absolute bottom-[33%] left-[38%] w-[24%] h-[30%] z-50">
            <Image src={getTransparentImg(kb?.image)} alt="Keyboard" fill className="object-contain" />
          </motion.div>
        )}

        {/* Lampu Meja */}
        {config.hasLamp && (
          <motion.div className="absolute bottom-[43%] right-[22%] w-[12%] h-[22%] z-30">
            <Image src={getTransparentImg(lamp?.image)} alt="Lamp" fill className="object-contain" />
          </motion.div>
        )}

        {/* Mesin Kopi */}
        {config.hasCoffeeMachine && (
          <motion.div className="absolute bottom-[45%] left-[20%] w-[12%] h-[18%] z-30">
            <Image src={getTransparentImg(coffee?.image)} alt="Coffee" fill className="object-contain" />
          </motion.div>
        )}

        {/* Tanaman */}
        {config.hasPlant && (
          <motion.div className="absolute bottom-[-10%] right-[4%] w-[18%] h-[70%] z-25">
            <Image src={getTransparentImg(plant?.image)} alt="Plant" fill className="object-contain" />
          </motion.div>
        )}
      </div>

      <div className="absolute top-4 left-4 z-40 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white uppercase tracking-widest font-mono">
        Live Preview
      </div>
    </div>
  );
}
