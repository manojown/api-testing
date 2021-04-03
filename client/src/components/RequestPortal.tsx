import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
const URL = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:8080';
// let URL = 'http://35.154.34.85:1880/history'

// import RequestStats from './RequestStats';
// import Stats from './Stats';

import Modal from './Modal';
import Table from './Config/OldTable';

function RequestPortal() {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<[] | null>(null);
  const [result, setResult] = useState<[] | null>(null);
  const [configs, setConfigs] = useState<[] | null>(null);

  const callApi = requestBody => {
    setLoading(true);
    axios.post(`${URL}/request`, requestBody).then(response => {
      console.log(requestBody);
      setResult(response.data);
      setLoading(false);
    });
  };
  const modelDataCall = row => {
    // console.log("called data modelDataCall",row)
    setModalData(row);
    setModal(true);
  };
  const modalButton = (
    <button type='button' onClick={() => setModal(true)} className='mt-10 w-80 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3'>
      New Test Request
    </button>
  );
  return (
    <>
      {/* <Stats/> */}
      {modal ? <Modal callApi={callApi} setModal={setModal} data={modalData} /> : modalButton}
      {/* <RequestStats data={result || ''} loading={loading} /> */}
      <Table setModalData={modelDataCall} />
    </>
  );
}

export default RequestPortal;
