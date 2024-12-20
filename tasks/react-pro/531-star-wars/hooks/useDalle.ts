import { useEffect, useState } from 'react';
import { usePostImagesGenerations } from '../generated/dalle-client';

export function useDalle() {
  const [image, setImage] = useState<string | null>(null);
  const [canGenerateImage, setCanGenerateImage] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem('OPENAI_API_KEY');
    setCanGenerateImage(!!apiKey);
  }, []);

  const { mutate: generateImage } = usePostImagesGenerations({
    axios: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('OPENAI_API_KEY')}`,
      },
    },
  });

  const handleGenerateImage = async (shipName: string) => {
    if (!canGenerateImage) throw new Error('Dodaj klucz API do Local Storage (OPENAI_API_KEY)');
    await generateImage(
      {
        data: {
          prompt: `Futuristic illustration of starship "${shipName}" flying in deep space, with planets in the background.`,
          model: 'dall-e-3',
          size: '1024x1024',
        },
      },
      {
        onSuccess: (response) => {
          setImage(response.data.data?.[0]?.url ?? null);
        },
      },
    );
  };

  return {
    canGenerateImage,
    handleGenerateImage,
    image,
  };
}
