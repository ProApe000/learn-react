import React, { useState, useEffect } from "react";
import { openDB } from 'idb'

const TestIDB: React.FC = () => {

    const [db, setDb] = useState<IDBDatabase | null>(null)
    // 创建IDBDataBase
    const init = async () => {
        const myDb = await openDB('myDB', 1, {
            upgrade(db, oldVersion, newVersion, transaction, event) {
                console.log('upgrade', db, oldVersion, newVersion, transaction, event);
                openDB('myDB', 2, {

                })
            },
            blocked(currentVersion, blockedVersion, event) {
                console.log('blocked', currentVersion, blockedVersion, event);
            },
            blocking(currentVersion, blockedVersion, event) {
                console.log('blocking', currentVersion, blockedVersion, event);
            },
            terminated() {
                console.log('terminated');
            },
        });
        setDb(myDb as any)
    }
    useEffect(() => {
        init()
    }, [])
    return <div><button type="button">openDB</button></div>
}

export default TestIDB