import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "../../Templates/DefaultLayout.template";

import Inicio from "../../presentation/pages/Inicio";
import Instituicoes from "../../presentation/pages/Instituicoes";
import Doacoes from "../../presentation/pages/Doacoes";
import Perfil from "../../presentation/pages/Perfil/Index";
import CachorroCarameloPage from "../../presentation/pages/Instituicoes/Instituicao";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" />} />
      
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

      <Route
        path="/instituicoes/cachorro-caramelo"
        element={
          <DefaultLayout>
            <CachorroCarameloPage />
          </DefaultLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
