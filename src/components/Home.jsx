import { useEffect, useState } from 'react';
import Pin from '../common/Pin';
import { getAllPictures } from '../services/data';
import Spinner from '../common/loader/Spinner';

function Home() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      const respons = await getAllPictures();
      setData(respons.results);
    }
    fetch();
  }, []);

  

  if(data.length === 0){
    return <Spinner message={"Loading ..."}/>
  }

  return (
    <div className='flex justify-items-center items-center flex-wrap pt-10 px-14'>
      {data.map((p) => <Pin key={p.objectId} {...p} picId={p.objectId} />)}
    </div>
  )
}

export default Home