import { Carousel, Button } from "antd";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <>
      <div className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#7886C7]">Quem Somos Nós?</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
          O projeto{" "}
          <span className="text-[#A9B5DF] font-bold">Conexão Solidária</span>{" "}
          nasceu como parte da disciplina de Projeto de Sistemas do IFSP, com o
          propósito de conectar doadores e instituições de forma simples e
          intuitiva. Nosso objetivo é tornar o processo de doação mais prático e
          acessível, garantindo que ajuda chegue a quem realmente precisa.
        </p>
        <p className="mt-4 text-lg font-semibold text-[#A9B5DF]">
          Fazer o bem nunca foi tão fácil!
        </p>
      </div>

      <div className="bg-white rounded py-12">
        <h2 className="text-2xl font-semibold text-center text-[#7886C7] mb-6">
          Nosso Impacto
        </h2>
        <Carousel autoplay fade className="w-3/4 mx-auto">
          <div>
            <img
              src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9uYXRpb258ZW58MHx8MHx8fDA%3D"
              alt="Doação 1"
              className="w-full h-164 object-cover"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9uYXRpb258ZW58MHx8MHx8fDA%3D"
              alt="Doação 2"
              className="w-full h-164 object-cover"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9uYXRpb258ZW58MHx8MHx8fDA%3D"
              alt="Doação 3"
              className="w-full h-164 object-cover"
            />
          </div>
        </Carousel>
        <div className="text-center mt-6">
          <Link to="/instituicoes">
            <Button
              size="large"
              className="!bg-[#7886C7] !border-[#7886C7] !text-white 
             hover:!bg-[#A9B5DF] hover:!border-[#A9B5DF] font-bold"
            >
              Ajude Agora
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Inicio;
