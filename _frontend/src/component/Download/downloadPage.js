import React, { useState } from "react";

function DownloadPage({ downloads }) {
	let [search, setSearch] = useState([]);
	// let [searchResult,setSearchResult] = useState('')

	return (
		<div className=' self-center w-4/5  overflow-y-scroll'>

		<div className='bg-white px-4 flex py-5 sm:grid sm:grid-cols-3 sm:gap-4 mt-8 sm:px-6 flex justify-center items-center p-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  h-4/5'>
			{/* <h1>Download your Appropriate binary.</h1> */}
			<div className='flex self-center '>
				<span className='text-sm border  border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap'>
					Search:
				</span>
				<input
					name='field_name'
					className='border border-2 rounded-r px-4 py-2 w-full'
					type='text'
					placeholder='Search your connector by os and arch'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4 w-full h-full overflow-auto'>
				<ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
					{downloads.length ? getAllDownload(downloads, search) : ""}
				</ul>
			</dd>
		</div>
		</div>
	);
}

export default DownloadPage;

function getAllDownload(downloads, search) {
	let d = downloads
		.filter((download) => {
			if (search) {
				let pos = download.name.search(search);
				if (pos > -1) return true;
			} else return true;
		})
		.map((download) => {
			let [_, osName, arch] = download.name.split("-");
			return (
				<li className='pl-3 pr-4  py-3 flex items-center justify-between text-sm'>
					<div className='w-0 flex-1 flex items-center'>
						<svg
							className='flex-shrink-0 h-5 w-5 text-gray-400'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							aria-hidden='true'>
							<path
								fill-rule='evenodd'
								d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z'
								clip-rule='evenodd'
							/>
						</svg>
						<span className='ml-2 flex-1 w-0 truncate'>
							<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
								{osName}
							</span>
						</span>
						<span className='ml-2 flex-1 w-0 truncate'>
							<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
								{arch}
							</span>
						</span>
						<span className='ml-2 flex-1 w-0 truncate'>
							<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800'>
							{bytesToSize(download.size)}
							</span>
						</span>
					</div>
					<div className='ml-4 flex-shrink-0'>
						<a
							href={download.download_url}
							className='font-medium text-indigo-600 hover:text-indigo-500'>
							Download
						</a>
					</div>
				</li>
			);
		});
	if (d.length == 0) {
		return <h1>Sorry No match found...</h1>;
	}
	return d;
}


function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }
 