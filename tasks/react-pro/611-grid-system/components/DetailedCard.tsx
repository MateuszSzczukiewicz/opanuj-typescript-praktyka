import { Planet } from '../types';
import { Globe2, Mountain, CircleDot, Timer, Users } from 'lucide-react';

interface DetailedCardProps {
  planet: Planet;
}

export default function DetailedCard({ planet }: DetailedCardProps) {
  return (
    <div className="h-full p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-lg hover:border-blue-500 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        <Globe2 className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-blue-400">{planet.name}</h2>
      </div>
      <div className="space-y-3 text-gray-300">
        <p className="flex justify-between items-center py-2 border-b border-gray-700">
          <span className="flex items-center gap-2 text-gray-400">
            <Mountain className="w-4 h-4" />
            <span>Terrain:</span>
          </span>
          <span className="font-medium">{planet.terrain}</span>
        </p>
        <p className="flex justify-between items-center py-2 border-b border-gray-700">
          <span className="flex items-center gap-2 text-gray-400">
            <CircleDot className="w-4 h-4" />
            <span>Diameter:</span>
          </span>
          <span className="font-medium">{planet.diameter}</span>
        </p>
        <p className="flex justify-between items-center py-2 border-b border-gray-700">
          <span className="flex items-center gap-2 text-gray-400">
            <Timer className="w-4 h-4" />
            <span>Rotation Period:</span>
          </span>
          <span className="font-medium">{planet.rotation_period}</span>
        </p>
        <p className="flex justify-between items-center py-2 border-b border-gray-700">
          <span className="flex items-center gap-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span>Population:</span>
          </span>
          <span className="font-medium">{planet.population}</span>
        </p>
      </div>
    </div>
  );
}
