import { Planet } from '../types';
import { Globe2, Cloud, Thermometer } from 'lucide-react';

interface SimpleCardProps {
  planet: Planet;
}

export default function SimpleCard({ planet }: SimpleCardProps) {
  return (
    <div className="h-full p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-lg hover:border-blue-500 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        <Globe2 className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-semibold text-blue-400">{planet.name}</h3>
      </div>
      <div className="space-y-2 text-gray-300">
        <p className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-gray-400">
            <Cloud className="w-4 h-4" />
            <span>Climate:</span>
          </span>
          <span className="flex items-center gap-1">
            <Thermometer className="w-4 h-4" />
            {planet.climate}
          </span>
        </p>
      </div>
    </div>
  );
}
