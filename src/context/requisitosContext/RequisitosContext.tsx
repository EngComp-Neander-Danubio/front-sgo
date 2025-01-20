import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import {
  handleSortByPostoGrad,
  optionsMilitares,
} from '../../types/typesMilitar';
import api from '../../services/api';
import { useOperacao } from '../eventContext/useOperacao';
import { PostoForm } from '../postosContext/PostosContex';
import { useToast } from '@chakra-ui/react';

export type Requisito = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export type Militares_service = {
  id?: string;
  nome_completo: string;
  opm_sigla: string;
  matricula: string;
  posto_grad: string;
};


export type Postos = {
  id?: string;
  local: string;
  endereco: string;
  numero: number;
  bairro: string;
  cidade: string;
  modalidade: string;
  militares_por_posto: number;
  operacao_id?: number | null;
  solicitacao_id?: number | null;
  uni_codigo?: number | null;
};

export type RequisitoServico = {
  quantity_turnos: number;
  aleatoriedade: boolean;
  antiguidade: string[];
  dateFirst: Date;
  dateFinish: Date;
  turnos: {
    initial: Date;
    finished: Date;
  }[];
};

export type Service = {
  id_posto?: string;
  posto: string;
  dia: Date;
  turno: [Date, Date];
  modalidade: string;
  militares: Militares_service[];
};

export interface IContextRequisitoData {
  dateFirst: Date;
  dateFinished: Date;
  requisitoServico: RequisitoServico;
  militaresRestantes: Militares_service[];
  services: Service[];
  searchServices: Service[];
  searchServiceLoading: boolean;
  removeQtdMilitaresRestantes: (matricula: string) => Promise<void>
  addQtdMilitaresRestantes: (matricula: string) => Promise<void>
  deleteMilitarFromService:(servico: Service, matricula: string) => void;
  handleSubmitRequisitos: (data: RequisitoServico) => void;
  handleRandomServices: () => void;
  handleRandomServicesNewTable: () => void;
  searchServicesById: (param?: string) => Promise<Service>;
  totalMilitar: number;
  totalMilitarEscalados: number;
}

export const RequisitosContext = createContext<
  IContextRequisitoData | undefined
>(undefined);

export const RequisitosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { OperacaoById } = useOperacao();
  const [postosLocal, setPostosLocal] = useState<PostoForm[]>([]);
  const [pms, setPMs] = useState<Militares_service[]>([]);
  useEffect(()=>{
    if(OperacaoById?.id){
      loadPMsFromToBackend(OperacaoById?.id)
      loadPostosFromToBackend(OperacaoById?.id)
    }


  },[OperacaoById?.id])
  const loadPMsFromToBackend = async (id: string) => {
    try {
      const response = await api.get<Militares_service[]>(`/listar-efetivo`, {
        params: {
          operacao_id: id,
        },
      });
      const newPMs: Militares_service[] = response.data.filter(
        novopm_sigla =>
          !pms.some(
            pms =>
              novopm_sigla.matricula === pms.matricula &&
              novopm_sigla.nome_completo === pms.nome_completo &&
              novopm_sigla.opm_sigla === pms.opm_sigla &&
              novopm_sigla.posto_grad === pms.posto_grad
          ),
      );
      setPMs(newPMs);

    } catch (err) {
      if (err instanceof Error) {
        console.error(`Erro ao carregar PPMM: ${err.message}`);
      } else {
        console.error('Erro desconhecido ao carregar PPMM:', err);
      }
    }
  };
  const loadPostosFromToBackend = async (id: string) => {
    try {
      const response = await api.get<PostoForm[]>(`/listar-postos`, {
        params: {
          id: id,
        },
      });
      const newPostos: PostoForm[] = response.data.filter(
        novoPosto =>
          !postosLocal.some(
            postoExistente =>
              novoPosto.local === postoExistente.local &&
            novoPosto.bairro === postoExistente.bairro &&
            novoPosto.numero === postoExistente.numero &&
            novoPosto.endereco === postoExistente.endereco &&
            novoPosto.cidade === postoExistente.cidade,
          ),
        );
        setPostosLocal(newPostos);

      } catch (err) {
        if (err instanceof Error) {
          console.error(`Erro ao carregar postos: ${err.message}`);
        } else {
          console.error('Erro desconhecido ao carregar postos:', err);
        }
      }
    };

  const [militaresRestantes, setMilitaresRestantes] = useState<
    Militares_service[]
  >([]);
  const [totalMilitar, setTotalMilitar] = useState<number>(0);
  const [dateFirst, setDateFirst] = useState<Date>();
  const [dateFinished, setdateFinished] = useState<Date>();
  const [searchServiceLoading, setSearchServiceLoading] = useState<boolean>(
    false,
  );
  const [totalMilitarEscalados, setTotalMilitarEscalados] = useState<number>(0);
  const [services, setServices] = useState<Service[]>([]);
  const [searchServices, setsearchServices] = useState<Service[]>([]);
  const [requisitoServico, setRequisitoServico] = useState<RequisitoServico>();
  const toast = useToast();

  const handleSubmitRequisitos = useCallback((data: RequisitoServico) => {
    setRequisitoServico(data);
  }, []);
  const loadTotalMilitar = () => {
    setTotalMilitar(pms.length);
  };
  const loadTotalMilitarEscalados = (int: number) => {
    setTotalMilitarEscalados(p => p + int);
  };
  useEffect(() => {
    loadTotalMilitar();
  }, []);

  const addQtdMilitaresRestantes = useCallback(
    async (matricula: string) => {
      const updatedMilitares = pms.filter((m) => m.matricula === matricula);
      setMilitaresRestantes((prev) => [...prev, ...updatedMilitares]);
      setTotalMilitarEscalados((prev) => prev + 1);
    },
    [pms, militaresRestantes]
  );


  const removeQtdMilitaresRestantes = useCallback(
    async (matricula: string) => {
      const updatedMilitares = militaresRestantes.filter((m)=> m.matricula !== matricula)
      console.log(updatedMilitares);
      setMilitaresRestantes([...updatedMilitares])
      setTotalMilitarEscalados(prev => prev + 1)
    },
    [services, setServices, militaresRestantes]
  );
const deleteMilitarFromService = useCallback(
  (servico: Service, matricula: string) => {
    console.log('Chamou deletar', matricula);

    // Atualiza os serviços removendo o militar específico
    const updatedServices = services.map((service) => {
      // Verificando se o serviço é o mesmo (mesma data e posto)
      const isSameService =
        new Date(service.dia).getTime() === new Date(servico.dia).getTime() &&
        service.posto === servico.posto;

      if (isSameService) {
        // Filtra os militares para remover o militar com a matrícula especificada
        const updatedMilitares = service.militares.filter(
          (militar) => militar.matricula !== matricula
        );

        // Retorna o serviço com a lista de militares atualizada
        return {
          ...service,
          militares: updatedMilitares,
        };
      }
      console.log(service)
      // Caso não seja o serviço que queremos modificar, retornamos o serviço original
      return service;
    });

    // Atualiza o estado com os serviços modificados
    setServices(updatedServices);

    // Exibe o toast de sucesso
    toast({
      title: 'Exclusão de Militar no Posto de Serviço.',
      description: 'Militar excluído com sucesso do serviço.',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  },
  [services, setServices, toast] // Dependências relevantes
);


  const handleRandomServices = () => {
    const generateServices = () => {
      setTotalMilitar(0)
      setTotalMilitarEscalados(0)
      setMilitaresRestantes([])
      const services: Service[] = [];
      let remainingMilitares = [...pms]; // Clona a lista de militares

      const groupedMilitares: Record<string, Militares_service[]> = {};

      if (!requisitoServico || !postosLocal) return;
      setDateFirst(requisitoServico.dateFirst);
      setdateFinished(requisitoServico.dateFinish);

      let currentDate = new Date(requisitoServico.dateFirst);
      if (!requisitoServico.aleatoriedade) {
        while (currentDate <= requisitoServico.dateFinish) {
          requisitoServico.antiguidade.forEach((a, index) => {
            // Separa por posto/graduação

            const beforeAntiguidade = requisitoServico.antiguidade[index - 1];
            // Filtra militares de acordo com a antiguidade
            groupedMilitares[a] = remainingMilitares.filter(m => {
              //console.log('m', m);
              if (a === 'aleatorio') {
                // Se for 'aleatorio', incluir lógica específica aqui
                console.log('entrou em aleatorio');
                const aux = {
                  label: m.posto_grad,
                  name: m.nome_completo,
                  militarRank: optionsMilitares.find(
                    opt => opt.value === m.posto_grad,
                  )?.militarRank,
                };
                const aux2 = {
                  label: groupedMilitares[beforeAntiguidade][0].posto_grad,
                  name: groupedMilitares[beforeAntiguidade][0].nome_completo,
                  militarRank: optionsMilitares.find(
                    opt =>
                      opt.value ===
                      groupedMilitares[beforeAntiguidade][0].posto_grad,
                  )?.militarRank,
                };
                if (
                  aux?.militarRank &&
                  aux2?.militarRank &&
                  Number(aux.militarRank) > Number(aux2.militarRank)
                ) {
                  return Number(aux.militarRank) > Number(aux2.militarRank); // Incluir no grupo 'aleatorio' se a condição for atendida
                }
              } else {
                return m.posto_grad === a;
              }
            });
          });

          requisitoServico.turnos.forEach(turno => {
            postosLocal?.forEach(posto => {
              const selectedMilitares: Militares_service[] = [];

              // Preenche militares conforme a antiguidade e lotação
              requisitoServico.antiguidade.forEach(a => {
                const militaresComLotacao = groupedMilitares[a].filter(
                  m =>
                    selectedMilitares.length > 0 &&
                    m.opm_sigla === selectedMilitares[0].opm_sigla,
                );

                let militar;
                if (militaresComLotacao.length > 0) {
                  militar = militaresComLotacao[0];
                } else {
                  militar = groupedMilitares[a][0];
                }

                if (militar) {
                  selectedMilitares.push(militar);
                  groupedMilitares[a] = groupedMilitares[a].filter(
                    m => m.matricula !== militar.matricula,
                  );
                  remainingMilitares = remainingMilitares.filter(
                    m => m.matricula !== militar.matricula,
                  );
                }
              });

              requisitoServico.antiguidade.forEach((a, index) => {
                if (
                  selectedMilitares.length <
                    posto.militares_por_posto &&
                  groupedMilitares[a].length === 0
                ) {
                  const nextAntiguidade =
                    requisitoServico.antiguidade[index + 1];
                  if (
                    nextAntiguidade &&
                    groupedMilitares[nextAntiguidade].length > 0
                  ) {
                    selectedMilitares.push(
                      groupedMilitares[nextAntiguidade].shift()!,
                    );
                  }
                }
              });

              // Cria o objeto de serviço
              const service: Service = {
                posto: `${posto?.local} - ${posto?.endereco}-${posto.numero}, ${posto?.bairro}, ${posto?.cidade}`,
                dia: new Date(currentDate), // Clone para evitar mutação
                turno: [new Date(turno.initial), new Date(turno.finished)], // Hora do turno
                modalidade: `${posto?.modalidade}`,
                militares: handleSortByPostoGrad(selectedMilitares, '2'), // Adiciona os militares selecionados
              };

              services.push(service);
              loadTotalMilitarEscalados(service.militares.length);
            });
          });

          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else
        while (currentDate <= requisitoServico.dateFinish) {
          requisitoServico.turnos.forEach(turno => {
            postosLocal.forEach(posto => {
              const selectedMilitares: Militares_service[] = [];

              // Filtra militares conforme a lotação e antiguidade, até atingir a quantidade necessária
              while (
                selectedMilitares.length < posto.militares_por_posto
              ) {
                const militaresComLotacao = remainingMilitares.filter(
                  m =>
                    selectedMilitares.length > 0 &&
                    m.opm_sigla === selectedMilitares[0].opm_sigla,
                );

                let militar;
                if (militaresComLotacao.length > 0) {
                  militar = militaresComLotacao[0];
                } else {
                  militar = remainingMilitares[0];
                }

                if (militar) {
                  selectedMilitares.push(militar);
                  remainingMilitares = remainingMilitares.filter(
                    m => m.matricula !== militar.matricula,
                  );
                } else {
                  break; // Se não houver mais militares disponíveis, sai do loop
                }
              }

              // Cria o objeto de serviço
              const service: Service = {
                posto: `${posto?.local} - ${posto?.endereco}-${posto?.numero}, ${posto?.bairro}, ${posto?.cidade}`,
                dia: new Date(currentDate), // Clone para evitar mutação
                turno: [new Date(turno.initial), new Date(turno.finished)], // Hora do turno
                modalidade: posto.modalidade,
                militares: handleSortByPostoGrad(selectedMilitares, '2'), // Adiciona os militares selecionados
              };

              services.push(service);
              loadTotalMilitarEscalados(service.militares.length);
            });
          });

          // Avança para o próximo dia
          currentDate.setDate(currentDate.getDate() + 1);
        }

      setServices(services);
      setsearchServices(services);
      setMilitaresRestantes(remainingMilitares);
      return services;
    };

    generateServices();
  };

  const handleRandomServicesNewTable = () => {
    const generateServices = () => {
      const services: Service[] = [];
      let remainingMilitares = [...pms];
      let postos_services = [...postosLocal];
      const grad = [
        'Cel PM',
        'Ten-Cel PM',
        'Maj PM',
        'Cap PM',
        '1º Ten PM',
        '2º Ten PM',
        'St PM',
        '1º Sgt PM',
        '2º Sgt PM',
        '3º Sgt PM',
        'Cb PM',
        'Sd PM',
        'Al Sd PM',
      ];
      const groupedMilitares: Record<string, Militares_service[]> = {};

      if (!requisitoServico || !postosLocal) return;

      setDateFirst(requisitoServico.dateFirst);
      setdateFinished(requisitoServico.dateFinish);

      // Agrupando os militares por graduação
      grad.forEach(grade => {
        groupedMilitares[grade] = remainingMilitares.filter(
          m => m.posto_grad === grade,
        );
      });

      let currentDate = new Date(requisitoServico.dateFirst);

      while (currentDate <= requisitoServico.dateFinish) {
        requisitoServico.turnos.forEach(turno => {
          postos_services.forEach(posto => {
            const selectedMilitares: Militares_service[] = []; // Resetar para cada posto

            // Percorre as graduações, apenas se 'key' for uma graduação válida
            for (const key in posto) {
              const formattedKey = `${key} PM`; // Formata a chave como esperado
              if (grad.includes(formattedKey)) {
                let i = posto[key] as number; // Número de militares para aquela graduação

                while (i > 0 && groupedMilitares[formattedKey]?.length > 0) {
                  let militar: Militares_service | undefined;

                  // 1. Tenta selecionar militares com a mesma lotação que já foram selecionados
                  const militaresComLotacao = groupedMilitares[
                    formattedKey
                  ].filter(
                    m =>
                      selectedMilitares.length > 0 &&
                      m.opm_sigla === selectedMilitares[0]?.opm_sigla,
                  );

                  if (militaresComLotacao.length > 0) {
                    militar = militaresComLotacao[0];
                  } else {
                    // 2. Se não houver militares com a mesma lotação, seleciona o próximo disponível
                    militar = groupedMilitares[formattedKey][0];
                  }

                  if (militar) {
                    selectedMilitares.push(militar);

                    // Remove o militar selecionado do agrupamento e dos restantes
                    groupedMilitares[formattedKey] = groupedMilitares[
                      formattedKey
                    ].filter(m => m.matricula !== militar!.matricula);
                    remainingMilitares = remainingMilitares.filter(
                      m => m.matricula !== militar!.matricula,
                    );
                  }

                  i--; // Reduz a contagem de militares necessários
                }
              }
            }

            // Cria o objeto de serviço
            const service: Service = {
              id_posto: posto?.id ? posto.id : undefined,
              posto: `${posto.local} - ${posto.rua}-${posto.numero}, ${posto.bairro}, ${posto.cidade}`,
              dia: new Date(currentDate), // Clone para evitar mutação
              turno: [new Date(turno.initial), new Date(turno.finished)], // Hora do turno
              modalidade: posto.modalidade,
              militares: handleSortByPostoGrad(selectedMilitares, '2'), // Adiciona os militares selecionados
            };

            services.push(service);
            loadTotalMilitarEscalados(service.militares.length);
          });
        });

        // Avança para o próximo dia
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setServices(services);
      setsearchServices(services);
      setMilitaresRestantes(remainingMilitares);
      return services;
    };

    generateServices();
  };

  const searchServicesById = useCallback(
    async (param?: string) => {
      if (!param) {
        setsearchServices(services);
        setSearchServiceLoading(true);
        return;
      }

      const lowercasedParam = param.toLowerCase();

      const result: Service[] = services.filter(service => {
        const diaAsString = service.dia.toISOString().toLowerCase(); // Converte a data para string no formato ISO e para minúsculas
        const turnoAsString = service.turno
          .map(turno => turno.toISOString().toLowerCase())
          .join(','); // Converte cada item de turno para string em minúsculas e os junta em uma única string

        return (
          diaAsString.includes(lowercasedParam) || // Verifica se a string da data inclui o parâmetro em minúsculas
          service.militares.some(militar =>
            militar.nome_completo.toLowerCase().includes(lowercasedParam),
          ) || // Verifica o nome nos militares em minúsculas
          service.militares.some(militar =>
            militar.opm_sigla.toLowerCase().includes(lowercasedParam),
          ) || // Verifica a opm_sigla nos militares em minúsculas
          service.militares.some(militar =>
            militar.posto_grad.toLowerCase().includes(lowercasedParam),
          ) || // Verifica o posto/graduação nos militares em minúsculas
          service.militares.some(militar =>
            militar.matricula.toLowerCase().includes(lowercasedParam),
          ) || // Verifica a matrícula nos militares em minúsculas
          service.modalidade.toLowerCase().includes(lowercasedParam) || // Verifica na modalidade em minúsculas
          service.posto.toLowerCase().includes(lowercasedParam) || // Verifica no posto em minúsculas
          turnoAsString.includes(lowercasedParam) // Verifica se a string do turno inclui o parâmetro em minúsculas
        );
      });

      setsearchServices(result);
      setSearchServiceLoading(true);
    },
    [services],
  );

  const contextValue = useMemo(
    () => ({

      requisitoServico,
      services,
      searchServices,
      searchServiceLoading,
      totalMilitar,
      totalMilitarEscalados,
      militaresRestantes,
      dateFirst,
      dateFinished,
      handleSubmitRequisitos,
      handleRandomServices,
      handleRandomServicesNewTable,
      searchServicesById,
      deleteMilitarFromService,
      addQtdMilitaresRestantes,
      removeQtdMilitaresRestantes,
    }),
    [

      requisitoServico,
      services,
      searchServices,
      searchServiceLoading,
      totalMilitar,
      totalMilitarEscalados,
      militaresRestantes,
      dateFirst,
      dateFinished,
      handleSubmitRequisitos,
      handleRandomServices,
      handleRandomServicesNewTable,
      searchServicesById,
      deleteMilitarFromService,
      addQtdMilitaresRestantes,
      removeQtdMilitaresRestantes,
    ],
  );

  return (
    <RequisitosContext.Provider value={contextValue}>
      {children}
    </RequisitosContext.Provider>
  );
};
