import { useState, useEffect } from "react";
import { Button, Drawer, message, Input } from "antd";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import qrPix from "../../../shared/assets/qrcode-pix.png";
import api from "../../../services/api";

interface User {
  id_usuario: number;
  nome: string;
  idade: number;
  endereco: string;
  telefone: string;
  cpf: string;
  email: string;
  saldo: number;
}

const Perfil = () => {
  const navigate = useNavigate();

  const stored = localStorage.getItem("conexaoSolidariaUser");
  const initialUser: User | null = stored ? JSON.parse(stored) : null;

  const [user, setUser] = useState<User | null>(initialUser);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [depositMethod, setDepositMethod] = useState<"cartao" | "pix">("cartao");
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (!user) {
      message.warning("Você precisa estar logado para ver seu perfil.");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("conexaoSolidariaUser");
    navigate("/login");
  };

  const handleDeposit = async () => {
    if (amount <= 0) {
      message.error("Informe uma quantia maior que zero.");
      return;
    }
    try {
      const newSaldo = user.saldo + amount;
      await api.put(`/usuarios/${user.id_usuario}`, {
        ...user,
        saldo: newSaldo,
      });
      const updated = { ...user, saldo: newSaldo };
      setUser(updated);
      localStorage.setItem("conexaoSolidariaUser", JSON.stringify(updated));
      message.success(`Depósito de R$ ${amount.toFixed(2)} realizado!`);
      setDrawerVisible(false);
      setAmount(0);
    } catch (err) {
      console.error(err);
      message.error("Falha ao processar o depósito.");
    }
  };

  return (
    <div className="py-16 px-6 bg-gray-100 min-h-screen">
      <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <UserCircle size={100} className="text-[#A9B5DF]" />
          <h2 className="text-2xl font-bold text-[#7886C7] mt-4">
            {user.nome}
          </h2>
          <p className="text-[#A9B5DF]">Idade: {user.idade} anos</p>
        </div>
        <div className="mt-6 space-y-2 text-[#4A5568]">
          <p>
            <strong className="text-[#7886C7]">Endereço:</strong> {user.endereco}
          </p>
          <p>
            <strong className="text-[#7886C7]">Telefone:</strong> {user.telefone}
          </p>
          <p>
            <strong className="text-[#7886C7]">CPF:</strong> {user.cpf}
          </p>
          <p>
            <strong className="text-[#7886C7]">Saldo:</strong> R$ {user.saldo.toFixed(2)}
          </p>
        </div>
        <div className="mt-6 flex justify-between">
          <Button
            size="middle"
            className="!bg-[#7886C7] !border-[#7886C7] !text-white !font-bold hover:!bg-[#A9B5DF]"
            onClick={() => setDrawerVisible(true)}
          >
            Depositar
          </Button>
          <Button danger className="!font-bold" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>

      <Drawer
        title="Depositar"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setDepositMethod("cartao")}
            className={`px-4 py-2 rounded font-medium ${
              depositMethod === "cartao"
                ? "bg-[#7886C7] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Cartão de Crédito
          </button>
          <button
            onClick={() => setDepositMethod("pix")}
            className={`px-4 py-2 rounded font-medium ${
              depositMethod === "pix"
                ? "bg-[#7886C7] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            PIX
          </button>
        </div>

        {depositMethod === "pix" ? (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-center text-gray-700 font-medium">
              Escaneie o código QR para pagar via PIX
            </p>
            <img src={qrPix} alt="QR Code Pix" className="w-64 h-64" />
          </div>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantia (R$)
              </label>
              <Input
                type="number"
                min={1}
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Ex: 50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                type="text"
                defaultValue={user.nome}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número do Cartão
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Validade
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                placeholder="MM/AA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                placeholder="123"
              />
            </div>
            <div>
              <Button
                type="primary"
                className="w-full !bg-[#7886C7] hover:!bg-[#A9B5DF] !font-bold"
                onClick={handleDeposit}
              >
                Depositar
              </Button>
            </div>
          </form>
        )}
      </Drawer>
    </div>
  );
};

export default Perfil;
