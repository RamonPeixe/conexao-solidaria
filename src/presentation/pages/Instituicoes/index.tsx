import { Button } from "antd";
import { HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

import casaDoAmor from "../../../shared/assets/casa_do_amor.webp";
import larDaEsperanca from "../../../shared/assets/lar_da_esperanca.webp";
import sorrisosFelizes from "../../../shared/assets/sorrisosFelizes.webp";
import cachorroCaramelo from "../../../shared/assets/cachorro_caramelo.webp";
import maosUnidas from "../../../shared/assets/maosUnidas.webp";
import esperancaViva from "../../../shared/assets/esperancaViva.webp";

const Instituicoes = () => {
  const navigate = useNavigate();

  const instituicoes = [
    {
      nome: "Casa do Amor",
      imagem: casaDoAmor,
      descricao:
        "A Casa do Amor acolhe famílias em situação de vulnerabilidade...",
    },
    {
      nome: "Lar Esperança",
      imagem: larDaEsperanca,
      descricao:
        "O Lar Esperança é uma ONG que atua na educação de crianças carentes...",
    },
    {
      nome: "Sorrisos Felizes",
      imagem: sorrisosFelizes,
      descricao:
        "A instituição Sorrisos Felizes atende idosos em situação de abandono...",
    },
    {
      nome: "Cachorro Caramelo",
      imagem: cachorroCaramelo,
      descricao:
        "O projeto Cachorro Caramelo resgata animais de rua...",
    },
    {
      nome: "Mãos Unidas",
      imagem: maosUnidas,
      descricao:
        "A Mãos Unidas arrecada roupas, alimentos e brinquedos...",
    },
    {
      nome: "Esperança Viva",
      imagem: esperancaViva,
      descricao:
        "A ONG Esperança Viva fornece assistência médica e apoio psicológico...",
    },
  ];

  return (
    <div className="py-16 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#7886C7] mb-10">
        Nossas Instituições
      </h2>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {instituicoes.map((instituicao, index) => (
          <div
            key={index}
            className="bg-white rounded shadow-md flex overflow-hidden"
          >
            {instituicao.imagem ? (
              <img
                src={instituicao.imagem}
                alt={instituicao.nome}
                className="w-36 h-36 object-cover"
              />
            ) : (
              <div className="w-36 h-36 flex items-center justify-center bg-[#A9B5DF] text-white">
                Sem Imagem
              </div>
            )}

            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#7886C7]">
                  {instituicao.nome}
                </h3>
                <p className="mt-2 text-[#A9B5DF]">{instituicao.descricao}</p>
              </div>

              <Button
                size="middle"
                className="!bg-[#7886C7] !border-[#7886C7] !text-white !font-bold mt-4 
                           hover:!bg-[#A9B5DF] hover:!border-[#A9B5DF]
                           !flex !items-center !justify-center gap-2"
                onClick={() => {
                  if (instituicao.nome === "Cachorro Caramelo") {
                    navigate("/instituicoes/cachorro-caramelo");
                  } else {
                    console.log("Nada")
                  }
                }}
              >
                <HeartHandshake size={16} />
                Faça o bem agora
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instituicoes;
