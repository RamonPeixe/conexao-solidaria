import { Menu } from "antd";
import { Building, HandCoins, House, User } from "lucide-react";
import { Link } from "react-router-dom";

const Menulist = () => {
  return (
    <Menu theme="dark" mode="inline" className="h-screen">
      <Menu.Item key="inicio" icon={<House size={16} />}>
        <Link to="/inicio">Início</Link>
      </Menu.Item>
      <Menu.Item key="instituicoes" icon={<Building size={16} />}>
        <Link to="/instituicoes">Instituições</Link>
      </Menu.Item>
      <Menu.Item key="doacoes" icon={<HandCoins size={16} />}>
        <Link to="/doacoes">Doações</Link>
      </Menu.Item>
      <Menu.Item key="perfil" icon={<User size={16} />}>
        <Link to="/perfil">Perfil</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Menulist;
