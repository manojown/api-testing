import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
const URL = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:8080';


function Stats() {
  const [result, setResult] = useState<[] | null>(null);
  const [loading, setLoading] = useState(false);

  const count = 0;
  useEffect(() => {
    axios.get(`${URL}/getCount`).then(response => {
      console.log(response.data);
      setResult(response.data);
      setLoading(false);
    });
  }, []);

  return <>{result ? GetStats(result) : ''}</>;
}

export default Stats;

function GetStats(result) {
  return (
    <div id='wrapper' className='max-w-xl px-4 py-4 mx-auto'>
      <div className='sm:grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3'>
        <div id='jh-stats-positive' className='flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded'>
          <div>
            <div>
              <p className='flex items-center justify-end text-green-500 text-md'>
                <span className='font-bold'>6%</span>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 fill-current' viewBox='0 0 24 24'>
                  <path
                    className='heroicon-ui'
                    d='M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z'
                  />
                </svg>
              </p>
            </div>
            <p className='text-3xl font-semibold text-center text-gray-800'>{numFormate(result.sucessRequests)}</p>
            <p className='text-lg text-center text-gray-500'>Total Success Request</p>
          </div>
        </div>

        <div id='jh-stats-negative' className='flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0'>
          <div>
            <div>
              <p className='flex items-center justify-end text-red-500 text-md'>
                <span className='font-bold'>6%</span>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 fill-current' viewBox='0 0 24 24'>
                  <path
                    className='heroicon-ui'
                    d='M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z'
                  />
                </svg>
              </p>
            </div>
            <p className='text-3xl font-semibold text-center text-gray-800'>{numFormate(result.networkFailed)}</p>
            <p className='text-lg text-center text-gray-500'>Total Failed Request</p>
          </div>
        </div>

        <div id='jh-stats-neutral' className='flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0'>
          <div>
            <div>
              <p className='flex items-center justify-end text-gray-500 text-md'>
                <span className='font-bold'>0%</span>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 fill-current' viewBox='0 0 24 24'>
                  <path className='heroicon-ui' d='M17 11a1 1 0 010 2H7a1 1 0 010-2h10z' />
                </svg>
              </p>
            </div>
            <p className='text-3xl font-semibold text-center text-gray-800'>{numFormate(result.perSecond)}</p>
            <p className='text-lg text-center text-gray-500'>Request Per Second</p>
          </div>
        </div>
        <div id='jh-stats-neutral' className='flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0'>
          <div>
            <div>
              <p className='flex items-center justify-end text-gray-500 text-md'>
                <span className='font-bold'>0%</span>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 fill-current' viewBox='0 0 24 24'>
                  <path className='heroicon-ui' d='M17 11a1 1 0 010 2H7a1 1 0 010-2h10z' />
                </svg>
              </p>
            </div>
            <p className='text-3xl font-semibold text-center text-gray-800'>
              {new Date(result.totalTime * 1000).toISOString().substr(11, 8)}
            </p>
            <p className='text-lg text-center text-gray-500'>Execution Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function numFormate(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(2) + 'M'; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}
function convertToMb(num) {
  return (num / 1024).toFixed(1);
}
