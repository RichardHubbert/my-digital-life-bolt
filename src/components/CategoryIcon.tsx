import { Category } from '../types';
import { 
  NewspaperIcon, CloudIcon, HeartIcon, MapPinIcon,
  TruckIcon, BriefcaseIcon, WifiIcon, ChatBubbleLeftRightIcon,
  BuildingOffice2Icon, MapIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const categoryIcons = {
  'News': NewspaperIcon,
  'Weather': CloudIcon,
  'Fitness': HeartIcon,
  'Location': MapPinIcon,
  'Transport': TruckIcon,
  'Work': BriefcaseIcon,
  'Wifi': WifiIcon,
  'Messaging': ChatBubbleLeftRightIcon,
  'Gym': BuildingOffice2Icon,
  'Satnav': MapIcon,
};

interface CategoryIconProps {
  category: Category;
  isSelected: boolean;
}

export default function CategoryIcon({ category, isSelected }: CategoryIconProps) {
  const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons];

  return (
    <div className={clsx(
      "p-2 rounded-lg transition-colors",
      isSelected ? "bg-green-100" : "bg-gray-100",
      "group-hover:bg-opacity-75"
    )}>
      <IconComponent 
        className={clsx(
          "h-5 w-5",
          isSelected ? "text-green-600" : "text-gray-600"
        )} 
      />
    </div>
  );
}