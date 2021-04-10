import React, { useEffect } from "react";
import PerformanceTable from "./performanceTable";
import { useDispatch,useSelector } from "react-redux";
import {  clearState , selectPerformance , getAllPerformances } from "../../features/performanceSlice";
import {  clearState as clearStatsForUtility , selectUtility } from "../../features/utilitySlice";

import toast from "react-hot-toast";
import {
	useLocation,
  } from "react-router-dom";
import Stats from "../Performance/stats"

function useQuery() {
	return new URLSearchParams(useLocation().search);
  }
function Home({ data }) {
	// console.log("+++opaginationcalled in index",pageNumber)

	let query = useQuery();
	let id = query.get("id") ?  query.get("id"): null;

	const dispatch = useDispatch()
	const {  isSuccess, isError, errorMessage, message, performance, isFetching  } = useSelector(selectPerformance);
	const { pagination  } = useSelector(selectUtility);

	const notifySuccess = (msg) => toast.success(msg);
	const notifyFailed = (msg) => toast.error(msg);
	let {limit,page} = pagination

	useEffect(() => {
		dispatch(clearStatsForUtility())
	},[])

	useEffect(() => {
		dispatch(getAllPerformances({id,limit,page}))
	},[page])

	useEffect(() => {
		if (isError) {
            notifyFailed(errorMessage ? errorMessage : "Failed to Create new request.")
		}

        if (isSuccess) {
            dispatch(clearState());
            notifySuccess(message ? message : "Request created successfully.")
        }
        
	
	}, [isError, isSuccess]);

	return (

		<div className='flex-1  self-center  w-4/5 overflow-y-scroll '>
			<div className=" ">
			{performance ? <Stats  data={performance}/> : ""}
			<PerformanceTable data={performance} pagination={pagination} isFetching={isFetching} />
			</div>
		</div>
	);
}

export default Home;
