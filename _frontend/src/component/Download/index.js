import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import DownloadPage from "./downloadPage"
import toast from "react-hot-toast";
import { selectDownload, downloadPaths, clearState } from '../../features/downloadSlice';


function Server({ data }) {
	const dispatch = useDispatch()
	const {  isSuccess, isError, errorMessage, message, downloads } = useSelector(selectDownload);
	const notifySuccess = (msg) => toast.success(msg);
	const notifyFailed = (msg) => toast.error(msg);
	

   
	useEffect(() => {
		dispatch(downloadPaths())
	},[])
	useEffect(() => {
		if (isError) {
            notifyFailed(errorMessage ? errorMessage : "Failed to Get files from Github.")
		}

        if (isSuccess) {
		    // dispatch(getAllServers())
            dispatch(clearState());
            notifySuccess(message ? message : "Files recived successfully.")
        }
        
	
	}, [isError, isSuccess]);

	return (
        // <div className="flex justify-center items-center p-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='flex-1  self-center  w-4/5 overflow-y-scroll '>
       { downloads ?  <DownloadPage downloads={downloads} /> : " loading ..." }
       </div>
            // </div>
	);
}

export default Server;
