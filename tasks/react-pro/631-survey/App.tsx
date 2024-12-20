import Survey from './components/Survey';

export default function App() {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Form submitted:', values);
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-200">Course Feedback</h1>
        <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 shadow-xl">
          <Survey onSubmit={handleSubmit}>
            <Survey.ShortAnswer
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              required
            />
            <Survey.ShortAnswer
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              required
            />
            <Survey.LongAnswer name="review" label="Review" placeholder="Enter review" />
            <Survey.Choice
              name="country"
              label="Country"
              options={[
                { value: 'pl', label: 'Poland' },
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
              ]}
            />
            <Survey.Submit>Submit Survey</Survey.Submit>
          </Survey>
        </div>
      </div>
    </div>
  );
}
