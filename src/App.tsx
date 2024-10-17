// import React from "react";
import style from "./index.module.less";
import House from "@/assets/images/avator.png";
import CoverTest from "./CoverTest";
import { init, delDb, createObjectStore, addBook, getBook, getBookByIndex } from './utils/indexedDB'
import { useMemo, useState } from "react";
import TestIDB from "./component/testIDB";

const App = () => {
  const [id, setId] = useState(0)
  const renderOp = useMemo(() => {
    return <div>
      <button type="button" onClick={async () => {
        await init('db_test', 1)
      }} >init</button>
      <button type="button" onClick={() => init('db_test', 2)}>init_2</button>
      <button type="button" onClick={() => delDb('db_test')}>del</button>
      <button type="button" onClick={() => createObjectStore("book")}>createObjectStore</button>
      <button type="button" onClick={async () => {
        await addBook({
          id,
          name: 'book' + id,
          price: id % 2
        })
        setId(id + 1)
      }}>addBook</button>
      <button type="button" onClick={async () => {
        const book = await getBook(2)
        console.log('getBook', book);
      }} >getBook</button>
      <button type="button" onClick={
        async () => {
          const book = await getBookByIndex()
          console.log('getBook', book);
        }
      } >getByIndex</button>
    </div>
  }, [id])
  return <div><CoverTest>{renderOp}</CoverTest>
    <TestIDB /></div>

};

export default App;
