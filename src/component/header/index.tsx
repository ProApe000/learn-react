import { useContext, memo } from "react";
import { Button } from '@okee-uikit/react'
import { UserContext, UserContextType } from "@/App";
import { ThemeContext } from "@/App";
// 自定义 Hook 带选择器
// function useUserContext(selector: (context: UserContextType) => UserContextType[keyof UserContextType]) {
//     const context = useContext(UserContext);
//     return selector ? selector(context) : context;
// }
function factorial(num: number): number {
    if (num <= 1) {
        return 1;
    }
    // return num * arguments.callee(num - 1) 严格模式下不允许调用callee caller
    return num * factorial(num - 1)
}
// let color = 'red'
// function displayColor() {
//     alert(this.color)
// }
// displayColor()
function myAdd(a, b, ...c) {
    // 'use strict'
    if (c instanceof Array && c?.length > 0) {
        return a + b + c?.reduce((pre, cur) => pre + cur, 0)
    }
    return a + b
}

export const Header = memo(function Header() {
    console.log('header render')
    // const { theme } = useContext(UserContext);
    // const theme = useUserContext(context => context.theme);
    const theme = useContext(ThemeContext)
    return <div>
        <header>{JSON.stringify(theme)}</header>
        <Button onClick={
            () => {
                console.log(factorial(5));
                console.log(myAdd(1, 2, 3, 4))
            }
        }>测试严格模式</Button>
    </div >
});