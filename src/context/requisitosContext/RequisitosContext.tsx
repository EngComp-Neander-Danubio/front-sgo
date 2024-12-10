import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import militaresData from '../../assets/militares.json';
import postosData from '../../assets/postos.json';
import { useToast } from '@chakra-ui/react';
import {
  handleSortByPostoGrad,
  handleSortByPostoGradTwoMilitar,
  Militar,
  optionsMilitares,
} from '../../types/typesMilitar';
import { useRequisitos } from './useRequesitos';
import { useMilitares } from '../militaresContext/useMilitares';
import { usePostos } from '../postosContext/usePostos';
import { object } from 'prop-types';

export type Requisito = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export type Militares_service = {
  id?: string;
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
};

/* export type Postos = {
  Municipio: string;
  Local_de_Votacao: string;
  Endereco: string;
  Bairro: string;
  CEP: string;
}; */
export type Postos = {
  cidade: string;
  local: string;
  rua: string;
  bairro: string;
  numero: number;
  modalidade: string;
  Cel?: number;
  TenCel?: number;
  Maj?: number;
  Cap?: number;
  PrimeiroTen?: number;
  SegundoTen?: number;
  St?: number;
  PrimeiroSgt?: number;
  SegundoSgt?: number;
  TerceiroSgt?: number;
  Cb?: number;
  Sd?: number;
  AlSd?: number;
};

export type RequisitoServico = {
  quantity_militars: number;
  quantity_turnos: number;
  aleatoriedade: boolean;
  antiguidade: string[];
  //modalidade?: string;
  dateFirst: Date;
  dateFinish: Date;
  turnos: {
    initial: Date;
    finished: Date;
  }[];
};

export type Service = {
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
  militars: Militares_service[];
  militaresRestantes: Militares_service[];
  postosServices: Postos[];
  services: Service[];
  searchServices: Service[];
  searchServiceLoading: boolean;
  handleSubmitRequisitos: (data: RequisitoServico) => void;
  handleRandomServices: () => void;
  handleRandomServicesNewTable: () => void;
  searchServicesById: (param?: string) => Promise<Service>;
  //loadTotalMilitar: () => number;
  totalMilitar: number;
  totalMilitarEscalados: number;
}

export const RequisitosContext = createContext<
  IContextRequisitoData | undefined
>(undefined);

export const RequisitosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { militares } = useMilitares();
  const { postos, postosLocal } = usePostos();
  const [militars, setMilitares] = useState<Militares_service[]>(militares);
  const [militaresRestantes, setMilitaresRestantes] = useState<
    Militares_service[]
  >([]);
  const [postosServices, setPostosServices] = useState<Postos[]>(postosLocal);
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

  const handleSubmitRequisitos = useCallback((data: RequisitoServico) => {
    setRequisitoServico(data);
  }, []);
  const loadTotalMilitar = () => {
    setTotalMilitar(militars.length);
  };
  const loadTotalMilitarEscalados = (int: number) => {
    setTotalMilitarEscalados(p => p + int);
  };
  useEffect(() => {
    loadTotalMilitar();
  }, [militars, militares]);
  useEffect(() => {
    if (militares && Array.isArray(militares)) {
      setMilitares(militares);
    } else {
      setMilitares([]); // Inicializa como array vazio se não for um array
    }
  }, [militares]);
  useEffect(() => {
    if (postos && Array.isArray(postos)) {
      setPostosServices(postos);
      //console.log('postos services', postosServices);
    } else {
      setPostosServices([]); // Inicializa como array vazio se não for um array
    }
  }, [postos, postosServices]);

  const handleRandomServices = () => {
    const generateServices = () => {
      const services: Service[] = [];
      let remainingMilitares = [...militars]; // Clona a lista de militares

      const groupedMilitares: Record<string, Militares_service[]> = {};

      if (!requisitoServico || !postosServices) return;
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
                //console.log('aux1', aux);
                //console.log('aux2', aux2);
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
            //console.log(groupedMilitares[a]);
            //console.log(groupedMilitares[a]?.length);
          });

          requisitoServico.turnos.forEach(turno => {
            postosServices?.forEach(posto => {
              const selectedMilitares: Militares_service[] = [];

              // Preenche militares conforme a antiguidade e lotação
              requisitoServico.antiguidade.forEach(a => {
                const militaresComLotacao = groupedMilitares[a].filter(
                  m =>
                    selectedMilitares.length > 0 &&
                    m.opm === selectedMilitares[0].opm,
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
                    requisitoServico.quantity_militars &&
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
                posto: `${posto?.local} - ${posto?.rua}-${posto.numero}, ${posto?.bairro}, ${posto?.cidade}`,
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
            postosServices.forEach(posto => {
              const selectedMilitares: Militares_service[] = [];

              // Filtra militares conforme a lotação e antiguidade, até atingir a quantidade necessária
              while (
                selectedMilitares.length < requisitoServico.quantity_militars
              ) {
                const militaresComLotacao = remainingMilitares.filter(
                  m =>
                    selectedMilitares.length > 0 &&
                    m.opm === selectedMilitares[0].opm,
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
                posto: `${posto?.local} - ${posto?.rua}-${posto?.numero}, ${posto?.bairro}, ${posto?.cidade}`,
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
      let remainingMilitares = [...militars];
      let postos_services = [...postos];
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

      if (!requisitoServico || !postosServices) return;

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
                      m.opm === selectedMilitares[0]?.opm,
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
            militar.opm.toLowerCase().includes(lowercasedParam),
          ) || // Verifica a OPM nos militares em minúsculas
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
      militars,
      postosServices,
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
    }),
    [
      militars,
      postosServices,
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
    ],
  );

  return (
    <RequisitosContext.Provider value={contextValue}>
      {children}
    </RequisitosContext.Provider>
  );
};
