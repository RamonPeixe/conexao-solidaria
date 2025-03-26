import { useState } from "react";
import { Button, Drawer } from "antd";
import { UserCircle } from "lucide-react";
import qrPix from "../../../shared/assets/qrcode-pix.png";

const Perfil = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [depositMethod, setDepositMethod] = useState("cartao");

  return (
    <div className="py-16 px-6 bg-gray-100 min-h-screen">
      <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <UserCircle size={100} className="text-[#A9B5DF]" />
          <h2 className="text-2xl font-bold text-[#7886C7] mt-4">
            João da Silva
          </h2>
          <p className="text-[#A9B5DF]">Idade: 30 anos</p>
        </div>

        <div className="mt-6 space-y-2 text-[#A9B5DF]">
          <p>
            <strong>Endereço:</strong> Rua das Flores, 123, São Paulo - SP
          </p>
          <p>
            <strong>Telefone:</strong> (11) 99999-9999
          </p>
          <p>
            <strong>CPF:</strong> 123-*******-69
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[#A9B5DF]">
            <strong>Carteira:</strong> R$ 150,00
          </p>
          <Button
            size="middle"
            className="!bg-[#7886C7] !border-[#7886C7] !text-white !font-bold hover:!bg-[#A9B5DF] hover:!border-[#A9B5DF]"
            onClick={() => setDrawerVisible(true)}
          >
            Depositar
          </Button>
        </div>

        <div className="mt-6 flex justify-end">
          <Button danger className="!font-bold">
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
        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => setDepositMethod("cartao")}
            className={`cursor-pointer px-4 py-2 rounded ${
              depositMethod === "cartao"
                ? "bg-[#7886C7] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Cartão de Crédito
          </button>
          <button
            onClick={() => setDepositMethod("pix")}
            className={`cursor-pointer px-4 py-2 rounded ${
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
                Nome Completo
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Seu nome completo"
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
