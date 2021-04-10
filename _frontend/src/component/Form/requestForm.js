import React, { Component, useState } from "react";

// let URL = 'http://35.154.34.85:1880/history'

// import RequestStats from './RequestStats';

function RequestForm(props) {
	const [url, setUrl] = useState(props.data ? props.data.url : "");
	const [ips, setIps] = useState("");
	const [clients, setClient] = useState(props.data ? props.data.clients : '');
	const [method, setMethod] = useState(props.data ? props.data.method : "");
	const [time, setTime] = useState(props.data ? props.data.time : '');
	const [connection, setConnection] = useState(
		props.data ? (props.data.keepAlive ? "Keep-Alive" : "") : ""
	);

	const [api, hitAPi] = useState(false);
	const [postData, setPostData] = useState("");

	const sayHello = () => {
		const keepAlive = connection === "Keep-Alive" ? true : false;
		const allIps = ips ? ips.split(",") : [];
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
				JSON.parse(postData);
			} catch (e) {
				hitAPi(true);
				return;
			}
		}
		props.callApi(requestBody);
	};


	const messageFormate = "Json formate is not valid";
	const methodComp =
		method == "POST" || method == "PUT" ? (
			<div className='md:flex-1 mt-2 mb:mt-0 md:px-3'>
				{api ? messageFormate : ""}
				<textarea
					className='w-full shadow-inner p-4 border-0'
					onChange={(e) => setPostData(e.target.value)}
					placeholder='Please add proper json formate.'></textarea>
			</div>
		) : (
			""
		);
	return (
		<div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
			<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
				<div className='sm:flex sm:items-center justify-center'>
					<form className='pt-6 pb-2 my-2'>
						{/* <div className='mb-4'>
							<input
								type='text'
								name=''
								id=''
								placeholder='Enter Connector ip only with comma seprated if multiple'
								onChange={(e) => setIps(e.target.value)}
								className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3'
							/>
						</div> */}
						<div className='mb-4'>
							<input
								type='text'
								name=''
								value={url}
								id=''
								placeholder='Enter Url'
								onChange={(e) => setUrl(e.target.value)}
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
								onChange={(e) => setClient(parseInt(e.target.value))}
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
								onChange={(e) => setTime(parseInt(e.target.value))}
							/>
						</div>
						<div className='relative inline-flex  w-full'>
							<svg
								className='w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 412 232'>
								<path d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z' />
							</svg>
							<select
								value={connection}
								className='border border-gray-300 rounded-full w-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
								onChange={(e) => setConnection(e.target.value)}>
								<option>Select Connection Type</option>
								<option>Keep-Alive</option>
								<option>Normal</option>
							</select>
						</div>
						<div className=' mt-7  relative inline-flex  w-full'>
							<svg
								className='w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 412 232'>
								<path d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z' />
							</svg>
							<select
								value={method}
								className='border border-gray-300 rounded-full w-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
								onChange={(e) => setMethod(e.target.value)}>
								<option>Select Method</option>
								<option>GET</option>
								<option>POST</option>
								<option>DELETE</option>
								<option>PUT</option>
							</select>
						</div>

						{methodComp}
					</form>
				</div>
			</div>
			<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
				<button
					onClick={sayHello}
					type='button'
					className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'>
					Create
				</button>
				<button
					onClick={() => props.setModal(false)}
					type='button'
					className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
					Cancel
				</button>
			</div>
		</div>
	);
}

export default RequestForm;
