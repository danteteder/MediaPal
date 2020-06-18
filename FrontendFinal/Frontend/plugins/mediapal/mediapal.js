let data;
let mediapal = {};
let map;
let popup1;
let popup2;
let SETTINGS = {};

let elm_SearchCard, elm_CardWindow, elm_SearchBox, elm_SearchBoxInput;

mediapal.open = function (container, settings) {
    container.innerHTML = `
    
    <div id="map"></div>

    <div class="search_box" id="search_box">
        <input type="text" id="search_box_input" onchange="_searchChange(this)" onclick="_searchChange(this)" oninput="_searchChange(this)"
            placeholder="What are you looking for?">
        <i class="fas fa-search"></i>
    </div>

    <div id="search_card" class="card">
        <br>
    </div>

    <div id="card_window" class="card_window">
        <br>
    </div>
    
    `
    if (settings !== null) {
        SETTINGS = settings;
    }
    if (document.getElementById("map")) {
        _init();
    }
}

function _init() {
    _prepareUI();
    _getData();
    _buildMap();
}

function _prepareUI() {
    elm_SearchCard = document.getElementById("search_card");
    elm_SearchCard.style.display = "none";
    elm_CardWindow = document.getElementById("card_window");
    elm_CardWindow.style.display = "none";
    elm_SearchBox = document.getElementById("search_box");
    elm_SearchBoxInput = document.getElementById("search_box_input");
}

function _getData() {
    _FBFRequest(SETTINGS.URL,
        {
            "k": "dknfkgnsdovmsdkmsm jksm"
        },
        function (response) {
            data = response.data;
            _prepareData();
            _prepareSearch();
        },
        function () {
            alert("Failed to fetch data from server, please refresh...");
        });
}

function _prepareData() {
    // Compiling countries database
    // Service name, logo
    let prepared = {};

    if (data.raw.data.hasOwnProperty("Countries")) {
        let countries = {};
        let countries_raw = data.raw.data.Countries;
        let services_raw = data.raw.data.Service;
        let urls_raw = data.raw.data.URL;
        let pricing_raw = data.raw.data.Price_Month;
        let genre_raw = data.raw.data.Genre;

        if (data.raw.data.hasOwnProperty("Icon")) {
            icons_raw = data.raw.data.Icon;
        }

        for (let i = 0; i < countries_raw.length; i++) {
            let rowCountriesArray = countries_raw[i].split(",");

            for (let j = 0; j < rowCountriesArray.length; j++) {
                let country = rowCountriesArray[j];

                if (countries.hasOwnProperty(country)) {
                    countries[country].push({
                        "name": services_raw[i],
                        "logo": (icons_raw != null ? (icons_raw[i]) : ("-")),
                        "url": urls_raw[i],
                        "row": i,
                        "pricing": pricing_raw[i]
                    })
                } else {
                    countries[country] = [];
                    countries[country].push({
                        "name": services_raw[i],
                        "logo": (icons_raw != null ? (icons_raw[i]) : ("-")),
                        "url": urls_raw[i],
                        "row": i,
                        "pricing": pricing_raw[i]
                    })
                }
            }
        }
        prepared.countries = countries;
    }
    data.prepared = prepared;
}

function _prepareSearch() {
    let searchArray = [];
    let countries = data.prepared.countries;
    let categories = {};
    let genres = {};

    if (data.raw.data.hasOwnProperty("Category")) {
        let categories_raw = data.raw.data.Category;
        let services_raw = data.raw.data.Service;
        let urls_raw = data.raw.data.URL;
        let pricing_raw = data.raw.data.Price_Month;
        let genre_raw = data.raw.data.Genre;

        let icons_raw;
        if (data.raw.data.hasOwnProperty("Icon")) {
            icons_raw = data.raw.data.Icon;
        }

        for (let i = 0; i < categories_raw.length; i++) {
            let categoryRow = categories_raw[i];
            if (categories.hasOwnProperty(categoryRow)) {
                categories[categoryRow].push({
                    "name": services_raw[i],
                    "logo": (icons_raw != null ? (icons_raw[i]) : ("-")),
                    "url": urls_raw[i],
                    "row": i,
                    "pricing": pricing_raw[i]
                });
            } else {
                categories[categoryRow] = [];
                categories[categoryRow].push({
                    "name": services_raw[i],
                    "logo": (icons_raw != null ? (icons_raw[i]) : ("-")),
                    "url": urls_raw[i],
                    "row": i,
                    "pricing": pricing_raw[i]
                });
            }

            let genreRow = genre_raw[i];
            let genreRowArray = genreRow.split(",");
            for (let j = 0; j < genreRowArray.length; j++) {
                const genre = genreRowArray[j];
                if (genres.hasOwnProperty(genre)) {
                    genres[genre].push({
                        "name": services_raw[i],
                        "logo": (icons_raw != null ? (icons_raw[i]) : ("-")),
                        "url": urls_raw[i],
                        "row": i,
                        "pricing": pricing_raw[i]
                    });
                } else {
                    genres[genre] = []
                    genres[genre].push({
                        "name": services_raw[i],
                        "logo": (icons_raw != null ? (icons_raw[i]) : ("-")),
                        "url": urls_raw[i],
                        "row": i,
                        "pricing": pricing_raw[i]
                    });
                }
            }
        }
    }

    for (const key in countries) {
        if (countries.hasOwnProperty(key)) {
            const element = countries[key];
            searchArray.push({"key": key, "content": element});
        }
    }

    for (const key in categories) {
        if (categories.hasOwnProperty(key)) {
            const element = categories[key];
            searchArray.push({"key": key, "content": element});
        }
    }

    for (const key in genres) {
        if (genres.hasOwnProperty(key)) {
            const element = genres[key];
            searchArray.push({"key": key, "content": element});
        }
    }

    data.search = searchArray;
}

function _searchChange(elm) {
    if (data !== null) {
        _searchQuery(elm.value);
    }
}

function _searchQuery(query) {
    if (query === "") {
        elm_SearchCard.innerHTML = "";
    } else {
        let results = [];

        for (let i = 0; i < data.search.length; i++) {
            const element = data.search[i];
            if (element.key.toLowerCase().includes(query.toLowerCase())) {
                results.push(element);
            }
        }

        if (results.length !== 0) {
            _buildSearchResults(results);
        } else {
            elm_SearchCard.innerHTML = "";
        }

    }
}

function _buildSearchResults(results) {
    let elm_header = document.createElement("div");
    elm_SearchCard.style.display = "block";
    elm_SearchCard.innerHTML = "";
    elm_header.className = "card_header";
    elm_header.innerHTML = "Results: ";
    elm_SearchCard.appendChild(elm_header);

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        let elm_searchItem = document.createElement("div");
        elm_searchItem.className = "search_item";
        elm_searchItem.onclick = function () {
            _searchResultClick(JSON.stringify(result));
        }

        elm_searchItem.innerHTML = `
        <h4>
            <b>` + result.key + `</b>
        </h4>
        <p>` + result.content.length + `+ Services</p>`;
        elm_SearchCard.appendChild(elm_searchItem);
    }
}

function _searchResultClick(result) {
    let resultJSON = JSON.parse(result);
    elm_SearchCard.innerHTML = "";
    elm_SearchCard.style.display = "none";
    elm_SearchCard.style.left = "5%";
    elm_SearchCard.style.width = "35%"

    elm_SearchBoxInput.value = resultJSON.key;

    elm_SearchBox.style.left = "5%";
    elm_SearchBox.style.width = "35%"

    elm_CardWindow.innerHTML = '<div class="card_header">' + resultJSON.key + ' services:</div>';
    elm_CardWindow.style.display = "block";
    let elm_buttonClose = document.createElement("div");
    elm_buttonClose.className = "card_window_button_close";
    elm_buttonClose.id = "card_window_button_close";
    elm_buttonClose.innerHTML = "X";

    elm_CardWindow.appendChild(elm_buttonClose);

    for (let i = 0; i < resultJSON.content.length; i++) {
        const service = resultJSON.content[i];
        let elm_Item = document.createElement("div");
        elm_Item.className = "search_item";

        elm_Item.innerHTML =
            ((service.logo !== "-") ? (`<a class="card_window_item_url" href="` + service.url + `"><div class="card_folder"><img class="card_window_item_img" src="` + service.logo + `" alt="` + service.logo + `"/>`) : ("")) +
            `<div class="card_window_item_name">` + service.name + `</div></div>` +
            `<div class="card_window_item_pricing">Pricing: ` + service.pricing + `</div>` +
            `<div class="card_window_item_genre">` + data.raw.data.Genre[service.row] + `</div>` +
            `</a>`;

        elm_CardWindow.appendChild(elm_Item);
    }

    document.getElementById("card_window_button_close").onclick = function () {
        _closeCardWindow();
    }
}

function _closeCardWindow() {
    elm_SearchCard.innerHTML = "";
    elm_SearchCard.style.display = "block";
    elm_SearchCard.style.left = "25%";
    elm_SearchCard.style.width = "50%"

    elm_SearchBoxInput.value = "";

    elm_SearchBox.style.left = "25%";
    elm_SearchBox.style.width = "50%"

    elm_CardWindow.innerHTML = "";
    elm_CardWindow.style.display = "none";
    _closeSearchResults();
}

function _closeSearchResults() {
    elm_SearchCard.style.display = "none";
}

function _buildMap() {
    mapboxgl.accessToken = SETTINGS.MAPBOX_TOKEN;
    map = new mapboxgl.Map(SETTINGS.MAPBOX_SETTINGS);

    map.on('load', function () {
        // Add a GeoJSON source containing the state polygons.
        map.addSource('states', {
            'type': 'geojson',
            'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
        });

        // Add a layer showing the state polygons.
        map.addLayer({
            'id': 'states-layer',
            'type': 'fill',
            'source': 'states',
            'paint': {
                'fill-color': SETTINGS.COUNTRY_COLOR,
                'fill-outline-color': SETTINGS.COUNTRY_OUTLINE_COLOR
            }
        });
    });

    // When a click event occurs near a polygon, open a popup at the location of
    // the feature, with description HTML from its properties.
    map.on('click', function (e) {
        elm_SearchCard.style.display = "none";
        elm_SearchCard.innerHTML = "";
        let features = map.queryRenderedFeatures(e.point, {layers: ['states-layer']});

        if (features.length) {
            let feature = features[0];

            for (let i = 0; i < data.search.length; i++) {
                const item = data.search[i];
                if (item.key === feature.properties.name) {
                    _searchResultClick(JSON.stringify(item));
                }
            }
        }
    });

    // Use the same approach as above to indicate that the symbols are clickable
    // by changing the cursor style to 'pointer'.
    map.on('mousemove', function (e) {

        let features = map.queryRenderedFeatures(e.point, {layers: ['states-layer']});
        if (!features.length) {
            if (popup1 !== null) {
                popup1.remove();
                popup1 = null;
            }
            if (popup2 !== null) {
                popup2.remove();
                popup2 = null;
            }
        }

        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
        let feature = features[0];
        let countryData = data.prepared.countries[feature.properties.name];
        let html_popup = `<div class="popupHeader">` + feature.properties.name + `</div>Services: `;

        //Looping Names


        for (let i = 0; i < (countryData.length < 4 ? countryData.length : 4); i++) {
            if (i < 3 && i !== (countryData.length - 1)) {
                const element = countryData[i];
                html_popup += element.name + ", ";
            } else {
                const element = countryData[i];
                html_popup += element.name;
            }
        }

        if (countryData.length > 4) {
            html_popup += `, ` + (countryData.length - 4) + ` more...`;
        }

        //Looping Logos

        html_popup += `<div class="popupIcons">`

        for (let j = 0; j < (countryData.length < 5 ? countryData.length : 5); j++) {
            const element = countryData[j];
            if (element.logo !== "-" && element.logo !== "") {
                html_popup += `<img class="popupIcon" src="` + element.logo + `" alt="` + element.logo + `"/` + `>`
            }
        }

        html_popup += `</div>`

        if (popup1 == null) {
            popup1 = new mapboxgl.Popup()
                .setLngLat(map.unproject(e.point))
                .setHTML(html_popup)
                .addTo(map);
            try {
                popup2.remove();
            } catch (error) {
            }
            popup2 = null;
        } else if (popup2 == null) {
            popup2 = new mapboxgl.Popup()
                .setLngLat(map.unproject(e.point))
                .setHTML(html_popup)
                .addTo(map);
            try {
                popup1.remove();
            } catch (error) {
            }
            popup1 = null;
        }
    });
}

function _FBFRequest(url, dataJSON, onResponse, onError) {
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