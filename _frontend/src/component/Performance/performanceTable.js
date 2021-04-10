import React from "react";
import Table from "../Table";
import { pagination as paginationUtils } from "../../helpers/utility";
import { selectUtility, setPagination } from "../../features/utilitySlice";
import { useDispatch, useSelector } from "react-redux";

export default function PerformanceTable({ data, isFetching }) {
	const dispatch = useDispatch();
	let { pagination } = useSelector(selectUtility);
	const paginate = (payload) => {
		let params = paginationUtils(payload, pagination);
		dispatch(setPagination(params));
	};
	let currentIndex = (pagination.page-1)*pagination.limit
	return (
		<>
			<div className='flex-1 flex-col bg-white w-full overflow-y-scroll'>
				<div className='w-full  rounded bg-white	flex border-b-2 flex-row justify-between p-2'>
					<div href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
						All Performance Data
					</div>
				</div>

				{ isFetching ? "loading ..." : <Table headings={headings} pagination={pagination} paginate={paginate} count={data && data.length}>
					{data && data.map((row, index) => <tr key={index}>{tableData(index+currentIndex, row, headings)}</tr>)}
	</Table> }
			</div>
		</>
	);
}

function tableData(index, data, columns) {
	return columns.map((column) => {
		if (!column.accessor) {
			return (
				<td className='px-6 py-4 whitespace-nowrap text-center  '>
					<div className='text-sm text-gray-500'>{index + 1}</div>
				</td>
			);
		}
		return (
			<td className='px-6 py-4 whitespace-nowrap text-center'>
				<div className='text-sm text-gray-500'>{typeFind(column.type, data[column.accessor])}</div>
			</td>
		);
	});
}

function typeFind(type = "no-type", value) {
	switch (type) {
		case "date":
			return new Date(Number(value * 1000)).toLocaleDateString();
		default:
			return value;
	}
}
let headings = [
	{ name: "Index" },
	{ name: "Url", accessor: "requestUrl" },
	{ name: "Responder", accessor: "responder" },
	{ name: "Total Time", accessor: "totalTime" },
	{ name: "Total Requests", accessor: "totalRequests" },
	{ name: "Sucess Requests", accessor: "sucessRequests" },
	{ name: "Failed Request", accessor: "failedRequest" },
	{ name: "Network Failed", accessor: "networkFailed" },
	// { name: "Write Throughput", accessor: "writeThroughput" },
	// { name: "Read Throughput", accessor: "readThroughput" },
	{ name: "Per Second", accessor: "perSecond" },
	{ name: "Created", accessor: "created", type: "date" },
];
