import { Stars, Settings2, Factory, Users, Gauge } from 'lucide-react';
import { GetStarships200ResultsItem } from './generated/swapi-client.schemas';
import { useDalle } from './hooks/useDalle';
type StarshipDetails = GetStarships200ResultsItem;

interface StarshipCardProps {
  ship: StarshipDetails;
}

export function StarshipCard({ ship }: StarshipCardProps) {
  const { canGenerateImage, handleGenerateImage, image } = useDalle();

  return (
    <div
      data-testid="starship-card"
      className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-200 border border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-blue-400">{ship.name}</h2>
        {canGenerateImage && (
          <button onClick={() => handleGenerateImage(ship.name!)}>
            <Stars className="w-5 h-5 text-teal-400 hover:text-teal-500 transition-colors duration-200" />
          </button>
        )}
      </div>

      {image && <img src={image} alt={ship.name} className="w-full rounded-lg h-auto mb-4" />}

      <div className="space-y-2 text-sm text-gray-300">
        <p className="flex items-center">
          <Settings2 className="w-4 h-4 mr-2 text-gray-500" />
          Model: {ship.model}
        </p>
        <p className="flex items-center">
          <Factory className="w-4 h-4 mr-2 text-gray-500" />
          Manufacturer: {ship.manufacturer}
        </p>
        <p className="flex items-center">
          <Users className="w-4 h-4 mr-2 text-gray-500" />
          Crew: {ship.crew}
        </p>
        <p className="flex items-center">
          <Gauge className="w-4 h-4 mr-2 text-gray-500" />
          Hyperdrive Rating: {ship.hyperdrive_rating}
        </p>
      </div>
    </div>
  );
}
