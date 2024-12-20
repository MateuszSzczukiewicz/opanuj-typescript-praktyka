import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function App() {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const getItemId = () => {
    return `${new Date().getTime()}`.substring(4, 10);
  }

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Cart>({
    resolver: zodResolver(CartSchema),
    defaultValues: {
      items: [],
      total: 0
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const items = watch("items");
  const calculatedTotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0) * 2,
    0
  );

  useEffect(() => {
    setValue("total", calculatedTotal);
  }, [calculatedTotal, setValue]);

  const createItem = () => {
    append({ id: getItemId(), name: "", price: 0, quantity: 0 });
  }

  const onSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-700 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          {/* Items array field */}
          <div>
            <label className="block text-sm font-medium mb-1">Items</label>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <div className="grid grid-cols-4 gap-2 flex-1">
                    <input
                      {...register(`items.${index}.id`)}
                      placeholder="ID"
                      disabled
                      data-testid="item-id"
                      className="p-2 rounded bg-gray-600"
                    />
                    <input
                      {...register(`items.${index}.name`)}
                      placeholder="Name"
                      data-testid="item-name"
                      className="p-2 rounded bg-gray-600"
                    />
                    <input
                      {...register(`items.${index}.price`, { valueAsNumber: true })}
                      placeholder="Price"
                      type="number"
                      step="0.01"
                      data-testid="item-price"
                      className="p-2 rounded bg-gray-600"
                    />
                    <input
                      {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                      placeholder="Qty"
                      type="number"
                      step="0.01"
                      data-testid="item-quantity"
                      className="p-2 rounded bg-gray-600"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {errors.items && (
                <p className="text-red-400 text-sm" data-testid="items-error">{errors.items.message}</p>
              )}
              <button
                type="button"
                data-testid="add-item-button"
                onClick={createItem}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Dodaj produkt
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Total</label>
            <input
              {...register("total")}
              type="number"
              step="0.01"
              readOnly
              value={calculatedTotal.toFixed(2)}
              className="w-full font-bold text-xlrounded bg-gray-700 cursor-not-allowed"
            />
            {errors.total && (
              <p className="text-red-400 text-sm" data-testid="total-error">{errors.total.message}</p>
            )}
            {errors.sum && (
              <p className="text-red-400 text-sm" data-testid="total-error">{errors.sum.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          data-testid="submit-button"
          className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Submit
        </button>
      </form>
      {isSubmitted &&
        <p className="text-green-400 text-sm text-center mt-4" data-testid="submitted-message">
          Koszyk został wysłany!
        </p>
      }
    </div>
  );
}
