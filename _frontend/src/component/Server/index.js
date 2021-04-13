import React, { useState, useEffect } from "react";
import ServerTable from "./serverTable";
import { useDispatch, useSelector } from "react-redux";
import { clearState, selectServer, getAllServers, createServer } from "../../features/serverSlice";
import { selectUtility } from "../../features/utilitySlice";

import ServerForm from "./createForm";
import Modal from "../Modal";
import toast from "react-hot-toast";

function Server({ data }) {
	let [modal, setModal] = useState(false);
	// let [formData, setFormData] = useState(null);
	const dispatch = useDispatch();
	const { isSuccess, isError, errorMessage, message, server, isFetching } = useSelector(
		selectServer
	);
	const { pagination } = useSelector(selectUtility);
	const { page } = pagination;
	const notifySuccess = (msg) => toast.success(msg);
	const notifyFailed = (msg) => toast.error(msg);

	const callApi = (serverBody) => {
		dispatch(createServer(serverBody));
		setTimeout(() => dispatch(getAllServers(pagination)), 3000);
	};

	useEffect(() => {
		dispatch(getAllServers({ pagination }));
	}, [dispatch, page, pagination]);

	useEffect(() => {
		if (isError) {
			notifyFailed(errorMessage ? errorMessage : "Failed to Create new request.");
		}

		if (isSuccess) {
			dispatch(clearState());
			setModal(false);
			notifySuccess(message ? message : "Request created successfully.");
		}
	}, [dispatch, isError, isSuccess, errorMessage, message]);

	return (
		<div className='flex-1  self-center  w-4/5 overflow-y-scroll'>
			{modal ? (
				<Modal>
					<ServerForm setModal={setModal} callApi={callApi} />
				</Modal>
			) : (
				""
			)}
			<ServerTable setModal={setModal} data={server} isFetching={isFetching} />
		</div>
	);
}

export default Server;
