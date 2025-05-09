import { useState, useEffect, ChangeEvent } from "react";
import { Button, Drawer } from "antd";
import { HandHeart } from "lucide-react";
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
}

const Doacoes = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [doacoes, setDoacoes] = useState<DisplayDoacao[]>([]);

  const [inputInstId, setInputInstId] = useState<number>(0);
  const [inputData, setInputData] = useState<string>("");
  const [inputTipo, setInputTipo] = useState<string>("");
  const [inputComprovante, setInputComprovante] = useState<File | null>(null);

  // Carrega instituições e doações
  useEffect(() => {
    Promise.all([
      api.get<Instituicao[]>('/instituicoes'),
      api.get<Doacao[]>('/doacoes')
    ])
      .then(([instRes, doacRes]) => {
        const insts = instRes.data;
        setInstituicoes(insts);
        const display = doacRes.data.map(d => ({
          ...d,
          ong: insts.find(i => i.id_instituicao === d.id_instituicao)?.nome || 'Desconhecida'
        }));
        setDoacoes(display);
      })
      .catch(err => console.error('Erro ao buscar dados:', err));
  }, []);

  const fetchDoacoes = () => {
    api.get<Doacao[]>('/doacoes')
      .then(doacRes => {
        const display = doacRes.data.map(d => ({
          ...d,
          ong: instituicoes.find(i => i.id_instituicao === d.id_instituicao)?.nome || 'Desconhecida'
        }));
        setDoacoes(display);
      })
      .catch(err => console.error('Erro ao buscar doações:', err));
  };

  const handleSubmit = () => {
    api.post('/doacoes', {
      id_usuario:     1,
      id_instituicao: inputInstId,
      tipo:           inputTipo,
      status:         'Em análise',
      componentes:    inputComprovante ? inputComprovante.name : ''
    })
      .then(() => {
        setDrawerVisible(false);
        setInputInstId(0);
        setInputData('');
        setInputTipo('');
        setInputComprovante(null);
        fetchDoacoes();
      })
      .catch(err => console.error('Erro ao cadastrar doação:', err));
  };

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
              {doacao.status === 'Confirmada' ? (
                <span className="text-green-500 font-bold">{doacao.status}</span>
              ) : (
                <span className="text-yellow-500 font-bold">{doacao.status}</span>
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
            <label className="block text-sm font-medium text-gray-700">ONG</label>
            <select
              value={inputInstId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setInputInstId(Number(e.target.value))}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Data</label>
            <input
              type="date"
              value={inputData}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputData(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Doação</label>
            <input
              type="text"
              value={inputTipo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputTipo(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Ex: Roupas de inverno, Pix R$ 80,00, etc."
            />
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputComprovante(e.target.files?.[0] || null)}
                accept="image/*,application/pdf"
              />
            </label>
          </div>
          <div>
            <Button
              type="primary"
              className="w-full !bg-[#7886C7] hover:!bg-[#A9B5DF] !font-bold"
              onClick={handleSubmit}
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
