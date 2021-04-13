import React, {useEffect} from 'react'
import Stats from '../_Shared/stats'
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
    },[dispatch])

    const getUrl = (urlRecived) => {
        dispatch(getRequestByUrl({url:urlRecived}))
    }
    let obj = {}
    allRequest && allRequest.length && allRequest.forEach(data => {
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
