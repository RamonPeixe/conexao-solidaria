import { Layout } from "antd";
import CustomSidebar from "../presentation/components/Sidebar/Sidebar.component";

const { Content } = Layout;

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <CustomSidebar />

      <div className="flex-grow p-5 bg-gray-100 overflow-y-auto">
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default DefaultLayout;
