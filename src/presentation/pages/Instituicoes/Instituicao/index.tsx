import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Wallet, HandHeart } from "lucide-react";
import api from "../../../../services/api";
import defaultImg from "../../../../shared/assets/imagemPadraoOng.png";
import defaultQrPix from "../../../../shared/assets/qrcode-pix.png";

const imagens = import.meta.glob(
  "../../../../shared/assets/*.{webp,png,jpg,jpeg}",
  { eager: true }
) as Record<string, { default: string }>;

function getSrc(fileName?: string, fallback: string = defaultImg) {
  if (!fileName) return fallback;
  if (fileName.startsWith("http")) return fileName;
  const key = `../../../../shared/assets/${fileName}`;
  return imagens[key]?.default || fallback;
}

interface Instituicao {
  id_instituicao: number;
  nome: string;
  descricao: string;
  imagem_url?: string;
  missao: string;
  qr_code_url: string;
}
interface Item {
  id_item: number;
  id_instituicao: number;
  descricao: string;
}

const InstituicaoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [instituicao, setInstituicao] = useState<Instituicao | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (!id) return;
    api
      .get<Instituicao>(`/instituicoes/${id}`)
      .then(res => setInstituicao(res.data))
      .catch(err => console.error("Erro ao carregar instituição:", err));
    api
      .get<Item[]>("/itens", { params: { id_instituicao: id } })
      .then(res => setItems(res.data))
      .catch(err => console.error("Erro ao carregar itens:", err));
  }, [id]);

  if (!instituicao) return <div className="p-6 text-center">Carregando...</div>;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto my-8">
      <h1 className="text-2xl font-bold text-[#7886C7]">{instituicao.nome}</h1>

      <img
        src={getSrc(instituicao.imagem_url, defaultImg)}
        alt={instituicao.nome}
        className="w-full h-auto mt-4 mb-6 rounded"
      />

      <p className="leading-relaxed mb-4">{instituicao.descricao}</p>

      <h2 className="text-xl font-semibold text-[#7886C7] mb-2">
        Itens que aceitam doação
      </h2>
      <ul className="list-disc list-inside mb-4">
        {items.length > 0 ? (
          items.map(item => <li key={item.id_item}>{item.descricao}</li>)
        ) : (
          <li className="text-gray-500 italic">Nenhum item cadastrado.</li>
        )}
      </ul>

      <div className="flex flex-col items-center">
        <img
          src={getSrc(instituicao.qr_code_url, defaultQrPix)}
          alt="Doe por Pix"
          className="w-48 h-48 object-contain mb-2"
        />
        <p className="text-[#A9B5DF]">Doe por Pix</p>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        <Button
          type="primary"
          size="middle"
          className="!bg-[#7886C7] !border-[#7886C7] !font-bold flex items-center gap-2 hover:!bg-[#A9B5DF]"
          onClick={() => navigate('/doacoes')}
        >
          <HandHeart size={16} /> Doar item
        </Button>
        <Button
          type="primary"
          size="middle"
          className="!bg-[#7886C7] !border-[#7886C7] !font-bold flex items-center gap-2 hover:!bg-[#A9B5DF]"
          onClick={() => navigate('/doacoes')}
        >
          <Wallet size={16} /> Doar da carteira
        </Button>
      </div>
    </div>
  );
};

export default InstituicaoPage;
