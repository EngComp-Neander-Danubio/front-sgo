import { Flex, useDisclosure } from '@chakra-ui/react';
import { Pagination } from '../pagination/Pagination';
import { useSolicitacoesPMs } from '../../../context/solicitacoesPMsContext/useSolicitacoesPMs';
import { ModalSolicitacarEfetivoRed } from '../modal/redistribuicao-efetivo/ModalSolicitarEfetivoRed';
import { IconeRedistribuir } from '../../componentesGerais/icones/iconeRedistribuir';
import { IconeVisualizar } from '../../componentesGerais/icones/iconeVisualizarSolicitacao';
import TableMain, { ColumnProps } from '../TableMain/TableMain';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
type Data = {
  id: string;
  sps_id: number;
  sps_operacao_id: string;
  solicitacao: string;
  sps_status: string;
  prazo_final: Date;
  prazo_inicial: Date;
  unidades_id: number;
  nome_operacao: string;
  qtd_efetivo: string | number;
  qtd_parcial_efetivo: string | number;
};

// lista as solicitacoes da OPM no que se refere ao efetivo policial
export const ToListSolicitacoesPMsContent = () => {
  const {
    solicitacoesPMs,
    totalData,
    loadLessSolicitacoesPMs,
    loadMoreSolicitacoesPMs,
    loadSolicitacaoPMById,
    firstDataIndex,
    lastDataIndex,
  } = useSolicitacoesPMs();
  const [datePerpage, setDatePerpage] = useState<number>(1);

        const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          setDatePerpage(parseInt(e.target.value));
        };
  const navigate = useNavigate();
  const totalPages = totalData;
  const {
    isOpen: isOpenFormRedSolEfetivo,
    onOpen: onOpenFormRedSolEfetivo,
    onClose: onCloseFormRedSolEfetivo,
  } = useDisclosure();
  const columns: Array<ColumnProps<Data>> = [

    {
      key: 'id',
      title: 'Id Solicitação',
    },
    {
      key: 'nome_operacao',
      title: 'Operação',
    },
    {
      key: 'status',
      title: 'Status',
    },
    {
      key: 'qtd_efetivo',
      title: 'Qtd Efetivo',
    },
    {
      key: 'prazo_inicial',
      title: 'Prazo Inicial',
    },
    {
      key: 'prazo_final',
      title: 'Prazo Final',
    },

    {
      key: 'acoes',
      title: 'Ações',
      render: (_, record) => {
        return (
          <Flex flexDirection={'row'} gap={2}>
            <IconeVisualizar
              key={`${record.id}`}
              label_tooltip={`${record.sps_id}`}
              onOpen={async () => {
                const idSolicitacao = Number(record.id);
                await loadSolicitacaoPMById(idSolicitacao);
                navigate(`/solicitacao-pms-id/${idSolicitacao}`);
              }}
            />
            <IconeRedistribuir
              key={`${record.id}`}
              label_tooltip={`${record.sps_id}`}
              onOpen={async () => {
                const idSolicitacao = Number(record.id);
                await loadSolicitacaoPMById(idSolicitacao);
                onCloseFormRedSolEfetivo;
              }}
            />
          </Flex>
        );
      },
    },
  ];
  return (
    <>
      <Flex flexDirection={'column'} w={'100%'}>
        <TableMain data={solicitacoesPMs} columns={columns} />
        {/* Componente de paginação */}
        <Pagination
          totalPages={totalPages}
          dataPerPage={datePerpage}
          firstDataIndex={firstDataIndex}
          lastDataIndex={lastDataIndex}
          loadLess={loadLessSolicitacoesPMs}
          loadMore={loadMoreSolicitacoesPMs}
          handlePerPageChange={handlePerPageChange}
        />
        <ModalSolicitacarEfetivoRed
          isOpen={isOpenFormRedSolEfetivo}
          onOpen={onOpenFormRedSolEfetivo}
          onClose={onCloseFormRedSolEfetivo}
        />
      </Flex>
    </>
  );
};
