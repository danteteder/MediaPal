// // // Modules

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

// // // Firebase Admin

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

// // // Databases

var database = admin.firestore().collection('database');

const k = "dknfkgnsdovmsdkmsm jksm";

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.postExcel = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (request.body.k == k) {
            database.doc("EXMtb47HNp7j3hTdhhOF").set({
                "raw": {
                    "data": request.body.data
                }
            }, { merge: true })
                .then(function () {
                    response.send({ "status": "done" }); //Change later
                });
        }
    });
});

exports.getExcel = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (request.body.k == k) {
            database.doc("EXMtb47HNp7j3hTdhhOF").get()
                .then(doc => {
                    response.send({
                        "data": doc.data()
                    })
                })
                .catch(err => {
                    response.send({ "error": "Error getting document!" });
                });
        }
    });
});
