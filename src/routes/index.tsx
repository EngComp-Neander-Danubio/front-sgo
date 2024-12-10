import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Ficha } from '../pages/views/ficha';
import { Login } from '../pages/views/login/Login';
import { PageAddGrandeEvento } from '../pages/views/page-Add-Grande-Evento/PageAddGrandeEvento';
import { PostoServico } from '../pages/views/page-cadastrar-posto-de-servico/PostoServico';
import { EditarPostoServico } from '../pages/views/page-editar-posto-de-Servico/EditarPostoServico';
import { HomePrincipal } from '../pages/views/page-home';
import { ListEvent } from '../pages/views/page-listar-eventos/ListEvent';
import { LoginSGO } from '../pages/views/page-login-sgo/LoginSGO';
import { SolicitacaoPMs } from '../pages/views/page-solicitacoes-pms';
import { SolicitacaoPostos } from '../pages/views/page-solicitacoes-postos';
import { ViewSolicitacaoPMs } from '../pages/views/page-viewSolicitacao-pms';
import { ViewSolicitacaoPostos } from '../pages/views/page-viewSolicitacao-postos';
import PrivateRoute from '../protected-routes/protectedRoutes';

export const Rotas = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-sgo" element={<LoginSGO />} />

        {/* Rotas privadas */}
        {/* <Route
          path="/ficha"
          element={
            <PrivateRoute>
              <Ficha />
            </PrivateRoute>
          }
        />
        <Route
          path="/criar-operacao"
          element={
            <PrivateRoute>
              <PostoServico />
            </PrivateRoute>
          }
        />
        <Route
          path="/criar-operacao/*"
          element={
            <PrivateRoute>
              <EditarPostoServico />
            </PrivateRoute>
          }
        />
        <Route
          path="/listar-operacoes"
          element={
            <PrivateRoute>
              <ListEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/adicionar-operacao"
          element={
            <PrivateRoute>
              <PageAddGrandeEvento />
            </PrivateRoute>
          }
        />
        <Route
          path="/novoRegistro"
          element={
            <PrivateRoute>
              <Ficha />
            </PrivateRoute>
          }
        />
        <Route
          path="/listar-solicitacoes-postos"
          element={
            <PrivateRoute>
              <SolicitacaoPostos />
            </PrivateRoute>
          }
        />
        <Route
          path="/listar-solicitacoes-pms"
          element={
            <PrivateRoute>
              <SolicitacaoPMs />
            </PrivateRoute>
          }
        />
        <Route
          path="/solicitacao-posto-id/*"
          element={
            <PrivateRoute>
              <ViewSolicitacaoPostos />
            </PrivateRoute>
          }
        />
        <Route
          path="/solicitacao-pms-id/*"
          element={
            <PrivateRoute>
              <ViewSolicitacaoPMs />
            </PrivateRoute>
          }
        /> */}
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-sgo" element={<LoginSGO />} />
        <Route path="/ficha" element={<Ficha />} />
        <Route path="/criar-operacao" element={<PostoServico />} />
        <Route path="/editar-operacao/*" element={<EditarPostoServico />} />
        <Route path="/listar-operacoes" element={<ListEvent />} />
        <Route path="/adicionar-operacao" element={<PageAddGrandeEvento />} />
        <Route path="/novoRegistro" element={<Ficha />} />
        <Route
          path="/listar-solicitacoes-postos"
          element={<SolicitacaoPostos />}
        />
        <Route path="/listar-solicitacoes-pms" element={<SolicitacaoPMs />} />
        <Route
          path="/solicitacao-posto-id/*"
          element={<ViewSolicitacaoPostos />}
        />
        <Route path="/solicitacao-pms-id/*" element={<ViewSolicitacaoPMs />} />
      </Routes>
    </Router>
  );
};
