import { useState, useEffect, ChangeEvent } from "react";
import { Button, Drawer } from "antd";
import { HeartHandshake } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../services/api";

import defaultImg from "../../../shared/assets/imagemPadraoOng.png";
import defaultQrPix from "../../../shared/assets/qrcode-pix.png";

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
  missao: string;
  qr_code_url: string;
}

const Instituicoes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showCreate = location.pathname === "/instituicoes/cadastro";

  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [missao, setMissao] = useState("");

  useEffect(() => {
    api
      .get<Instituicao[]>('/instituicoes')
      .then(res => setInstituicoes(res.data))
      .catch(err => console.error('Erro ao carregar instituições:', err));
  }, []);

  const handleCreate = () => {
    const payload = {
      nome,
      descricao,
      missao,
      imagem_url: defaultImg,
      qr_code_url: defaultQrPix
    };

    api
      .post('/instituicoes', payload)
      .then(() => api.get<Instituicao[]>('/instituicoes'))
      .then(res => {
        setInstituicoes(res.data);
        setDrawerVisible(false);
        setNome('');
        setDescricao('');
        setMissao('');
      })
      .catch(err => console.error('Erro ao criar ONG:', err));
  };

  return (
    <div className="py-16 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#7886C7] mb-10">
        Nossas Instituições
      </h2>

      {showCreate && (
        <div className="max-w-6xl mx-auto mb-6 flex justify-end">
          <Button
            type="primary"
            className="!bg-[#7886C7] !border-[#7886C7] !text-white !font-bold"
            onClick={() => setDrawerVisible(true)}
          >
            Cadastrar ONG
          </Button>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {instituicoes.map((inst, idx) => (
          <div key={idx} className="bg-white rounded shadow-md flex overflow-hidden">
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

      <Drawer
        title="Cadastrar Nova ONG"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescricao(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Missão</label>
            <input
              type="text"
              value={missao}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMissao(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <Button
              type="primary"
              className="w-full !bg-[#7886C7] hover:!bg-[#A9B5DF] !font-bold"
              onClick={handleCreate}
            >
              Cadastrar ONG
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Instituicoes;
