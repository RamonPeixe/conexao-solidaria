import { useState } from "react";
import { Form, Input, Button, Modal, message } from "antd";
import { HeartHandshake } from "lucide-react";
import api from "../../../services/api";

interface LoginFormValues {
  nome?: string;
  idade?: number;
  endereco?: string;
  telefone?: string;
  cpf?: string;
  email: string;
  senha: string;
}

const Login = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isRecoveryModalVisible, setIsRecoveryModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const toggleAccountCreation = () => {
    setIsCreatingAccount(prev => !prev);
  };

  const handleForgotPassword = () => {
    setIsRecoveryModalVisible(true);
  };

  const handleRecoverySubmit = () => {
    message.success(`Email de recuperação enviado para: ${recoveryEmail}`);
    setIsRecoveryModalVisible(false);
  };

  const onFinish = async (values: LoginFormValues) => {
    if (isCreatingAccount) {
      try {
        await api.post("/usuarios", {
          nome: values.nome,
          idade: values.idade,
          endereco: values.endereco,
          telefone: values.telefone,
          cpf: values.cpf,
          email: values.email,
          senha: values.senha,
          saldo: 0, 
        });
        message.success("Conta criada com sucesso!");
        setIsCreatingAccount(false);
      } catch (err) {
        console.error("Erro ao criar conta:", err);
        message.error("Falha ao criar conta. Tente novamente.");
      }
    } else {
      console.log("Login com:", values.email, values.senha);
      message.info("Login não implementado neste mock.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08142c] p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <HeartHandshake size={40} className="text-[#7886C7]" />
          <span className="text-xl font-extrabold text-[#7886C7]">
            Conexão Solidária
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-center text-[#7886C7] mb-6">
          {isCreatingAccount ? "Criar Conta" : "Login"}
        </h2>

        <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
          {isCreatingAccount && (
            <>
              <Form.Item
                label="Nome Completo"
                name="nome"
                rules={[{ required: true, message: "Informe seu nome completo" }]}
              >
                <Input placeholder="Seu nome completo" />
              </Form.Item>

              <Form.Item
                label="Idade"
                name="idade"
                rules={[{ required: true, message: "Informe sua idade" }]}
              >
                <Input type="number" placeholder="Ex: 28" />
              </Form.Item>

              <Form.Item
                label="Endereço"
                name="endereco"
                rules={[{ required: true, message: "Informe seu endereço" }]}
              >
                <Input placeholder="Rua, número, bairro" />
              </Form.Item>

              <Form.Item
                label="Telefone"
                name="telefone"
                rules={[{ required: true, message: "Informe seu telefone" }]}
              >
                <Input placeholder="(11) 98888-7777" />
              </Form.Item>

              <Form.Item
                label="CPF"
                name="cpf"
                rules={[{ required: true, message: "Informe seu CPF" }]}
              >
                <Input placeholder="123.456.789-01" />
              </Form.Item>
            </>
          )}

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Informe seu email" },
              { type: "email", message: "Email inválido" },
            ]}
          >
            <Input placeholder="seu@exemplo.com" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: "Informe sua senha" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          {!isCreatingAccount && (
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#A9B5DF] hover:underline cursor-pointer"
              >
                Esqueci a senha
              </button>
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full !bg-[#7886C7] hover:!bg-[#A9B5DF] !border-[#7886C7] !font-bold"
            >
              {isCreatingAccount ? "Criar Conta" : "Entrar"}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={toggleAccountCreation}
            className="text-sm text-[#7886C7] hover:underline cursor-pointer"
          >
            {isCreatingAccount ? "Já tenho conta" : "Criar Conta"}
          </button>
        </div>
      </div>

      <Modal
        title="Recuperar Senha"
        open={isRecoveryModalVisible}
        onCancel={() => setIsRecoveryModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsRecoveryModalVisible(false)}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleRecoverySubmit}
            className="!bg-[#7886C7] hover:!bg-[#A9B5DF] !border-[#7886C7] !font-bold"
          >
            Enviar Email
          </Button>,
        ]}
      >
        <p className="mb-2 text-gray-700">
          Digite seu email para receber instruções de recuperação:
        </p>
        <Input
          placeholder="Digite seu email"
          value={recoveryEmail}
          onChange={e => setRecoveryEmail(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Login;
