// import React from "react";

import { Routes, Route } from 'react-router-dom';
import routes from './routes';
// import CoverTest from "./CoverTest";
import Slider from './component/slider';
import { useState, createContext } from 'react';
import { Main, Header } from './component';
// 导入全局样式
import './index.module.less';
// 测试worktree
// export type UserContextType = {
//   user: Record<string, string | number>
//   theme: string
// }
// const initUserContextValue = {
//   user: {

//   },
//   theme: 'blue'
// }
// Context 定义
// export const UserContext = createContext<UserContextType>(initUserContextValue);

export const UserContext = createContext({ name: 'John', age: 25 });
export const ThemeContext = createContext('light');
// Provider 组件
function App() {
  const [user] = useState({ name: 'John', age: 25 });
  const [theme] = useState('light');
  // const contextValue = useMemo(() => {
  //   return { user, theme };
  // }, [user, theme]);
  return (
    // <UserContext.Provider value={contextValue}>
    //   <Header />
    //   <Main />
    //   <div onClick={() => {
    //     setUser({ name: 'John', age: 18 })
    //   }}>设置名称-{JSON.stringify(user)}</div>
    // </UserContext.Provider >
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
        <Header />
        <Main />
        <Slider></Slider>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                path={route.path}
                key={route.path}
                element={<route.component />}
              />
            );
          })}
        </Routes>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
