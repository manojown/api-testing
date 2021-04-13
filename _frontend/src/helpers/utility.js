exports.numFormate = function numFormate(num) {
	if (num > 999 && num < 1000000) {
		return (num / 1000).toFixed(2) + "K"; // convert to K for number from > 1000 < 1 million
	} else if (num > 1000000) {
		return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million
	} else {
		return num; 
	}
};

exports.convertToMb = (bytes) => {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};
exports.convertToSeconds = (ms) => {
	// var sizes = ['ms', 's', 'm'];
	if (ms < 1000) return parseInt(ms)+'ms';
	if (ms > 1000 && ms < 60000) return Math.floor(ms/1000)+'s'
	else return Math.floor(ms/60000)+'m'

};

exports.pagination = (action, data) => {
	let pagination = { 
    page: parseInt(data.page),
    limit: parseInt(data.limit)
   };
	switch (action) {
		case "PREV":
			if (data.page > 1) {
				pagination.page -= 1;
			}
			return pagination;
		case "NEXT":
			if (data.page) {
				pagination.page += 1;
      }
			return pagination;

    default: 
      return pagination;
	}
};
