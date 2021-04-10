import React from "react";

function index({ headings, children, paginate, pagination, count }) {
	return (
		<div className='flex-1 flex-col w-full  '>
			<div className='-my-2 sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<div className='shadow border-b border-gray-200 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>{getHeader(headings)}</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200 overflow-y-scroll'>
								{children}
							</tbody>
						</table>
						<div className='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          '>
							{/* <span className='text-xs xs:text-sm text-gray-900'>Showing 1 to 4 of 50 Entries</span> */}
							<div className='inline-flex mt-2 xs:mt-0'>
								<button className='text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l' disabled={pagination.page > 1 ? false : true} onClick={() => paginate("PREV")}>
									Prev
								</button>
								<button className='text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r' disabled={count < pagination.limit ? true : false}  onClick={() => paginate("NEXT")}>
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default index;

function getHeader(headings) {
	return headings.map((heading) => {
		return (
			<th
				scope='col'
				className=' py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
				{heading.name}
			</th>
		);
	});
}
