import React, { useState, useEffect } from "react";
import RequestTable from "../Table/requestTable";
import Modal from "../Modal";
import RequestForm from "../Form/requestForm";
import { useDispatch, useSelector } from "react-redux";
import {
	createRequest,
	clearState,
	selectRequest,
	getAllRequests,
} from "../../features/requestSlice";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {  selectUtility } from "../../features/utilitySlice";


function useQuery() {
	return new URLSearchParams(useLocation().search);
}
function Home({ data }) {
	let query = useQuery();
	let [modal, setModal] = useState(false);
	const { pagination } = useSelector(selectUtility);
	const { page, limit } = pagination

	const dispatch = useDispatch();
	const { isSuccess, isError, errorMessage, message, allRequest,isFetching } = useSelector(selectRequest);
	const notifySuccess = (msg) => toast.success(msg);
	const notifyFailed = (msg) => toast.error(msg);
	console.log("is fetching,",isFetching)
	const callApi = (request) => {
		dispatch(createRequest(request));
		setTimeout(() => dispatch(getAllRequests({limit,page})), 3000);
	};

	useEffect(() => {
		dispatch(getAllRequests({limit,page}));
	}, [page]);

	useEffect(() => {
		if (isError) {
			notifyFailed(errorMessage ? errorMessage : "Failed to Create new request.");
		}

		if (isSuccess) {
			notifySuccess(message ? message : "Request created successfully.");
			setModal(false);
			dispatch(clearState());
		}
	}, [isError, isSuccess]);
	return (
		<div className='flex-1 self-center h-5/6 w-4/5 overflow-y-scroll'>
			{modal ? (
				<Modal>
					<RequestForm setModal={setModal} callApi={callApi}  />
				</Modal>
			) : (
				""
			)}
			<RequestTable setModal={setModal} data={allRequest} isFetching={isFetching}/>
		</div>
	);
}

export default Home;
