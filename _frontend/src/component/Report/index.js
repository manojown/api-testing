import React, {useEffect,useState} from 'react'
import Stats from './stats'
import Search from './search'
import { useDispatch, useSelector } from "react-redux";
import {
	selectRequest,
    getAllRequests,
    getRequestByUrl,
} from "../../features/requestSlice";
	

function Index() {
    const dispatch = useDispatch();
	const { allRequest, requestByUrl, isFetching } = useSelector(selectRequest);
	useEffect(() => {
        dispatch(getAllRequests({}))
    },[])

    const getUrl = (urlRecived) => {
        dispatch(getRequestByUrl({url:urlRecived}))
    }
    let obj = {}
    allRequest && allRequest.forEach(data => {
        obj[data.url] = data.url
    })
    let uniqueUrl = Object.keys(obj)

    return (
        <div className='flex-1  self-center  w-4/5  '>
            Report
            <Search uniqueUrl={uniqueUrl} getUrl={getUrl}/>
            { requestByUrl &&  <Stats data={requestByUrl}/>}
            { isFetching ? "Loading ..." : ""}

        </div>
    )
}

export default Index
