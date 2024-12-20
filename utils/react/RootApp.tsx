import { NavLink } from 'react-router';
import { Code2 } from 'lucide-react';

type RootAppProps = {
  routes: { path: string; exerciseName: string }[];
};

const formatExerciseName = (name: string): string => {
  const withoutNumbers = name.replace(/^\d+-/, '');
  return withoutNumbers
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const RootApp = ({ routes }: RootAppProps) => {
  return (
    <nav>
      <h1 className="text-lg lg:text-3xl font-bold mb-4 flex items-center gap-2">
        <Code2 className="w-8 h-8" /> Wybierz projekt
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {routes.map(({ exerciseName }) => (
          <li key={exerciseName} className="w-full text-center">
            <NavLink
              to={`/${exerciseName}`}
              className="block p-6 bg-gray-800 hover:bg-blue-800 text-blue-300 hover:text-white rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 card-hover"
            >
              <h2 className="text-md lg:text-xl font-semibold ">
                {formatExerciseName(exerciseName)}
              </h2>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RootApp;
