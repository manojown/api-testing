import React, { useState, useEffect } from 'react';
import axios from 'axios';
const URL = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:8080';

// let URL = 'http://35.154.34.85:1880/history'

import Modal from '../components/Modal';

import Table from '../components/Setttings/Table';

function RequestPortal() {
  const [data, setData] = useState(null);
  const [result, setResult] = useState<[] | null>(null);

  const createServer = () => {
    axios.post(`${URL}/server`).then(response => {
      // setResult(response.data);
      apiCall(setResult);
    });
  };
  useEffect(() => {
    apiCall(setResult);
    // setInterval(() => {
    //   apiCall(setResult)
    // },10000)
  }, []);

  const creteServerButton = (
    <button type='button' onClick={() => createServer()} className='mt-10 w-80 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3'>
      Create New Server
    </button>
  );
  // let openModal = () => {
  //   setLoading(true)
  // }

  // let closeModal = () => {
  //   setLoading(false)
  // }
  // const modalButton = (
  //   <button type='button' onClick={() => setModal(true)} className='w-80 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3'>
  //     New Test Request
  //   </button>
  // );
  return (
    <>
      {creteServerButton}
      {result ? <Table data={result} setData={setData} /> : ''}
      {/* {data  ? <Modal callApi={callApi} data={data}  closeModal={closeModal} /> : ''} */}
    </>
  );
}

export default RequestPortal;

function apiCall(setResult) {
  axios.get(`${URL}/server`).then(response => {
    console.log(response.data);
    setResult(response.data);
  });
}
