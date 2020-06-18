mediapal.init();

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
