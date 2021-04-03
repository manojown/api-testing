import React from 'react';
// import axios from 'axios'
class Table extends React.Component<any, boolean> {
  render() {
    console.log('this.props :::', this.props);
    const loader = <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20' />;

    return <div className='flex justify-center container mx-auto px-4 sm:px-8'>{table(this.props)}</div>;
  }
}
export default Table;

function table(props) {
  console.log('called table', props.data);

  return (
    <div className='py-8'>
      <div>
        <h2 className='text-2xl font-semibold leading-tight'>Result</h2>
      </div>
      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'></div>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                Topic
              </th>

              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                ServerIP
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                Time
              </th>
              {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th> */}
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                Start Service
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                Edit Service
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                Delete Service
              </th>
            </tr>
          </thead>
          <tbody>{props.data.map(row => generateRow(row, props.setData))}</tbody>
        </table>
      </div>
    </div>
  );
}

function generateRow(row, setData) {
  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          {/* <div className="flex-shrink-0 h-10 w-10">
          <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="" />
        </div> */}
          <div className='ml-4'>
            <div className='text-sm text-gray-500'>
              <span className='px-2 inline-flex text-xs leading-5 font-semibold  bg-green-100 text-green-800'>{row.method}</span>
              <span className='px-2 inline-flex text-xs leading-5 font-semibold  text-green-800'>{row.url}</span>
            </div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        {/* <div className="text-sm text-gray-900">Regional Paradigm Technician</div> */}
        <div className='text-sm text-gray-500'>{row.clients}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>{row.time} Seconds</div>
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    <span className="px-2 inline-flex text-xs leading-5 font-semibold  bg-green-200 text-green-800">
        Active
      </span>
    </td> */}
      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
        <button>
          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 hover:bg-green-500  hover:text-white  text-green-800'>
            Start
          </span>
        </button>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
        <button
          onClick={() => {
            console.log('called data,row', row);
            setData(row);
          }}
        >
          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-200 hover:bg-indigo-500 hover:text-white text-white-800'>
            Edit
          </span>
        </button>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
        <button>
          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300 hover:bg-red-500 hover:text-white text-white-800'>
            Delete
          </span>
        </button>
      </td>
    </tr>
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
