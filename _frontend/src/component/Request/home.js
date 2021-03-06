import React, { useState, useEffect } from "react";
import RequestTable from "../Table/requestTable";
import Modal from "../Modal";
import RequestForm from "./requestForm";
import { useDispatch, useSelector } from "react-redux";
import {
	createRequest,
	clearState,
	selectRequest,
	getAllRequests,
} from "../../features/requestSlice";
import toast from "react-hot-toast";
import { selectUtility } from "../../features/utilitySlice";

function Home() {
	let [modal, setModal] = useState(false);
	let [clone, setClone] = useState(false);

	const { pagination } = useSelector(selectUtility);
	const { page, limit } = pagination;

	const dispatch = useDispatch();
	const { isSuccess, isError, errorMessage, message, allRequest, isFetching } = useSelector(
		selectRequest
	);
	const notifySuccess = (msg) => toast.success(msg);
	const notifyFailed = (msg) => toast.error(msg);
	const callApi = (request) => {
		dispatch(createRequest(request));
		setTimeout(() => dispatch(getAllRequests({ limit, page })), 3000);
	};

	useEffect(() => {
		dispatch(getAllRequests({ limit, page }));
	}, [dispatch, page, limit]);

	useEffect(() => {
		if (isError) {
			notifyFailed(errorMessage ? errorMessage : "Failed to Create new request.");
		}

		if (isSuccess) {
			notifySuccess(message ? message : "Request created successfully.");
			setModal(false);
			dispatch(clearState());
		}
	}, [dispatch, isError, isSuccess, errorMessage, message]);
	return (
		<div className='flex-1 self-center h-5/6 w-4/5 overflow-y-scroll'>
			{modal ? (
				<Modal>
					<RequestForm setModal={setModal} callApi={callApi} data={clone} />
				</Modal>
			) : (
				""
			)}
			<RequestTable
				setModal={setModal}
				data={allRequest}
				isFetching={isFetching}
				setClone={setClone}
			/>
		</div>
	);
}

export default Home;
