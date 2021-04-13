import React, { useState } from "react";
import { selectDownload, downloadPaths } from "../../features/downloadSlice";
import { useDispatch, useSelector } from "react-redux";


function ServerForm(props) {
	const [serverIP, setServerIP] = useState(props.data ? props.data.serverIP : "");
	const [name, setName] = useState(props.data ? props.data.name : "");
	const [port, setPort] = useState(props.data ? props.data.port : "");
	const [serverOS, setServer] = useState(props.data ? props.data.serverOS : "");

	const dispatch = useDispatch();
	const { downloads } = useSelector(selectDownload);

	const clickToDownloadOs = () => {
		dispatch(downloadPaths());
	};
	const sayHello = () => {
		const requestBody = {
			serverIP,
			name,
			port,
			serverOS,
		};
		props.callApi(requestBody);
	};

	return (
		<div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
			<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
				<div className='sm:flex sm:items-center justify-center'>
					<form className='pt-6 pb-2 my-2 w-full'>
						<div className=' mt-7  relative inline-flex  w-full mb-8'>
							<svg
								className='w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 412 232'>
								<path d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z' />
							</svg>
							<select
								onClick={clickToDownloadOs}
								value={serverOS}
								className='border border-gray-300 rounded-full w-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
								onChange={(e) => setServer(e.target.value)}>
								<option>Select Server Type</option>
								{downloads
									? downloads.map((data) => (
											<option>{data.name.split("-").slice(1).join(" ")}</option>
									  ))
									: ""}
							</select>
						</div>
						<div className='mb-6'>
							<input
								type='text'
								name='port'
								id='port'
								value={port}
								placeholder='Enter Port where you want to run our client.'
								className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3'
								onChange={(e) => setPort(e.target.value)}
							/>
						</div>
						<div className='mb-4'>
							<input
								type='text'
								name=''
								value={serverIP}
								id=''
								placeholder='Enter Server IP Address'
								onChange={(e) => setServerIP(e.target.value)}
								className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3'
							/>
						</div>
						<div className='mb-6'>
							<input
								type='text'
								name='name'
								id='name'
								value={name}
								placeholder='Server Name'
								className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3'
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
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

export default ServerForm;
