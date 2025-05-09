import { useState, ChangeEvent } from "react";
import { Button, Input } from "antd";
import Swal from "sweetalert2";
import api from "../../../../services/api";
import defaultImg from "../../../../shared/assets/imagemPadraoOng.png";
import defaultQrPix from "../../../../shared/assets/qrcode-pix.png";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [missao, setMissao] = useState("");
  const [itemTxt, setItemTxt] = useState("");
  const [itens, setItens] = useState<string[]>([]);

  const addItem = () => {
    if (itemTxt.trim()) {
      setItens(prev => [...prev, itemTxt.trim()]);
      setItemTxt("");
    }
  };

  const handleSubmit = async () => {
    try {
      const resp = await api.post("/instituicoes", {
        nome,
        descricao,
        missao,
        imagem_url: defaultImg,
        qr_code_url: defaultQrPix,
      });
      const id_instituicao = resp.data.id_instituicao;

      await Promise.all(
        itens.map(desc =>
          api.post("/itens", { id_instituicao, descricao: desc })
        )
      );

      await Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "ONG e itens cadastrados com sucesso.",
        confirmButtonColor: "#7886C7"
      });

      window.location.href = "/instituicoes";
    } catch (err) {
      console.error("Erro no cadastro:", err);
      Swal.fire({
        icon: "error",
        title: "Ops...",
        text: "Falha ao cadastrar. Tente novamente.",
        confirmButtonColor: "#E53E3E"
      });
    }
  };

  return (
    <div className="py-16 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#7886C7] mb-10">
        Cadastrar Nova ONG
      </h2>

      <div className="max-w-lg mx-auto bg-white rounded shadow-md p-6">
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Nome</label>
          <Input
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Nome da ONG"
            className="block w-full rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Descrição</label>
          <Input.TextArea
            rows={3}
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            placeholder="Breve descrição da ONG"
            className="block w-full rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Missão</label>
          <Input
            value={missao}
            onChange={e => setMissao(e.target.value)}
            placeholder="Missão da ONG"
            className="block w-full rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Itens necessários</label>
          <div className="flex gap-2">
            <Input
              value={itemTxt}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setItemTxt(e.target.value)}
              placeholder="Ex: Roupas de inverno"
              className="flex-1 rounded px-3 py-2"
            />
            <Button
              onClick={addItem}
              className="!bg-[#7886C7] !border-[#7886C7] !text-white !font-bold"
            >
              Adicionar
            </Button>
          </div>
          {itens.length > 0 && (
            <ul className="list-disc list-inside mt-4 space-y-1">
              {itens.map((it, i) => (
                <li key={i} className="text-gray-700">
                  {it}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button
          block
          type="primary"
          onClick={handleSubmit}
          className="!bg-[#7886C7] hover:!bg-[#A9B5DF] !font-bold"
        >
          Salvar ONG e Itens
        </Button>
      </div>
    </div>
  );
}
