import { useState } from "react";
import { Button, Drawer } from "antd";
import { HandHeart } from "lucide-react";

const Doacoes = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const doacoes = [
    {
      ong: "Casa do Amor",
      data: "15/11/2022",
      tipo: "Roupas de inverno",
      status: "Confirmada",
    },
    {
      ong: "Lar Esperança",
      data: "10/12/2022",
      tipo: "Pix R$ 80,00",
      status: "Confirmada",
    },
    {
      ong: "Sorrisos Felizes",
      data: "05/01/2023",
      tipo: "Cobertores e mantas",
      status: "Confirmada",
    },
    {
      ong: "Cachorro Caramelo",
      data: "14/02/2023",
      tipo: "Ração para cães",
      status: "Confirmada",
    },
    {
      ong: "Mãos Unidas",
      data: "22/03/2023",
      tipo: "Pix R$ 100,00",
      status: "Em análise",
    },
    {
      ong: "Esperança Viva",
      data: "10/04/2023",
      tipo: "Medicamentos básicos",
      status: "Confirmada",
    },
    {
      ong: "Aconchego Fraterno",
      data: "03/05/2023",
      tipo: "Produtos de higiene",
      status: "Confirmada",
    },
    {
      ong: "Vida Nova",
      data: "19/06/2023",
      tipo: "Brinquedos",
      status: "Confirmada",
    },
    {
      ong: "Amigos Solidários",
      data: "08/07/2023",
      tipo: "Pix R$ 50,00",
      status: "Em análise",
    },
    {
      ong: "Coração Quente",
      data: "25/08/2023",
      tipo: "Alimentos não perecíveis",
      status: "Confirmada",
    },
  ];

  return (
    <div className="py-16 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#7886C7] mb-10">
        Histórico de Doações
      </h2>

      <div className="max-w-6xl mx-auto mb-6 flex justify-end">
        <Button
          size="middle"
          className="!bg-[#7886C7] !border-[#7886C7] !text-white !font-bold
                     !flex !items-center !justify-center gap-2
                     hover:!bg-[#A9B5DF] hover:!border-[#A9B5DF]"
          onClick={() => setDrawerVisible(true)}
        >
          <HandHeart size={16} />
          Cadastrar doação
        </Button>
      </div>

      <div className="max-w-6xl mx-auto grid gap-4 grid-cols-1">
        {doacoes.map((doacao, index) => (
          <div
            key={index}
            className="bg-white rounded shadow-md p-4 
                       flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div>
              <h3 className="text-lg font-bold text-[#7886C7]">{doacao.ong}</h3>
              <p className="text-[#A9B5DF] text-sm">Data: {doacao.data}</p>
              <p className="text-[#A9B5DF] text-sm">Tipo: {doacao.tipo}</p>
            </div>
            <div>
              {doacao.status === "Confirmada" ? (
                <span className="text-green-500 font-bold">
                  {doacao.status}
                </span>
              ) : (
                <span className="text-yellow-500 font-bold">
                  {doacao.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <Drawer
        title="Cadastrar Doação"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ONG
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Nome da ONG"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data
            </label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Doação
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Ex: Roupas de inverno, Pix R$ 80,00, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comprovante
            </label>
            <label
              htmlFor="comprovante"
              className="mt-1 block w-full border-2 border-dashed border-gray-300 rounded px-3 py-6 text-center cursor-pointer text-gray-500 hover:bg-gray-100"
            >
              Clique para anexar o comprovante
              <input
                id="comprovante"
                type="file"
                className="hidden"
                accept="image/*,application/pdf"
              />
            </label>
          </div>
          <div>
            <Button
              type="primary"
              className="w-full !bg-[#7886C7] hover:!bg-[#A9B5DF] !font-bold"
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Doacoes;
