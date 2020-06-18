var wearable = JSON.parse(localStorage.getItem("wearable"));
document.getElementById("wearableData").innerHTML = JSON.stringify(wearable);

var defaultContentFiles = document.getElementById("content-default").files;
var serviceContentFiles = document.getElementById("content-service").files;

var contentDefault, contentService;

var frDefault, frService = new FileReader();

frDefault.onload = function (e) {
    var result = JSON.parse(e.target.result);
    var formatted = JSON.stringify(result, null, 2);
    contentDefault = JSON.parse(formatted);
}

frService.onload = function (e) {
    var result = JSON.parse(e.target.result);
    var formatted = JSON.stringify(result, null, 2);
    contentService = JSON.parse(formatted);
}



function updateWearableContent() {

    var content = {
    }

    if (contentDefault !== null) {
        content.default = contentDefault;
    }
    if (contentService !== null) {
        content.service = contentService;
    }

    FBFRequest("https://us-central1-hxfitness-f72d0.cloudfunctions.net/postUserContent",
        {
            "k": "kgfskonishjopw knjsdjkdjkodsjfosjdksmgopfsjokbpw osdfksdksdopmsokdmfs9 090  87 678 tgu ni jj i0j ih 8y 89 io",
            "credential": localStorage.getItem("wearableID"),
        },
        function (response) {
            openWearable(response.wearable);
        },
        function (error) {
            alert(error);
        });
}