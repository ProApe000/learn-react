import { useContext, memo } from "react";
// import { UserContext } from "@/App";
import { UserContext } from "@/App";
export const Main = memo(function Main() {
    console.log('main render')
    // const { user } = useContext(UserContext);
    const user = useContext(UserContext);
    return <main>Hello {user.name}</main>;
});