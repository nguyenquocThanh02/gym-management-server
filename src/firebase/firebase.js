var admin = require("firebase-admin");

var serviceAccount = require("./firebaseAdminSDK.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://videocallapp-4fbc2-default-rtdb.firebaseio.com",
});

module.exports = admin;
