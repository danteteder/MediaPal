mediapal.open(document.getElementById("mediapal-container"), {
    URL: "https://us-central1-tluprojekt1.cloudfunctions.net/getExcel",
    MAPBOX_TOKEN: "pk.eyJ1IjoicmtvbGsiLCJhIjoiY2syZGlnd3h1M2R3NDNnbXowdHZhaTR5byJ9.ihXxl5R1F5n-2Jw1A7UE8w",
    MAPBOX_SETTINGS: {
        container: 'map',
        style: 'mapbox://styles/rkolk/ckbgcwgia0o241inv1m513zdm',
        center: [20, 50],
        zoom: 3
    },
    COUNTRY_COLOR: 'rgba(63, 191, 63, 0.2)',
    COUNTRY_OUTLINE_COLOR: 'rgb(25, 76, 25)'
});