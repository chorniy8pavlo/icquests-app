import React from 'react';
import Image from 'next/image';
import { ChipIcon, icons } from './iconMap';

export interface IChip {
  icon: ChipIcon;
  text: string;
}

export const Chip: React.FC<IChip> = ({ icon, text }) => {
  const IconComponent = icons[icon];
  return (
    <div className="bg-white/10 font-semibold py-2 px-3 text-sm rounded-3xl flex items-center gap-2">
      <Image src={IconComponent} alt={icon} width={16} height={16} />
      <span>{text}</span>
    </div>
  );
};
