/* Zastosuj rekomendowane podejście do typowania propsów w komponencie Card.
  Dodatkowo, zadbaj o domyślne wartości propsów:
  - title = “Witamy w React Pro!”
  - content = “Ciesz się procesem nauki TSa z Reactem 🧑🏻‍💻”
*/

type CardProps = {
  title: string;
  content: string;
};

const Card = ({ title, content }) => {
  return (
    <div className="max-w-md mx-auto overflow-hidden transition-shadow duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl dark:bg-slate-800">
      <div className="p-8">
        <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
        <p className="leading-relaxed text-gray-600 dark:text-gray-300">{content}</p>
        <div className="mt-4">
          <button className="px-4 py-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
