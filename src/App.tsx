import * as React from "react";
import style from "./index.module.less";
import House from "@/assets/images/avator.png";
console.log(style);

const App = () => {
  return (
    <div className={style.wrapper}>
      my-app 
      <img src={House} alt="" />
    </div>
  );
};

export default App;
