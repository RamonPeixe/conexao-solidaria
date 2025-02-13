import { Layout } from "antd";
import CustomSidebar from "../presentation/components/Sidebar/Sidebar.component";

const { Content } = Layout;

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}>
      {/* Sidebar com largura fixa */}
      <CustomSidebar />

      {/* Área de conteúdo flexível */}
      <Layout style={{ flex: 1 }}>
        <Content style={{ padding: "20px", background: "#F4F4F4" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
