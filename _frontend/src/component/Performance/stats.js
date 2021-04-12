import React from 'react'
import {convertToMb,numFormate} from "../../helpers/utility"
function stats({data}) {
    let metrics = calculateState(data)
    return (
        <div>
            {aa(metrics)}
        </div>
    )
}

export default stats


function calculateState(data){
    let obj = {
		totalCounted: 0,
        failedRequest: 0,
        perSecond: 0,
        sucessRequests: 0,
		totalRequests: 0,
		networkFailed: 0,
		responseTime: 0,
		readThroughput: 0,
		writeThroughput: 0,
		averageTime : 0


    }

    data && data.length && data.forEach((current) => {
		if(current.perSecond){
			obj.totalCounted += 1
		}
        obj.sucessRequests += current.sucessRequests
        obj.failedRequest += current.failedRequest
        obj.totalRequests += current.totalRequests
		obj.perSecond += current.perSecond
		obj.networkFailed += current.networkFailed	
		obj.responseTime += current.responseTime
		obj.readThroughput += current.readThroughput
		obj.writeThroughput += current.writeThroughput
		obj.averageTime += current.totalTime


    })
		// console.log("current.sucessRequests",obj)

    return obj;
    // failedRequest: 4239
// networkFailed: 0

}

function aa(matrix){
    return (
        
<div className="flex-1 items-center bg-gray-50 dark:bg-gray-900">
	<div className="container max-w-6xl px-5 mx-auto my-4">
		<div className="grid gap-7 p-4 sm:grid-cols-2 lg:grid-cols-4">
			<div className="p-5 bg-white rounded shadow-sm">
				<div className="text-base text-purple-700 ">Total Requests</div>
				<div className="flex justify-center pt-1">
    <div className="text-2xl font-bold self-center text-purple-700 ">{numFormate(matrix.totalRequests)}</div>
					{/* <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                     <span>1.8%</span> 
					</span> */}
				</div>
			</div>
			<div className="p-5 bg-white rounded shadow-sm">
				<div className="text-base text-green-600 ">Success Request</div>
				<div className="flex justify-center   pt-1">
					<div className="text-2xl self-center font-bold text-green-600 ">{numFormate(matrix.sucessRequests)}</div>
				</div>
			</div>
			<div className="p-5 bg-white rounded shadow-sm">
				<div className="text-base text-red-600 ">Failed Request</div>
				<div className="flex justify-center items-center ">
					<div className="text-2xl  self-center font-bold text-red-600 ">{numFormate(matrix.failedRequest)}</div>
					
				</div>
			</div>
			<div className="p-5 bg-white rounded shadow-sm">
				<div className="text-base text-red-600 ">Netwrok Failed</div>
				<div className="flex justify-center items-center ">
					<div className="text-2xl  self-center font-bold text-red-600 ">{numFormate(matrix.networkFailed)}</div>
					
				</div>
			</div>
			<div className="p-5 bg-white rounded shadow-sm">
				<div className="text-base text-blue-600 ">Per Seconds </div>
				<div className="flex justify-center pt-1">
					<div className="text-2xl self-center font-bold text-blue-600 ">{numFormate(matrix.perSecond/matrix.totalCounted)}</div>
					
				</div>
			</div>
			<div className="p-5 bg-white rounded shadow-sm">
				<div className="text-base text-blue-600 ">Average Response Time</div>
				<div className="flex justify-center pt-1">
					<div className="text-2xl self-center font-bold text-blue-600 ">{parseInt((matrix.responseTime/matrix.totalCounted)/1000)}ms</div>
					
				</div>
			</div>
			<div className="p-5 bg-white rounded shadow-sm">
				<div className="text-base text-blue-600 ">Read Throughput</div>
				<div className="flex justify-center pt-1">
					<div className="text-2xl self-center font-bold text-blue-600 ">{convertToMb(matrix.readThroughput/matrix.totalCounted)}ps</div>
					
				</div>
			</div>
			<div className="p-5 bg-white rounded shadow-sm">
				<div className="text-base text-blue-600 ">Write Throughput</div>
				<div className="flex justify-center pt-1">
					<div className="text-2xl self-center font-bold text-blue-600 ">{convertToMb(matrix.writeThroughput/matrix.totalCounted)}ps</div>
					
				</div>
			</div>
		</div>
	</div>
</div>
    )
}
