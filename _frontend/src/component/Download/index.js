import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DownloadPage from "./downloadPage";
import toast from "react-hot-toast";
import { selectDownload, downloadPaths, clearState } from "../../features/downloadSlice";

function Server() {
	const dispatch = useDispatch();
	const { isSuccess, isError, errorMessage, message, downloads } = useSelector(selectDownload);
	const notifySuccess = (msg) => toast.success(msg);
	const notifyFailed = (msg) => toast.error(msg);

	useEffect(() => {
		dispatch(downloadPaths());
	}, [dispatch]);

	useEffect(() => {
		if (isError) {
			notifyFailed(errorMessage ? errorMessage : "Failed to Get files from Github.");
		}

		if (isSuccess) {
			dispatch(clearState());
			notifySuccess(message ? message : "Files recived successfully.");
		}
	}, [dispatch, isError, isSuccess, errorMessage, message]);

	return (
		<div className='flex-1  self-center  w-4/5 overflow-y-scroll '>
			{downloads ? <DownloadPage downloads={downloads} /> : " loading ..."}
		</div>
	);
}

export default Server;
