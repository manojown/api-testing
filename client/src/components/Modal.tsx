import React, { Component, useState } from 'react';


// let URL = 'http://35.154.34.85:1880/history'

// import RequestStats from './RequestStats';

function Modal(props) {
  const [url, setUrl] = useState(props.data ? props.data.url : '');
  const [ips, setIps] = useState('');
  const [clients, setClient] = useState<number>(props.data ? props.data.clients : 0);
  const [method, setMethod] = useState<string>(props.data ? props.data.method : '');
  const [time, setTime] = useState<number>(props.data ? props.data.time : 0);
  const [connection, setConnection] = useState<string>(props.data ? (props.data.keepAlive ? 'Keep-Alive' : '') : '');

  const [api, hitAPi] = useState<boolean>(false);
  const [postData, setPostData] = useState<string>('');

  //

  const sayHello = () => {
    const keepAlive = connection === 'Keep-Alive' ? true : false;
    const allIps = ips ? ips.split(",") : []
    const requestBody = {
      ips: allIps,
      url,
      clients,
      time,
      method,
      postData,
      keepAlive,
    };

    if (postData) {
      try {
        const data = JSON.parse(postData);
      } catch (e) {
        hitAPi(true);
        return;
      }
    }
    props.setModal(false);
    props.callApi(requestBody);
  };

  const closeModal = () => {
    props.setModal(false);
  };

  const messageFormate = 'Json formate is not valid';
  const methodComp =
    method == 'POST' || method == 'PUT' ? (
      <div className='md:flex-1 mt-2 mb:mt-0 md:px-3'>
        {api ? messageFormate : ''}
        <textarea
          className='w-full shadow-inner p-4 border-0'
          onChange={e => setPostData(e.target.value)}
          placeholder='Please add proper json formate.'
        ></textarea>
      </div>
    ) : (
      ''
    );
  return (
    <div className='h-1/2'>
      <div className='fixed pin w-full flex items-center'>
        <div className='fixed pin bg-black opacity-75 z-10'></div>

        <div className='relative mx-6 md:mx-auto w-full md:w-1/2 lg:w-1/3 z-20 m-8'>
          <div className='shadow-lg bg-white rounded-lg p-8'>
            <h1 className='text-center text-2xl text-green-dark'>New Test Suite</h1>

            <form className='pt-6 pb-2 my-2'>
            <div className='mb-4'>
                <input
                  type='text'
                  name=''
                  id=''
                  placeholder='Enter Connector ip only with comma seprated if multiple'
                  onChange={e => setIps(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3'
                />
              </div>
              <div className='mb-4'>
                <input
                  type='text'
                  name=''
                  value={url}
                  id=''
                  placeholder='Enter Url'
                  onChange={e => setUrl(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3'
                />
              </div>
              <div className='mb-6'>
                <input
                  type='number'
                  name='sd'
                  id='asd'
                  value={clients}
                  placeholder='Concurrent Request'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3'
                  onChange={e => setClient(parseInt(e.target.value))}
                />
              </div>
              <div className='mb-6'>
                <input
                  type='number'
                  name='sd'
                  id='asd'
                  value={time}
                  placeholder='Time In Secons'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3'
                  onChange={e => setTime(parseInt(e.target.value))}
                />
              </div>
              <div className='relative inline-flex  w-full'>
                <svg
                  className='w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 412 232'
                >
                  <path d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z' />
                </svg>
                <select
                  value={connection}
                  className='border border-gray-300 rounded-full w-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
                  onChange={e => setConnection(e.target.value)}
                >
                  <option>Select Connection Type</option>
                  <option>Keep-Alive</option>
                  <option>Normal</option>
                </select>
              </div>
              <div className=' mt-7  relative inline-flex  w-full'>
                <svg
                  className='w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 412 232'
                >
                  <path d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z' />
                </svg>
                <select
                  value={method}
                  className='border border-gray-300 rounded-full w-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
                  onChange={e => setMethod(e.target.value)}
                >
                  <option>Select Mathod</option>
                  <option>GET</option>
                  <option>POST</option>
                  <option>DELETE</option>
                  <option>PUT</option>
                </select>
              </div>

              {methodComp}
              {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover photo
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                </label>
                <p className="pl-1">or drag and drop post data file</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div> 
        </div> */}
              <div className='block md:flex justify-between items-center '>
                <button
                  type='button'
                  onClick={sayHello}
                  className='w-1/3 rounded-full  mt-4 lg-4 bg-blue-600 hover:bg-blue-500  text-white font-semibold p-3'
                >
                  Submit
                </button>
                <button
                  type='button'
                  onClick={closeModal}
                  className='w-1/3 rounded-full  mt-4 lg-4 bg-red-600 hover:bg-red-500 text-white font-semibold p-3'
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
