import { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { HeartHandshake } from "lucide-react";

const Login = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isRecoveryModalVisible, setIsRecoveryModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const toggleAccountCreation = () => {
    setIsCreatingAccount((prev) => !prev);
  };

  const handleForgotPassword = () => {
    setIsRecoveryModalVisible(true);
  };

  const handleRecoverySubmit = () => {
    // Implemente aqui a lógica para envio do email de recuperação
    console.log("Email de recuperação enviado para:", recoveryEmail);
    setIsRecoveryModalVisible(false);
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
        <Form layout="vertical">
          {isCreatingAccount && (
            <Form.Item label="Nome Completo" name="fullName">
              <Input placeholder="Seu nome completo" />
            </Form.Item>
          )}
          <Form.Item label="Email" name="email">
            <Input placeholder="Digite seu email" />
          </Form.Item>
          <Form.Item label="Senha" name="password">
            <Input.Password placeholder="Digite sua senha" />
          </Form.Item>
          {!isCreatingAccount && (
            <div className="flex justify-end mb-4">
              <button
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
          onChange={(e) => setRecoveryEmail(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Login;
