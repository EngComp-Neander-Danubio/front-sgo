import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { Pagination } from '../pagination/Pagination';
import { useSolicitacoesPostos } from '../../../context/solicitacoesPostosContext/useSolicitacoesPostos';
import { ModalSolicitacarPostosRed } from '../modal/redistribuicao-postos/ModalSolicitarPostosRed';
import React, { useEffect, useState } from 'react';
import TableMain, { ColumnProps } from '../TableMain/TableMain';
import { IconeRedistribuir } from '../../componentesGerais/icones/iconeRedistribuir';
import { IconeVisualizar } from '../../componentesGerais/icones/iconeVisualizarSolicitacao';
import { useNavigate } from 'react-router-dom';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { PostoForm } from '../../../context/postosContext/PostosContex';
import api from '../../../services/api';

type Data = {
  isOpen?: boolean;
  escala_id: number;
  operacao_id: string;
  nome_operacao: string;
};
// lista as solicitacoes da OPM no que se refere ao posto de serviço
export const ToListEscalasContent: React.FC = () => {
  const toast = useToast();
  const [escalas, setEscalas] = useState<Data[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [datePerpage, setDatePerpage] = useState<number>(1);

    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDatePerpage(parseInt(e.target.value));
    };
  const lastDataIndex = (currentDataIndex + 1) * datePerpage;
  const firstDataIndex = lastDataIndex - datePerpage;
  const totalData = escalas.length;
  const currentData = escalas.slice(firstDataIndex, lastDataIndex);
  const hasMore = lastDataIndex < escalas.length;

  const loadEscalasFromToBackend = async (id: string) => {
    try {
      const response = await api.get<Data[]>(`/escalas`, {
        params: {
          id: id,
        },
      });
        setEscalas(response.data);

      } catch (err) {
        if (err instanceof Error) {
          console.error(`Erro ao carregar escalas: ${err.message}`);
        } else {
          console.error('Erro desconhecido ao carregar escalas:', err);
        }
      }
    };
  useEffect(()=>{
    if(OperacaoById?.id)
      loadEscalasFromToBackend(OperacaoById?.id)
  },[])
  const navigate = useNavigate();
  const { OperacaoById } = useOperacao();

  const loadMore = () => {
    if (hasMore) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais escalas para carregar.',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  // OK
  const loadLess = () => {
    if (firstDataIndex > 0) {
      setCurrentDataIndex(prevIndex => prevIndex - 1);
    } else {
      toast({
        title: 'Início dos dados',
        description: 'Você está na primeira página.',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  const columns: Array<ColumnProps<Data>> = [

    {
      key: 'escala_id',
      title: 'Id Operação',
    },
    {
      key: 'operacao_nome',
      title: 'Operação',
    },
    {
      key: 'acoes',
      title: 'Ações',
      render: (_, record) => {
        return (
          <Flex flexDirection={'row'} gap={2}>
            <span key={`visualizar-${record.escala_id}`}>
              <IconeVisualizar
                key={`${record.escala_id}`}
                label_tooltip={`${record.escala_id}`}
                onOpen={async () => {
                  const idSolicitacao = Number(record.escala_id);
                  navigate(`/escalas/pdf/${record.escala_id}`);
                }}
              />
            </span>
          </Flex>
        );
      },
    },
  ];
  return (
    <>
      <Flex flexDirection={'column'} w={'100%'}>
        <TableMain data={currentData} columns={columns} />
        {/* Componente de paginação */}
        <Pagination
          totalPages={totalData}
          dataPerPage={datePerpage}
          firstDataIndex={firstDataIndex}
          lastDataIndex={lastDataIndex}
          loadLess={loadLess}
          loadMore={loadMore}
          handlePerPageChange={handlePerPageChange}
        />
      </Flex>
    </>
  );
};
