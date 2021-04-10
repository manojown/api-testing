import React, { useState } from "react";
import Table from "../Table";
import { pagination as paginationUtils } from "../../helpers/utility";
import { selectUtility, setPagination } from "../../features/utilitySlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function PerformanceTable({ setModal, data, isFetching }) {
	const dispatch = useDispatch();
	let { pagination } = useSelector(selectUtility);
	const paginate = (payload) => {
		let params = paginationUtils(payload, pagination);
		dispatch(setPagination(params));
	};
	
	let currentIndex = (pagination.page-1)*pagination.limit

	return (
		<>
			<div className='flex-col bg-white w-full mt-10'>
				<div className='w-full h-auto rounded bg-white	flex border-b-2 flex-row justify-between p-2'>
					<div href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
						All Server's Data
					</div>
					<button
						className='  bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'
						onClick={() => setModal(true)}>
						Create New Server
					</button>
				</div>
				{ isFetching ? "Loading ..." : <Table headings={headings} paginate={paginate} count={data && data.length} pagination={pagination}>
					{data && data.map((row, index) => tableData((index+currentIndex), row))}
				</Table>}
			</div>
		</>
	);
}

function CopyCommand(data){
	// console.log("data os",data.serverOS)
	let path = `connector-${data.serverOS.split(" ").join("-")}`
	let port = data.port ? data.port : "3004"

	let cmd = `sudo wget https://github.com/manojown/api-testing-connector/raw/master/download/${path} ; sudo chmod +x connector-* ; ./connector-* -token=${data.token} -url=https://api-testing-premium.herokuapp.com -port=${port}`;
	navigator.clipboard.writeText(cmd)
	toast.success("Copy from clipboard successfully.")

}
function tableData(index, data) {
	return (
		<tr>
			<td className='px-6 py-4 whitespace-nowrap text-center  '>
				<div className='text-sm text-gray-500'>{index + 1}</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-center  '>
	<div className='text-sm text-gray-500'>{data.name}</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-center  '>
				<div className='text-sm text-gray-500'>{data.token}</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-center  '>
				<div className='text-sm text-gray-500'>{data.serverIP}</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-center  '>
				<div className='text-sm text-gray-500'>{data.port}</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-center  '>
				<span className='ml-2 flex-1 w-0 truncate'>
							<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
					{Math.ceil((Date.now() - new Date(data.lastConnected*1000))/1000) < 60 ? "Connected" : "Not-Connected"}
					</span>
					</span>
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-center  '>
				<div className='text-sm text-gray-500'>{new Date(data.created*1000).toDateString()}</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap  text-sm font-medium text-center '>
				<span  className='text-indigo-600 hover:text-indigo-900' onClick={() => CopyCommand(data)}>
					Copy command
				</span>
			</td>
			<td className='px-6 py-4 whitespace-nowrap  text-sm font-medium text-center '>
				<a href='#' className='text-indigo-600 hover:text-indigo-900'>
					Disk
				</a>
			</td>
			
			<td className='px-6 py-4 whitespace-nowrap  text-sm font-medium text-center '>
				<a href='#' className='text-indigo-600 hover:text-indigo-900'>
					CPU
				</a>
			</td>
		
			<td className='px-6 py-4 whitespace-nowrap  text-sm font-medium text-center '>
				<a href='#' className='text-indigo-600 hover:text-indigo-900'>
					RAM
				</a>
			</td>
		</tr>
	);
}



let headings = [
	{ name: "Index" },
	{ name: "Name", accessor: "name" },
	{ name: "Token", accessor: "token" },
	{ name: "Server IP", accessor: "serverIP" },
	{ name: "Port", accessor: "port" },
	{ name: "Status", accessor: "lastConnected", type: "flag" },
	{ name: "Created", accessor: "created", type: "date" },
	{ name: "Disk Space", accessor: "diskSpace" },
	{ name: "RAM", accessor: "ram" },
	{ name: "CPU", accessor: "cpu", type: "flag" },
];
