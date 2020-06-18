//Initialization

const elm_DataUpload = document.getElementById('data-upload');
var data;

elm_DataUpload.addEventListener('change', (event) => {
	const fileList = event.target.files;
	fileList[0].text().then(function (text) {
		data = parseData(text, null);
	});
});

function postJSON(elm) {
	alert("Posting...")
	if (data !== null) {
		FBFRequest("https://us-central1-tluprojekt1.cloudfunctions.net/postExcel",
			{
				"k": "dknfkgnsdovmsdkmsm jksm",
				"data": data
			},
			function (response) {
				alert(JSON.stringify(response));
			},
			function (error) {
				alert(error);
			});
	}

}

function parseData(strData, strDelimiter){
	var raw_data = CSVToArray(strData, strDelimiter);
	var headers = raw_data[0];
	var output_data = {};

	var i;
	
	for (i = 0; i < headers.length; i++) {
		const column_header = headers[i];
		output_data[column_header] = [];
		var j;
		for (j = 1; j < raw_data.length; j++) {
			const row = raw_data[j];
			output_data[column_header].push(row[i]);
		}
		
	}

	alert(JSON.stringify(output_data));

	return output_data;
}

function CSVToArray(strData, strDelimiter) {
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || ",");

	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		(
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

			// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
		),
		"gi"
	);


	// Create an array to hold our data. Give the array
	// a default empty first row.
	var arrData = [[]];

	// Create an array to hold our individual pattern
	// matching groups.
	var arrMatches = null;


	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec(strData)) {

		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[1];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			strMatchedDelimiter !== strDelimiter
		) {

			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push([]);

		}

		var strMatchedValue;

		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[2]) {

			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			strMatchedValue = arrMatches[2].replace(
				new RegExp("\"\"", "g"),
				"\""
			);

		} else {

			// We found a non-quoted value.
			strMatchedValue = arrMatches[3];

		}


		// Now that we have our value string, let's add
		// it to the data array.
		arrData[arrData.length - 1].push(strMatchedValue);
	}

	// Return the parsed data.
	return (arrData);
}

function FBFRequest(url, dataJSON, onResponse, onError) {

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataJSON),
	})
		.then(function (response) {

			if (!response.ok) {
				throw Error(response.statusText);
			}

			return response.json();
		})
		.then(onResponse).catch(onError);

}