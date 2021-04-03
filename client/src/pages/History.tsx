import React, { useEffect, useState } from 'react';
import RequestStats from '../components/RequestStats';
import { useParams } from 'react-router-dom';

import axios from 'axios';
// let URL = 'http://35.154.34.85:1880/history'
const URL = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:8080';

function History(props) {
  const params = useParams();
  const [result, setResult] = useState<[] | null>(null);
  const [loading, setLoading] = useState(false);
  const count = 0;
  useEffect(() => {
    axios.get(`${URL}/history/${params.uid}`).then(response => {
      // console.log(response.data);
      setResult(response.data);
      setLoading(false);
    });
  }, []);

  return <RequestStats data={result} loading={loading}></RequestStats>;
}
export default History;
