import { Button } from "antd";
import { Wallet, HandHeart } from "lucide-react";
import qrPix from "../../../../shared/assets/qrcode-pix.png";
import cachorroCaramelo from "../../../../shared/assets/cachorro_caramelo.webp";

const CachorroCarameloPage = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto my-8">
      <h1 className="text-2xl font-bold text-[#7886C7]">Cachorro Caramelo</h1>

      <img
        src={cachorroCaramelo}
        alt="Cachorro Caramelo"
        className="w-full h-auto mt-4 mb-6 rounded"
      />

      <p className=" leading-relaxed mb-4">
        O projeto Cachorro Caramelo resgata animais de rua, oferecendo abrigo
        temporário e promovendo adoções responsáveis.
      </p>

      <h2 className="text-xl font-semibold text-[#7886C7] mb-2">
        Itens que aceitam doação
      </h2>
      <ul className="list-disc list-inside  mb-4">
        <li>Ração para cães</li>
        <li>Medicamentos veterinários</li>
        <li>Produtos de higiene para animais</li>
      </ul>

      <div className="flex flex-col items-center">
        <img
          src={qrPix}
          alt="Doe por Pix"
          className="w-48 h-48 object-contain mb-2"
        />
        <p className="text-[#A9B5DF]">Doe por Pix</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button
          type="primary"
          size="middle"
          className="!bg-[#7886C7] !border-[#7886C7] !font-bold 
                     !flex !items-center !justify-center gap-2
                     hover:!bg-[#A9B5DF] hover:!border-[#A9B5DF]"
        >
          <Wallet size={16} />
          Doar da carteira
        </Button>

        <Button
          type="primary"
          size="middle"
          className="!bg-[#7886C7] !border-[#7886C7] !font-bold 
                     !flex !items-center !justify-center gap-2
                     hover:!bg-[#A9B5DF] hover:!border-[#A9B5DF]"
        >
          <HandHeart size={16} />
          Doar item
        </Button>
      </div>
    </div>
  );
};

export default CachorroCarameloPage;
