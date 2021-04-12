import React from 'react'

function request({url,setUrl,clients,setClient,time,setTime,connection,setConnection,method,setMethod}) {
    return (
        <div className='sm:flex sm:items-center justify-center h-80'>
					<form className='pt-6 pb-2 my-2'>
						<div className='mb-2'>
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
						<div className='mb-2'>
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
						<div className='mb-2'>
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
						<div className='mt-2 relative inline-flex  w-full'>
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
						<div className=' mt-6  relative inline-flex  w-full'>
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
					</form>	
				</div>
    )
}

export default request
