import React from 'react';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { Pagination } from '../pagination/Pagination';
import { Flex } from '@chakra-ui/react';

import { IconeDeletar, IconeEditar } from '../../ViewLogin';
import { useNavigate } from 'react-router-dom';
import TableMain, { ColumnProps } from '../TableMain/TableMain';
import moment from 'moment'; // Para manipulação de fuso horário
import { format } from 'date-fns';
import { LocaleOptions } from 'date-fns/locale'; // Importar locale se for necessário
type Data = {
  id: string;
  nomeOperacao: string;
  comandante: number;
  dataInicio: Date;
  dataFinal: Date;
};

export const ToListEventsContent: React.FC = () => {
  const {
    loadOperacaosById,
    deleteOperacao,
    Operacaos,
    OperacaoById,
    loadLessOperacaos,
    loadMoreOperacaos,
    totalData,
    firstDataIndex,
    lastDataIndex,
    dataPerPage,
  } = useOperacao();
  const navigate = useNavigate();
  const columns: Array<ColumnProps<Data>> = [
    /* {
      key: 'id',
      title: 'Id',
    }, */
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
              key={`${record.id}`}
              label_tooltip={`${record.nomeOperacao}`}
              handleDelete={async () => {
                const idSolicitacao = record.id;
                await deleteOperacao(idSolicitacao);
              }}
            />
            <IconeEditar
              key={`${record.id}`}
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
        <TableMain data={Operacaos} columns={columns} />
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
