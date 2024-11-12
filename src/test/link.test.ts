import { act } from "react";
import MyLink from "@/component/myLink";
import ReactDOM from "react-dom/client";

it("changes the class when hovered", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);
  act(() => {
    root.render(<MyLink page="www.baidu.com">百度</MyLink>);
  });
  // 获取组件的 JSON 表示
  let tree = root.toJSON();
  expect(tree).toMatchSnapshot();
  // 模拟鼠标悬停事件
  act(() => {
    tree.props.onMouseEnter();
  });
  // 在这里添加对鼠标悬停后的状态进行断言的代码
  // 清理 DOM
  root.unmount();
  document.body.removeChild(container);
});
