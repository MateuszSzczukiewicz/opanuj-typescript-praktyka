import { Link } from 'react-router';
import { Wrench } from 'lucide-react';
interface RouteFallbackProps {
  exerciseName: string;
}

export default function RouteFallback({ exerciseName }: RouteFallbackProps) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <Wrench className="w-4 h-4" /> Projekt "{exerciseName}" nie został ukończony.
      </h2>
      <p className="mb-8">
        Upewnij się, że twoja implementacja działa - w razie potrzeby wykorzystaj testy lub dodaj
        wątek na O:TS Forum.
      </p>
      <Link className="text-blue-400" to="/">
        Wróć do strony głównej
      </Link>
    </div>
  );
}
