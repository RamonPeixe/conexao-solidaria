import { useState, useEffect, ChangeEvent } from "react";
import { Button, Drawer, message } from "antd";
import { HandHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

interface Instituicao {
  id_instituicao: number;
  nome: string;
}

interface Doacao {
  id_doacao: number;
  id_usuario: number;
  id_instituicao: number;
  data: string;
  tipo: string;
  status: string;
  componentes: string;
}

interface DisplayDoacao extends Doacao {
  ong: string;
  dataFormatada: string;
}

const Doacoes = () => {
  const navigate = useNavigate();

  const stored = localStorage.getItem("conexaoSolidariaUser");
  const user = stored ? JSON.parse(stored) : null;
  const userId = user?.id_usuario;

  useEffect(() => {
    if (!userId) {
      message.warning("Faça login para ver suas doações");
      navigate("/login");
    }
  }, [userId, navigate]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [doacoes, setDoacoes] = useState<DisplayDoacao[]>([]);
  const [inputInstId, setInputInstId] = useState<number>(0);
  const [inputItem, setInputItem] = useState<string>("");
  const [inputComprovante, setInputComprovante] = useState<File | null>(null);

  useEffect(() => {
    if (!userId) return;
    Promise.all([
      api.get<Instituicao[]>("/instituicoes"),
      api.get<Doacao[]>("/doacoes"),
    ])
      .then(([instRes, doRes]) => {
        setInstituicoes(instRes.data);

        const minhas = doRes.data.filter(d => d.id_usuario === userId);

        const display = minhas.map(d => ({
          ...d,
          ong:
            instRes.data.find(i => i.id_instituicao === d.id_instituicao)
              ?.nome || "Desconhecida",
          dataFormatada: new Date(d.data)
            .toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),
        }));

        setDoacoes(display.reverse());
      })
      .catch(err => console.error("Erro ao buscar dados:", err));
  }, [userId]);

  const fetchDoacoes = () => {
    if (!userId) return;
    api
      .get<Doacao[]>("/doacoes")
      .then(res => {
        const minhas = res.data.filter(d => d.id_usuario === userId);
        const display = minhas.map(d => ({
          ...d,
          ong:
            instituicoes.find(i => i.id_instituicao === d.id_instituicao)
              ?.nome || "Desconhecida",
          dataFormatada: new Date(d.data)
            .toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),
        }));
        setDoacoes(display.reverse());
      })
      .catch(err => console.error("Erro ao buscar doações:", err));
  };

  const [itemsList, setItemsList] = useState<{ id_item: number; descricao: string; }[]>([]);
  useEffect(() => {
    if (inputInstId > 0) {
      api
        .get<{ id_item: number; id_instituicao: number; descricao: string; }[]>("/itens", {
          params: { id_instituicao: inputInstId },
        })
        .then(res => setItemsList(res.data))
        .catch(err => console.error("Erro ao carregar itens:", err));
    } else {
      setItemsList([]);
    }
  }, [inputInstId]);

  const handleSubmit = () => {
    if (!inputInstId) {
      message.warning("Selecione uma ONG");
      return;
    }
    const nowISO = new Date().toISOString();
    api
      .post("/doacoes", {
        id_usuario:     userId,
        id_instituicao: inputInstId,
        data:           nowISO,
        tipo:           inputItem || "Pix",
        status:         "Em análise",
        componentes:    inputComprovante ? inputComprovante.name : "",
      })
      .then(() => {
        message.success("Doação cadastrada!");
        setDrawerVisible(false);
        setInputInstId(0);
        setInputItem("");
        setInputComprovante(null);
        fetchDoacoes();
      })
      .catch(err => {
        console.error("Erro ao cadastrar doação:", err);
        message.error("Falha ao cadastrar doação.");
      });
  };

  return (
    <div className="py-16 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#7886C7] mb-10">
        Histórico de Doações
      </h2>

      <div className="max-w-6xl mx-auto mb-6 flex justify-end">
        <Button
          icon={<HandHeart size={16} />}
          size="middle"
          className="!bg-[#7886C7] !border-[#7886C7] !text-white !font-bold
                     hover:!bg-[#A9B5DF] hover:!border-[#A9B5DF]"
          onClick={() => setDrawerVisible(true)}
        >
          Cadastrar doação
        </Button>
      </div>

      <div className="max-w-6xl mx-auto grid gap-4">
        {doacoes.map((d, idx) => (
          <div
            key={idx}
            className="bg-white rounded shadow-md p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold text-[#7886C7]">{d.ong}</h3>
              <p className="text-[#A9B5DF] text-sm">Data: {d.dataFormatada}</p>
              <p className="text-[#A9B5DF] text-sm">Tipo: {d.tipo}</p>
            </div>
            <span
              className={
                d.status === "Confirmada"
                  ? "text-green-500 font-bold"
                  : d.status === "Não Aprovada"
                  ? "text-red-500 font-bold"
                  : "text-yellow-500 font-bold"
              }
            >
              {d.status}
            </span>
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
            <label className="block text-sm font-medium text-gray-700">ONG</label>
            <select
              value={inputInstId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setInputInstId(Number(e.target.value))
              }
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value={0}>Selecione uma ONG</option>
              {instituicoes.map(inst => (
                <option key={inst.id_instituicao} value={inst.id_instituicao}>
                  {inst.nome}
                </option>
              ))}
            </select>
          </div>

          {inputInstId > 0 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Item / Pix</label>
                <select
                  value={inputItem}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setInputItem(e.target.value)
                  }
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="Pix">Pix</option>
                  {itemsList.map(item => (
                    <option key={item.id_item} value={item.descricao}>
                      {item.descricao}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Comprovante</label>
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setInputComprovante(e.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>
            </>
          )}

          <Button
            block
            type="primary"
            className="!bg-[#7886C7] hover:!bg-[#A9B5DF] !font-bold"
            onClick={handleSubmit}
          >
            Cadastrar
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Doacoes;
