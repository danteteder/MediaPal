# Mediapal
Projekti raames loodi kaardirakenduse plugin mille alusel saab kasutada iga Excel'i või Google Sheets' andmetabelit. Kaardirakenduse näitel me andsime kasutajale võimaluse leida milliseid voogmeedia teenuseid erinevates maailma piirkondades on võimalik kasutada. Kuna paljud streaming ehk voogedastus teenused on tulemas turule ning kõik neist lubavad publikule teatud sisu, seetõttu on antud maastik tavakasutajale äärmiselt kirju ning üle jõu käiv - kaardirakenduse projekt lahendab selle probleemi. Antud projekt on loodud Tallinna Ülikooli Tarkvaraarenduse projekt ja Tarkvaraarenduse praktika loomes.

#### Arenduses osalenud isikud:
* Dante Teder
* Robin Kolk
* Mihkel Joll
* Mariann Villems
* Karl Palm

### Kasutatud Tarkvara:
* Javascript, NodeJS, CSS ja HTML
* Firebase
* Mapbox

#### Installeerimise juhend: 
##### Inglise keeles juhendid on rakenduse veebilehel : http://codemadesense.com/mediapal/
##### Backend
1. Seada üles Firebase keskkonda projekt
2. Seada üles Firebase keskkonda andmebaas 
    * [link keskkonda](https://firebase.google.com/docs/firestore)
3. Seada üles Firebase keskkonda funktsioonid 
    * [link keskkonda](https://firebase.google.com/docs/functions)
4. Luua loodud andmebaasi kollektsioon nimega “database”
5. Luua kollektsiooni nimega “database” tühi dokument nimega `EXMtb47HNp7j3hTdhhOF`
6. Laadida üles Firebase Functions funktsioonid mille leiab index.js failist. Need võib ümber tõsta olemasolevasse index.js faili mis Firebase Functions õpetuse järgi tekkis.
 
##### Frontend (Mediapal Frontend Plugin)
1. Luua veebileht kus antud pluginat kasutatakse
2. Luua Mapbox konto 
    * [Link lehele](https://blog.mapbox.com/quickstart-guide-to-mapbox-javascript-api-4b376c68dd46)
3. Lisada plugini folder projekti
4. Kasutada plugini style.css ja mediapal.js faili veebilehe html dokumendis
5. Luua veebilehele container element kuhu plugini sisu kuvatakse

Kasutada järgmist koodi, et plugin käima panna. Kõik allolevad väljad peavad olema täidetud ning attribuudid on need väljad mida saab kasutaja ise muuta selleks, et kaardi väljanägemist manipuleerida
```sh
mediapal.open(document.getElementById("loodud-elemendi-ID"), 
{
    URL: "serveri GET endpoint URL",
    MAPBOX_TOKEN: "MAPBOX Token",
    MAPBOX_SETTINGS: {
        container: 'map',
        style: 'Mapbox Style Token',
        center: [-100.04, 38.907],
        zoom: 3
    },
    COUNTRY_COLOR: 'rgba(23, 236, 105, 0.4)',
    COUNTRY_OUTLINE_COLOR: 'rgba(0, 4, 2, 1)'
});
```

## Pildid rakendusest
### Veebileht
![Veebileht](https://i.imgur.com/KdQLLU4.jpg)
### Plugina avaleht
![Avaleht](https://i.imgur.com/fM4aGtt.png)
### Otsing
![Otsing](https://i.imgur.com/lbjxebB.png)
### Vaade 1
![Vaade 1](https://i.imgur.com/fb6LgVd.png)
### Vaade 2
![Vaade 2](https://i.imgur.com/XjiKX5J.png)
### Andmete üles laadimine (ehk Platform Manager)
![Andmete üles laadimine](https://i.imgur.com/7pk9DhM.jpg)
