import React from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
function body({ postData, setPostData }) {
	return (
		<div>
			<div className='md:flex-1 mt-2 mb:mt-0 md:px-3'>
				<JSONInput
					id='a_unique_id'
					placeholder={postData && postData[0]}
					onChange={(e) => setPostData(e.jsObject)}
					locale={locale}
					width='100%'
					height='330px'
				/>
				{/* <textarea
                    value={postData}
					className='w-full shadow-inner p-4 border-0 h-80'
					onChange={(e) => setPostData(e.target.value)}
					placeholder='Please add proper json formate.'></textarea> */}
			</div>
		</div>
	);
}

export default body;
