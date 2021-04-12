import React from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
function header({ headers, setHeaderData }) {
   

	return (
		<div>
			<div className='md:flex-1 mt-2 mb:mt-0 md:px-3'>
				<JSONInput
					onChange={(e) => setHeaderData(e.jsObject)}
                   	placeholder = { headers && headers[0] }
					id='a_unique_id'
					locale={locale}
					width='100%'
					height='330px'
				/>
			</div>
		</div>
	);
}

export default header;
