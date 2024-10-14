import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useGlobalContext } from './AppProvider';

interface IImage {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface IImagesApi {
  results: IImage[];
}

const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext()!;
  const { data, isPending, isError } = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const res = await axios.get(`${url}&query=${searchTerm}`);
      return res.data as IImagesApi;
    },
  });

  if (isPending)
    return (
      <section className='image-container'>
        <h4>Loading...</h4>
      </section>
    );

  if (isError)
    return (
      <section className='image-container'>
        <h4>There was an error</h4>
      </section>
    );

  const results = data.results;
  if (results.length === 0)
    return (
      <section className='image-container'>
        <h4>No results found...</h4>
      </section>
    );

  return (
    <section className='image-container'>
      {results.map((item) => {
        const url = item?.urls?.regular;
        return <img className='img' key={item.id} src={url} alt={item.alt_description} />;
      })}
    </section>
  );
};

export default Gallery;
