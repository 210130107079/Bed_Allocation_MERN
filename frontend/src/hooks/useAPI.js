import axios from 'axios'
import { useEffect, useState } from 'react';

const useFetchAPI = (url) => {

 const [loading, setLoading] = useState(false);
 const [data, setData] = useState(null);
 const [error, setError] = useState(null);
    
 useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            if(response.status){
                setData(response.data);
            }else{
                setError(response.data.error.data)
            }
        } catch (error) {
            setError(error)
            console.error('Error fetching data:', error);
        } finally{
            setLoading(false);
        }
        }
        fetchData();
      }, []);

      return {data,error,loading}
}

export default useFetchAPI
