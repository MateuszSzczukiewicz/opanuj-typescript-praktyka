/* Napraw błędy typowania w poniższym generycznym komponencie FormComponent, który używa fixedForwardRef do przekazywania referencji do elementu form:
1. Dodaj pełną implementację fixedForwardRef, która zapewni poprawną inferencje typów.
2. Zadbaj o poprawne typowanie propsów i referencji.
3. Zadbaj o poprawne typowanie handlerów i stanu.
*/

import { useRef, useState } from 'react';
import { fixedForwardRef } from './fixed-foward-ref';

const FormComponent = fixedForwardRef((props: any, ref) => {
  return (
    <form
      ref={ref}
      onSubmit={props.handleSubmit}
      className="p-6 mx-auto mt-8 bg-white rounded-lg shadow-md w-96"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={props.initialData.name}
            className="block w-full mt-1 text-gray-800 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={props.initialData.email}
            required
            className="block w-full mt-1 text-gray-800 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            defaultValue={props.initialData.age}
            required
            className="block w-full mt-1 text-gray-800 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
            Occupation
          </label>
          <select
            id="occupation"
            name="occupation"
            defaultValue={props.initialData.occupation}
            required
            className="block w-full mt-1 text-gray-800 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select occupation</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            defaultValue={props.initialData.bio}
            className="block w-full mt-1 text-gray-800 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
});

const App = () => {
  const formRef = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      age: Number(formData.get('age')),
      occupation: formData.get('occupation'),
      bio: formData.get('bio'),
    };
    setSubmittedData(data);
  };

  const initialData = {
    name: '',
    email: '',
    age: 0,
    occupation: '',
    bio: '',
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-6 sm:py-12">
      <FormComponent ref={formRef} initialData={initialData} handleSubmit={handleSubmit} />

      {submittedData && (
        <div className="max-w-md p-6 mx-auto rounded-lg shadow-md" data-testid="submitted-data">
          <h2 className="mb-4 text-lg font-semibold">Submitted Data:</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {submittedData.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {submittedData.email}
            </p>
            <p>
              <span className="font-medium">Age:</span> {submittedData.age}
            </p>
            <p>
              <span className="font-medium">Occupation:</span> {submittedData.occupation}
            </p>
            <p>
              <span className="font-medium">Bio:</span> {submittedData.bio}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
