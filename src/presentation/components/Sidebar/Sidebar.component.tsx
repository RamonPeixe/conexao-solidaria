import { Layout } from "antd";
import Logo from "../Logo/Logo.component";
import Menulist from "../Menulist/Menulist.component";

const { Sider } = Layout;

const CustomSidebar: React.FC = () => {
  return (
    <Sider width={220} theme="dark" style={{ minHeight: "100vh" }}>
      <Logo />
      <Menulist />
    </Sider>
  );
};

export default CustomSidebar;
