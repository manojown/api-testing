import React, { Component, useState } from "react";
import Header from "./header";
import Body from "./body";
import Request from "./request";

// let URL = 'http://35.154.34.85:1880/history'

// import RequestStats from './RequestStats';

function RequestForm(props) {
	const [url, setUrl] = useState(props.data ? props.data.url : "");
	let [headers, setHeaderData] = useState(props.data ? props.data.headers : {});
	let [tab, setTab] = useState("request");
	const [clients, setClient] = useState(props.data ? props.data.clients : "");
	const [method, setMethod] = useState(props.data ? props.data.method : "");
	const [time, setTime] = useState(props.data ? props.data.time : "");
	const [connection, setConnection] = useState(
		props.data ? (props.data.keepAlive ? "Keep-Alive" : "") : ""
	);

	let [postData, setPostData] = useState(props.data ? props.data.postData : {});

	const sayHello = () => {
		const keepAlive = connection === "Keep-Alive" ? true : false;

		const requestBody = {
			url,
			clients,
			time,
			method,
			postData,
			headers,
			keepAlive,
		};
		props.callApi(requestBody);
	};


	const activeTab = () => {
		if (tab == "headers") {
			return <Header headers={headers} setHeaderData={setHeaderData} />;
		} else if (tab == "body") {
			return <Body postData={postData} setPostData={setPostData} />;
		} else {
			return <Request
				setUrl={setUrl}
				setClient={setClient}
				setMethod={setMethod}
				setTime={setTime}
				setConnection={setConnection}
				url={url}
				clients={clients}
				method={method}
				time={time}
				connection={connection}
			/>;
		}
	};
	return (
		<div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
			<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>{TabComponent(tab, setTab)}
			{activeTab()}
			</div>
			<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
				<button
					onClick={sayHello}
					type='button'
					className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'>
					Create
				</button>
				<button
					onClick={() => props.setModal(false)}
					type='button'
					className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
					Cancel
				</button>
			</div>
		</div>
	);
}

export default RequestForm;

function TabComponent(selectedTab, setTab) {
	const allTabs = tabs.map((tab) => (
		<li class='-mb-px mr-1' onClick={() => setTab(tab.type)}>
			<span
				className={`bg-white inline-block ${
					tab.type == selectedTab && "border-l border-t border-r"
				} rounded-t py-2 px-4 text-blue-dark font-semibold`}>
				{tab.name}
			</span>
		</li>
	));
	return <ul class='list-reset flex border-b'>{allTabs}</ul>;
}

const tabs = [
	{ name: "Request", type: "request" },
	{ name: "Headers", type: "headers" },
	{ name: "Body", type: "body" },
];
