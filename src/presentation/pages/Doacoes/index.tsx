import { Button } from "antd";
import { HandHeart } from "lucide-react";

const Doacoes = () => {
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
    </div>
  );
};

export default Doacoes;
