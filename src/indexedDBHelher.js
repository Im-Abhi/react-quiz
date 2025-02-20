// indexedDBHelper.js

const DB_NAME = "quizResultsDB";
const DB_VERSION = 1;
const STORE_NAME = "results";

// Open or create the IndexedDB database
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "attempt",
                    autoIncrement: true,
                });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (error) => {
            reject(error);
        };
    });
};

// Add quiz result to IndexedDB
const addResult = async (result) => {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.add(result);
    } catch (error) {
        console.error("Error adding result:", error);
    }
};

// Get all quiz results from IndexedDB
const getResults = async () => {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const results = await new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = (error) => reject(error);
        });
        return results;
    } catch (error) {
        console.error("Error fetching results:", error);
        return [];
    }
};

export { addResult, getResults };
