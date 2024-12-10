import App from './App.tsx';
import * as React from 'react';
import { CSSReset, ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider/index.tsx';
import { PostosProvider } from './context/postosContext/PostosContex.tsx';
import { MilitaresProvider } from './context/militaresContext/MilitarContext.tsx';
import { RequisitosProvider } from './context/requisitosContext/RequisitosContext.tsx';
import { EventsProvider } from './context/eventContext/EventsContex.tsx';
import { TotalEfetivoOPMsProvider } from './context/efetivoOPMs/EfetivoOPMsContext.tsx';
import { SolicitacoesPostosProvider } from './context/solicitacoesPostosContext/SolicitacoesPostosContex.tsx';
import { SolicitacoesPMsProvider } from './context/solicitacoesPMsContext/SolicitacoesPMsContex.tsx';
import { SolicitacoesOPMPostosProvider } from './context/solicitacoesOPMPostosContext/SolicitacoesOPMPostosContext.tsx';
import { SolicitacoesOPMPMsProvider } from './context/solicitacoesOPMPMsContext/SolicitacoesOPMPMsContext.tsx';
import { theme } from './theme.tsx';
import { IsOpenProvider } from './context/isOpenContext/UseIsOpenContext.tsx';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../sw.ts')
    .then(registration => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(error => {
      console.error('Falha ao registrar o Service Worker:', error);
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <IsOpenProvider>
          <EventsProvider>
            <SolicitacoesPostosProvider>
              <SolicitacoesPMsProvider>
                <SolicitacoesOPMPostosProvider>
                  <SolicitacoesOPMPMsProvider>
                    <TotalEfetivoOPMsProvider>
                      <MilitaresProvider>
                        <PostosProvider>
                          <RequisitosProvider>
                            <CSSReset />
                            <App />
                          </RequisitosProvider>
                        </PostosProvider>
                      </MilitaresProvider>
                    </TotalEfetivoOPMsProvider>
                  </SolicitacoesOPMPMsProvider>
                </SolicitacoesOPMPostosProvider>
              </SolicitacoesPMsProvider>
            </SolicitacoesPostosProvider>
          </EventsProvider>
        </IsOpenProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
