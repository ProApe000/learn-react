import { useContext, memo } from "react";
import { UserContext, UserContextType } from "@/App";
import { ThemeContext } from "@/App";
// 自定义 Hook 带选择器
// function useUserContext(selector: (context: UserContextType) => UserContextType[keyof UserContextType]) {
//     const context = useContext(UserContext);
//     return selector ? selector(context) : context;
// }
export const Header = memo(function Header() {
    console.log('header render')
    // const { theme } = useContext(UserContext);
    // const theme = useUserContext(context => context.theme);
    const theme = useContext(ThemeContext)
    return <header>{JSON.stringify(theme)}</header>;
});