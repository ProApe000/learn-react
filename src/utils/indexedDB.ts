let db: IDBDatabase | undefined;
let openRequest: IDBOpenDBRequest;
export function init(name: string, version = 1) {
  return new Promise((resolve, reject) => {
    openRequest = indexedDB.open(name, version);
    openRequest.onsuccess = function (event) {
      console.log('onsuccess1', event);
      db = openRequest?.result;
      db.onversionchange = function () {
        db?.close();
        alert('Database is outdated, please reload the page.');
      };
      console.log(db);
      resolve(db);
    };
    openRequest.onupgradeneeded = function (event) {
      console.log('onupgradeneeded');
      db = openRequest?.result;
      if (!db.objectStoreNames.contains('book')) {
        const books = db.createObjectStore('book', { keyPath: 'id' });
        books.createIndex('price_idx', 'price', { unique: false });
      }
      // switch (event?.oldVersion) {
      //   case 0:
      //     db.createObjectStore(objectStore.name, {
      //       keyPath: objectStore.keyPath ?? "id",
      //     });
      //     break;
      //   default:
      //     break;
      // }
      console.log('onupgradeneeded', event?.oldVersion);
    };

    openRequest.onerror = function (event) {
      console.log('onerror1', event);
      reject(new Error('indexedDB open error'));
    };
  });
}

export function delDb(name: string) {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase(name);
    console.log('deleteRequest', deleteRequest);
    deleteRequest.onsuccess = function () {
      console.log('delDb onsuccess');
      resolve(true);
    };
    deleteRequest.onerror = function () {
      console.log('delDb onerror');
      reject(new Error('delDb error'));
    };
  });
}
export function createObjectStore(name: string, keyPath?: string) {
  let objectStore: IDBObjectStore | null = null;
  if (db) {
    objectStore = db.createObjectStore(name, { keyPath: keyPath ?? 'id' });
  }
  console.log('objectStore', objectStore);
  return objectStore;
}
export type Book = {
  id: number;
  name: string;
  price: number;
};
export function addBook(book: Book) {
  console.log('wc', db, book);
  return new Promise((resolve, reject) => {
    if (db) {
      const transaction = db.transaction(['book'], 'readwrite');
      transaction.oncomplete = function () {
        console.log('transaction oncomplete');
      };
      transaction.onabort = function () {
        console.log('Error', transaction.error);
      };
      const books = transaction.objectStore('book');
      const req = books.add(book);
      req.onsuccess = function () {
        resolve(req.result);
      };
      req.onerror = function (event) {
        if (req?.error?.name === 'ConstraintError') {
          event.preventDefault();
          // reject(new Error(req.error?.message));
        } else {
          reject(new Error(req.error?.message));
        }
      };
    } else {
      reject(new Error('数据库不存在'));
    }
  });
}
export function getBook(id: number) {
  return new Promise((resolve, reject) => {
    if (db) {
      const transaction = db.transaction(['book'], 'readonly');
      const books = transaction.objectStore('book');
      const req = books.get(id);
      // const req = books.getAll(IDBKeyRange.bound(2, 5));
      // const req = books.openCursor();
      req.onsuccess = function () {
        resolve(req.result);
      };
      req.onerror = function () {
        reject(new Error(req.error?.message));
      };
    } else {
      reject(new Error('数据库不存在'));
    }
  });
}
export function getBookByIndex() {
  return new Promise((resolve, reject) => {
    if (db) {
      const transaction = db.transaction(['book'], 'readonly');
      const books = transaction.objectStore('book');
      const bookIndex = books.index('price_idx');
      const req = bookIndex.getAll(IDBKeyRange.bound(0, 1));
      req.onsuccess = function () {
        resolve(req.result);
      };
      req.onerror = function () {
        reject(new Error(req.error?.message));
      };
    }
  });
}
