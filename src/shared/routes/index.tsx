// src/shared/routes/index.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "../../Templates/DefaultLayout.template";

import Inicio from "../../presentation/pages/Inicio";
import Instituicoes from "../../presentation/pages/Instituicoes";
import Cadastro from "../../presentation/pages/Instituicoes/Cadastro";
import InstituicaoPage from "../../presentation/pages/Instituicoes/Instituicao";
import Doacoes from "../../presentation/pages/Doacoes";
import Perfil from "../../presentation/pages/Perfil/Index";
import Login from "../../presentation/pages/Login/Index";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/inicio" />} />
    <Route path="/login" element={<Login />} />

    <Route
      path="/inicio"
      element={
        <DefaultLayout>
          <Inicio />
        </DefaultLayout>
      }
    />

    <Route
      path="/instituicoes"
      element={
        <DefaultLayout>
          <Instituicoes />
        </DefaultLayout>
      }
    />
    {/* rota de cadastro separada */}
    <Route
      path="/instituicoes/cadastro"
      element={
        <DefaultLayout>
          <Cadastro />
        </DefaultLayout>
      }
    />
    <Route
      path="/instituicoes/:id"
      element={
        <DefaultLayout>
          <InstituicaoPage />
        </DefaultLayout>
      }
    />

    <Route
      path="/doacoes"
      element={
        <DefaultLayout>
          <Doacoes />
        </DefaultLayout>
      }
    />
    <Route
      path="/perfil"
      element={
        <DefaultLayout>
          <Perfil />
        </DefaultLayout>
      }
    />
  </Routes>
);

export default AppRoutes;
