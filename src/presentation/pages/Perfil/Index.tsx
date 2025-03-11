import { Button } from "antd";
import { UserCircle } from "lucide-react";

const Perfil = () => {
  return (
    <div className="py-16 px-6 bg-gray-100 min-h-screen">
      <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <UserCircle size={100} className="text-[#A9B5DF]" />
          <h2 className="text-2xl font-bold text-[#7886C7] mt-4">João da Silva</h2>
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
            className="!bg-[#7886C7] !border-[#7886C7] !text-white !font-bold 
                       hover:!bg-[#A9B5DF] hover:!border-[#A9B5DF]"
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
    </div>
  );
};

export default Perfil;
