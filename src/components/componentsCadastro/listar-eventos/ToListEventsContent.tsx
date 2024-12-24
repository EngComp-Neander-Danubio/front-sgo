import React, { useCallback, useEffect, useState } from 'react';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { Pagination } from '../pagination/Pagination';
import { Flex, useToast } from '@chakra-ui/react';

import { IconeDeletar, IconeEditar } from '../../ViewLogin';
import { useNavigate } from 'react-router-dom';
import TableMain, { ColumnProps } from '../TableMain/TableMain';
import moment from 'moment'; // Para manipulação de fuso horário
import { Operacao } from '../../../context/eventContext/OperacaoContex';
import api from '../../../services/api';
type Data = {
  id: string;
  nomeOperacao: string;
  comandante: number;
  dataInicio: Date;
  dataFinal: Date;
};
interface Militar {
  pes_codigo: number;
  pes_nome: string;
  gra_nome: string;
  unidade_uni_sigla: string;
}
export const ToListEventsContent: React.FC = () => {
  const {
    loadOperacaosById
  } = useOperacao();
  const toast = useToast();
  const navigate = useNavigate();
  const [Operacaos, setOperacaos] = useState<Operacao[]>([]);
  //const [OperacaoById, setOperacaoById] = useState<Operacao | undefined>(undefined);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(8);
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = Operacaos.length;
  const currentData = Operacaos.slice(firstDataIndex, lastDataIndex);
  const hasMore = lastDataIndex < Operacaos.length;
  const cache = new Map<string | number, any>();
  useEffect(() => {
    loadOperacaos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    const deleteOperacao = useCallback(
      async (id: string) => {
        try {
          await api.delete(`/delete-operacao`, {
            params: {
              id: id,
            },
          });
          setOperacaos(prevOperacaos => prevOperacaos.filter(op => op.id !== id));
          toast({
            title: 'Sucesso',
            description: 'Operação deletada com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 2000,
            isClosable: true,
          });
        } catch (error) {
          console.error('Falha ao deletar a operação:', error);
          toast({
            title: 'Erro',
            description: 'Falha ao deletar a operação',
            status: 'error',
            position: 'top-right',
            duration: 2000,
            isClosable: true,
          });
        } finally {

        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

  const loadMoreOperacaos = () => {
    if (hasMore) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais Operações para carregar.',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const loadLessOperacaos = () => {
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

    const load = async (
      pes_nome: string | number,
    ): Promise<Militar[] | undefined> => {
      if (cache.has(pes_nome)) {
        return Promise.resolve(cache.get(pes_nome));
      }
      try {
        const response = await api.get<Militar[]>(`/policiais`, {
          params: { pes_nome },
        });
        return [...response.data];
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const loadOperacaos = useCallback(async (param?: string) => {
      const parameters = param || '';
      try {
        const response = await api.get<Operacao[]>(`operacoes/${parameters}`);
        const datasFormatted = await Promise.all(
          response.data.map(async item => {
            const v = await load(item.comandante);

            return {
              ...item,
              comandante: v ? v[0]?.pes_nome : '',
            };
          }),
        );
        setOperacaos((datasFormatted as unknown) as Operacao[]);
      } catch (error) {
        console.error('Falha ao carregar as Operações:', error);
      }
    }, []);
  const columns: Array<ColumnProps<Data>> = [
    {
      key: 'id',
      title: 'Id',
    },
    {
      key: 'nomeOperacao',
      title: 'Operação',
    },
    {
      key: 'comandante',
      title: 'Comandante',
    },

    {
      key: 'dataInicio',
      title: 'Data Inicial',
      render: (_, record) => {
        let formattedDate = (moment(record.dataInicio)).utc().format('DD-MMM-YYYY HH:mm:ss')
        return (
          <>
          { new Date(formattedDate).toLocaleDateString('pt-BR',)}
         </>
        );
      },
    },
    {
      key: 'dataFinal',
      title: 'Data Final',
      render: (_, record) => {
        let formattedDate = (moment(record.dataFinal)).utc().format('DD-MMM-YYYY HH:mm:ss')
        return (
          <>
           { new Date(formattedDate).toLocaleDateString('pt-BR')}
          </>
        );
      },
    },
    {
      key: 'acoes',
      title: 'Ações',
      render: (_, record) => {
        return (
          <Flex flexDirection={'row'} gap={2}>
            <IconeDeletar
              //key={`${record.id}`}
              label_tooltip={`${record.nomeOperacao}`}
              handleDelete={async () => {
                const idSolicitacao = record.id;
                await deleteOperacao(idSolicitacao);
              }}
            />
            <IconeEditar
             // key={`${record.id}`}
              label_tooltip={`${record.nomeOperacao}`}
              onOpen={async () => {
                const idSolicitacao = record.id;
                await loadOperacaosById(idSolicitacao);
                navigate(`/editar-operacao/${idSolicitacao}`);
              }}
            />
          </Flex>
        );
      },
    },
  ];
  return (
    <>
      <Flex
        //mt={2}
        flexDirection={'column'}
        w={'100%'}
      >
        <TableMain data={currentData} columns={columns} />
        <Pagination
          totalPages={totalData}
          dataPerPage={dataPerPage}
          firstDataIndex={firstDataIndex}
          lastDataIndex={lastDataIndex}
          loadLess={loadLessOperacaos}
          loadMore={loadMoreOperacaos}
        />
      </Flex>
    </>
  );
};
