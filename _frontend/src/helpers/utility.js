exports.numFormate = function numFormate(num) {
	if (num > 999 && num < 1000000) {
		return (num / 1000).toFixed(2) + "K"; // convert to K for number from > 1000 < 1 million
	} else if (num > 1000000) {
		return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million
	} else if (num < 900) {
		return num; // if value < 1000, nothing to do
	}
};

exports.convertToMb = function convertToMb(num) {
	return (num / 1024).toFixed(1);
};

exports.pagination = (action, data) => {
  console.log("--data",data)
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
