import { useState, useEffect } from "react";
import { Button } from "antd";
import { HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

import defaultImg from "../../../shared/assets/imagemPadraoOng.png";

const imagens = import.meta.glob(
  "../../../shared/assets/*.{webp,png,jpg,jpeg}",
  { eager: true }
) as Record<string, { default: string }>;

function getImagemSrc(fileName?: string) {
  if (!fileName) return defaultImg;
  if (fileName.startsWith("http")) return fileName;
  const key = `../../../shared/assets/${fileName}`;
  return imagens[key]?.default || defaultImg;
}

interface Instituicao {
  id_instituicao: number;
  nome: string;
  descricao: string;
  imagem_url?: string;
}

const Instituicoes = () => {
  const navigate = useNavigate();
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);

  useEffect(() => {
    api
      .get<Instituicao[]>('/instituicoes')
      .then(res => setInstituicoes(res.data))
      .catch(err => console.error('Erro ao carregar instituições:', err));
  }, []);

  return (
    <div className="py-16 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#7886C7] mb-10">
        Nossas Instituições
      </h2>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {instituicoes.map(inst => (
          <div
            key={inst.id_instituicao}
            className="bg-white rounded shadow-md flex overflow-hidden"
          >
            <img
              src={getImagemSrc(inst.imagem_url)}
              alt={inst.nome}
              className="w-36 h-36 object-cover"
            />

            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#7886C7]">{inst.nome}</h3>
                <p className="mt-2 text-[#A9B5DF]">{inst.descricao}</p>
              </div>

              <Button
                size="middle"
                className="!bg-[#7886C7] !border-[#7886C7] !text-white !font-bold mt-4 hover:!bg-[#A9B5DF] hover:!border-[#A9B5DF]"
                onClick={() => navigate(`/instituicoes/${inst.id_instituicao}`)}
              >
                <HeartHandshake size={16} /> Faça o bem agora
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instituicoes;