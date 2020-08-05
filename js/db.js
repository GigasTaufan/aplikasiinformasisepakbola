var dbPromised = idb.open("premier-league", 1, function (upgradeDb) {
    var timObjectStore = upgradeDb.createObjectStore("klasemen", {
        keyPath: "id"
    });
    timObjectStore.createIndex("id", "id", { unique: true });
});

// save tim favorit
function saveForLater(timFavorit) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("timFavorit", "readwrite");
            var store = tx.objectStore("timFavorit");
            console.log(timFavorit);
            store.add(timFavorit.result);
            return tx.complete;
        })
        .then(function () {
            console.log("Tim Favorit berhasil di simpan.");
        });
}

// Read Data tim favorit
function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("timFavorit", "readonly");
                var store = tx.objectStore("timFavorit");
                return store.getAll();
            })
            .then(function (timFavorit) {
                resolve(timFavorit);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("timFavorit", "readonly");
                var store = tx.objectStore("timFavorit");
                return store.get(id);
            })
            .then(function (timFavorit) {
                resolve(timFavorit);
            });
    });
}

// Delete Tim Favorit
function deleteTimFavorit(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction('store', 'readwrite');
                var store = tx.objectStore('store');
                return store.delete(id);
            })
            .then(function () {
                console.log('Tim favorit berhasil di hapus');
            });
    });
}