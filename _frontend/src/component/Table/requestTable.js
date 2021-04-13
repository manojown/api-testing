import React from "react";
import Table from "./";
import { useHistory } from "react-router-dom";
import Time from "../_Helpers/TImer";
import { pagination as paginationUtils } from "../../helpers/utility";
import { selectUtility, setPagination } from "../../features/utilitySlice";
import { clearState } from "../../features/requestSlice";
// import Tooltip from "../_Shared/tooltip";

import { useDispatch, useSelector } from "react-redux";

export default function RequestTable({ setModal, data, isFetching, setClone }) {
	let history = useHistory();
	const dispatch = useDispatch();
	let { pagination } = useSelector(selectUtility);
	const paginate = (payload) => {
		let params = paginationUtils(payload, pagination);
		dispatch(clearState());
		dispatch(setPagination(params));
	};
	const clone = (data) => {
		setModal(true);
		setClone(data);
	};
	let currentIndex = (pagination.page - 1) * pagination.limit;

	return (
		<>
			<div className='flex flex-col bg-white mt-10'>
				<div className=' h-auto rounded bg-white	flex border-b-2 flex-row justify-between p-2'>
					<div href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
						All Requested Url's
					</div>
					{/* <h1 className=" self-center text-gray-500">All Requested Url's</h1> */}
					<button
						className='  bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'
						onClick={() => {
							setModal(true);
						}}>
						Add New Request
					</button>
				</div>
				{isFetching ? (
					"loading ..."
				) : (
					<Table
						pagination={pagination}
						headings={headings}
						paginate={paginate}
						count={data && data.length}>
						{data &&
							data.length &&
							data.map((row, index) => tableData(index + currentIndex, row, history, clone))}
					</Table>
				)}
			</div>
		</>
	);
}

function tableData(index, data, history, clone) {
	return (
		<tr key={index}>
			<td className='px-6 py-4 whitespace-nowrap text-center  '>
				<div className='text-sm text-gray-500'>{index + 1}</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-center '>
				<div className='flex justify-center text-sm text-gray-500'>
					{/* <Tooltip tooltipText={data.url}> */}
					{data.url && data.url.length ? data.url.split("/")[2] : data.url}
					{/* </Tooltip> */}
				</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-center '>
				<div className='text-sm text-gray-500'>{data.clients}</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-center '>
				<div className='text-sm text-gray-500'>{data.time}</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap  text-sm font-medium text-center '>
				<button
					className='text-indigo-600 hover:text-indigo-900 self-center'
					onClick={() => history.push(`performace?id=${data.id}`)}>
					{isTimer(data.created, data.time)}
				</button>
			</td>
			<td className='px-6 py-4 whitespace-nowrap  text-sm font-medium text-center '>
				<span className='text-indigo-600 hover:text-indigo-900' onClick={() => clone(data)}>
					Clone
				</span>
			</td>
			{/* <td className='px-6 py-4 whitespace-nowrap  text-sm font-medium text-center '>
				<span  className='text-red-600 hover:text-red-900'>
					Delete 
				</span>
			</td> */}
		</tr>
	);
}

function isTimer(time, seconds) {
	let timeDiff = Math.ceil((Date.now() - new Date(time * 1000)) / 1000);
	let currentDiff = seconds - timeDiff + 5;
	if (timeDiff < seconds) {
		return <Time seconds={currentDiff} />;
	} else return "Open";
}
let headings = [
	{ name: "Index" },
	{ name: "Url" },
	{ name: "Clients" },
	{ name: "Times" },
	{ name: "Result" },
	{ name: "Edit" },
	// { name: "Delete" },
];
