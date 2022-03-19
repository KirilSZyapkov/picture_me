import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPicturesByCategory } from '../services/data';
import Pin from '../common/Pin';

function Category() {

  const [data, setData] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    async function fetch() {
      const respons = await getPicturesByCategory(category);
      setData(respons.results);
    }
    fetch();

  }, [category]);

  return (
    <div className='flex justify-items-center items-center flex-wrap p-10'>
      {data.length > 0 ? <>{data.map((p) => <Pin key={p.objectId} {...p} picId={p.objectId} />)}</> : <h1 className='font-bold ml-10'>No pictures found</h1>}
    </div>
  )
}

export default Category