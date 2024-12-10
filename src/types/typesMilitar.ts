export type OptionType = { label: string; value: string };

export enum Modaliade {
  "A PÉ" = '1',
  Viatura = '2',
  Moto = '3',
  Montado = '4',
  "Prontidão" = '5',
}
export enum Militar {
  Coronel = "1",
  TenCoronel = "2",
  Major = "3",
  'Capitão' = "4",
  PrimeiroTenente = "5",
  SegundoTenente = "6",
  SubTenente = "7",
  PrimeiroSargento = "8",
  SegundoSargento = "9",
  TerceiroSargento = "10",
  Cabo = "11",
  Soldado = "12",
  AlunoSoldado = "13",
  Aleatorio = '14',
}
export type DataEfetivo = {
  id?: string;
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
};
export const optionsMilitares: Array<{ label: string; value: string; militarRank: Militar }> = [
  { label: 'Coronel', value: 'Cel PM', militarRank: Militar.Coronel },
  { label: 'Tenente-Coronel', value: 'Ten-Cel PM', militarRank: Militar.TenCoronel },
  { label: 'Major', value: 'Maj PM', militarRank: Militar.Major },
  { label: 'Capitão', value: 'Cap PM', militarRank: Militar.Capitão },
  { label: '1° Tenente', value: '1º Ten PM', militarRank: Militar.PrimeiroTenente },
  { label: '2° Tenente', value: '2º Ten PM', militarRank: Militar.SegundoTenente },
  { label: 'Sub-Tenente', value: 'St PM', militarRank: Militar.SubTenente },
  { label: '1° Sargento', value: '1º Sgt PM', militarRank: Militar.PrimeiroSargento },
  { label: '2° Sargento', value: '2º Sgt PM', militarRank: Militar.SegundoSargento },
  { label: '3° Sargento', value: '3º Sgt PM', militarRank: Militar.TerceiroSargento },
  { label: 'Cabo', value: 'Cb PM', militarRank: Militar.Cabo },
  { label: 'Soldado', value: 'Sd PM', militarRank: Militar.Soldado },
  { label: 'Aluno-Soldado', value: 'Al Sd PM', militarRank: Militar.AlunoSoldado },
  { label: 'Aleatório', value: 'aleatorio', militarRank: Militar.Aleatorio },
];

export const columnsMapMilitar: {
  [key: string]: string;
} = {
  'id': 'id', // Exemplo: 'Ord' mapeia para 'id'
  'Matrícula': 'matricula',
  'Posto/Graduação': 'posto_grad',
  'Nome Completo': 'nome_completo',
  'Unidade': 'opm',
};

// Agora, defina a função para ordenar pela hierarquia de posto_grad
export const handleSortByPostoGrad = (militares: any[], type?: string) => {

  // Defina a ordem hierárquica das graduações (do menor para o maior)
  const hierarchy = [
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
  if (type === '1') {

    // Ordene os militares transformados de acordo com a hierarquia
    return militares.sort((a, b) => {
      const indexA = hierarchy.indexOf(a['Posto/Graduação']);
      const indexB = hierarchy.indexOf(b['Posto/Graduação']);

      // Compara os índices da hierarquia
      return indexA - indexB;
    });
  } else {
    return militares.sort((a, b) => {
      const indexA = hierarchy.indexOf(a['posto_grad']);
      const indexB = hierarchy.indexOf(b['posto_grad']);

      // Compara os índices da hierarquia
      return indexA - indexB;
    });
  }
};
// Define a função para comparar dois militares e retornar o de menor hierarquia
export const handleSortByPostoGradTwoMilitar = (militarOne: any, militarTwo: any, type?: string) => {
  // Defina a ordem hierárquica das graduações (do menor para o maior)
  const hierarchy = [
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

  // Determine o índice de cada militar na hierarquia
  const indexOne = hierarchy.indexOf(type === '1' ? militarOne['Posto/Graduação'] : militarOne['posto_grad']);
  const indexTwo = hierarchy.indexOf(type === '1' ? militarTwo['Posto/Graduação'] : militarTwo['posto_grad']);

  // Compare os índices para determinar quem tem menor hierarquia
  if (indexOne > indexTwo) {
    return true;
  } else {
    return false;
  }
};



export type OPMOption =
  | 'cgo'
  | '1°CRPM'
  | '2°CRPM'
  | '3°CRPM'
  | '4°CRPM'
  | 'cpe'
  | 'bpre'
  | 'bptur'
  | 'bpma'
  | 'rpmont'
  | 'bpgep'
  | 'cpchoque'
  | 'cotam'
  | 'bope'
  | 'bepi'
  | 'bpchoque'
  | 'copac'
  | 'cpraio'
  | '1bpm'
  | '2bpm'
  | '3bpm'
  | '4bpm'
  | '5bpm'
  | '6bpm'
  | '7bpm'
  | '8bpm'
  | '9bpm'
  | '10bpm'
  | '11bpm'
  | '12bpm'
  | '13bpm'
  | '14bpm'
  | '15bpm'
  | '16bpm'
  | '17bpm'
  | '18bpm'
  | '19bpm'
  | '20bpm'
  | '21bpm'
  | '22bpm'
  | '23bpm'
  | '24bpm'
  | '25bpm'
  | 'bsp'
  | '1cpg'
  | '2cpg'
  | '3cpg'
  | 'dpgi'
  | 'cetic'
  | 'codip'
  | 'colog'
  | 'coafi'
  | 'cgp'
  | 'cpmce'
  | 'csas'
  | 'cogepro'
  | 'cogei'
  | 'cpraio'
  | '1bpraio'
  | '2bpraio'
  | '3bpraio'
  | '4bpraio'
  | '5bpraio'
  | 'qcg'
  | '1cpg'
  | '2cpg'
  | '3cpg'
  | 'ccs'
  | 'cbmpm'
  | 'bsp'
  | 'cpjm'
  | null;

export const options = [
  {
    label:
      '1º Sgt PM NEULIMAR DE ASSIS SILVA - Matrícula: 13583919 - Unidade: 2ª COMPANHIA DO 1ºBPRAIO ',
    value: '13583919',
  },
  {
    label:
      '1º Ten PM WELTESON OLIVEIRA VIANA DA SILVA - Matrícula: 84395692 - Unidade: BATALHÃO DE POLÍCIA DO MEIO AMBIENTE ',
    value: '84395692',
  },
  {
    label:
      'Sd PM ALISON FERREIRA OLIVEIRA - Matrícula: 30864387 - Unidade: 1ª COMPANHIA DO BPMA ',
    value: '30864387',
  },
  {
    label:
      'Sd PM EXPEDITO MARTINS GOMES NETO - Matrícula: 30020561 - Unidade: 1ª COMPANHIA DO BPMA ',
    value: '30020561',
  },
  {
    label:
      'Cb PM SAULO VIEIRA RIBEIRO - Matrícula: 30732715 - Unidade: 1ª COMPANHIA DO 1ºBPRAIO ',
    value: '30732715',
  },
  {
    label:
      'Cb PM NILSON CASTRO DE SOUSA - Matrícula: 30652215 - Unidade: 1ª COMPANHIA DO 1ºBPRAIO ',
    value: '30652215',
  },
  {
    label:
      'Sd PM IGOR LIMA TEIXEIRA - Matrícula: 30889347 - Unidade: 2ª COMPANHIA DO 1ºBPRAIO ',
    value: '30889347',
  },
  {
    label:
      'Sd PM ELANNO LUIS FIRMINO LIMA - Matrícula: 3087529X - Unidade: 2ª COMPANHIA DO 1ºBPRAIO ',
    value: '3087529X',
  },
  {
    label:
      'Sd PM LEONARDO SANTANA AMORIM - Matrícula: 30732111 - Unidade: 1ª COMPANHIA DO BPMA ',
    value: '30732111',
  },
  {
    label:
      'Sd PM FRANCISCA CLERTIENY GOMES ROCHA CORDEIRO - Matrícula: 30020596 - Unidade: 1ª COMPANHIA DO BPMA ',
    value: '30020596',
  },
  {
    label:
      'St PM FRANCISCO JOSE MELO VASCONCELOS - Matrícula: 11019110 - Unidade: 1ª COMPANHIA DO 1ºBPRAIO ',
    value: '11019110',
  },
  {
    label:
      '1º Sgt PM VALDIZAR TEIXEIRA MATIAS JUNIOR - Matrícula: 30795016 - Unidade: 1ª COMPANHIA DO 1ºBPRAIO ',
    value: '30795016',
  },
  {
    label:
      'St PM ANTONIO MARCOS PINHEIRO DE LIMA - Matrícula: 12575017 - Unidade: 2ª COMPANHIA DO 1ºBPRAIO ',
    value: '12575017',
  },
  {
    label:
      '3º Sgt PM PAULO SERGIO DA SILVA BARBOSA - Matrícula: 30152719 - Unidade: 1ª COMPANHIA DO 1ºBPRAIO ',
    value: '30152719',
  },
  {
    label:
      'Sd PM FELIPE MARTINS DA SILVEIRA - Matrícula: 30866606 - Unidade: 1ª COMPANHIA DO BPMA ',
    value: '30866606',
  },
  {
    label:
      '1º Sgt PM NICOLAU RUSTINIS CARVALHO CORDEIRO - Matrícula: 13586217 - Unidade: 1ª COMPANHIA DO 1ºBPRAIO ',
    value: '13586217',
  },
  {
    label:
      'Sd PM EDUARDO DAVID LOPES DE SOUSA - Matrícula: 30880188 - Unidade: 1ª COMPANHIA DO BPMA ',
    value: '30880188',
  },
  {
    label:
      '3º Sgt PM JARDEL MOREIRA RODRIGUES - Matrícula: 30142519 - Unidade: 1º PELOTÃO DA 1ª COMPANHIA DO 1ºBPRAIO ',
    value: '30142519',
  },
  {
    label:
      'St PM FRANCISCO ARILSON COELHO LOPES - Matrícula: 10984610 - Unidade: 1ª COMPANHIA DO BPMA ',
    value: '10984610',
  },
  {
    label:
      'Sd PM THIAGO CORDEIRO LIMA LIBERATO - Matrícula: 30907329 - Unidade: 2ª COMPANHIA DO 1ºBPRAIO ',
    value: '30907329',
  },
  {
    label:
      'Ten-Cel PM NAZARENO NUNES CORDEIRO FILHO - Matrícula: 11108814 - Unidade: BATALHÃO DE POLÍCIA DE TRÂNSITO URBANO E RODOVIÁRIO ESTADUAL - Função: Comandante de Trânsito',
    value: '11108814',
  },
  {
    label:
      'Cb PM CHARLLES DOS SANTOS ESTEVAM - Matrícula: 58787817 - Unidade: 2ª COMPANHIA DO 1ºBPRAIO ',
    value: '58787817',
  },
  {
    label:
      '1º Sgt PM JOSE RICARDO DE SOUSA DA SILVA - Matrícula: 13628513 - Unidade: 2ª COMPANHIA DO 1ºBPRAIO ',
    value: '13628513',
  },
  {
    label:
      '3º Sgt PM FRANCISCO JACKSON BOTAO ARANHA - Matrícula: 30053818 - Unidade: BATALHÃO DE POLÍCIA DE TRÂNSITO URBANO E RODOVIÁRIO ESTADUAL ',
    value: '30053818',
  },
  {
    label:
      '3º Sgt PM FRANCISCO GERLANO DOS REIS SILVA - Matrícula: 30440013 - Unidade: 1º PELOTÃO DA 1ª COMPANHIA DO 1ºBPRAIO ',
    value: '30440013',
  },
  {
    label:
      'Cb PM DANIEL MAIA SOARES - Matrícula: 58818313 - Unidade: 2ª COMPANHIA DO 1ºBPRAIO ',
    value: '58818313',
  },
  {
    label:
      'Cb PM ANGELO CALEB SOUZA ALVES - Matrícula: 30731018 - Unidade: 1ª COMPANHIA DO 1ºBPRAIO ',
    value: '30731018',
  },
  {
    label:
      '3º Sgt PM SAULO ASSIS FERNANDES DE SOUZA - Matrícula: 30237811 - Unidade: 2ª COMPANHIA DO 1ºBPRAIO ',
    value: '30237811',
  },
  {
    label:
      '3º Sgt PM JOELSON LEANDRO CHAGAS FERREIRA - Matrícula: 30189019 - Unidade: 1ª COMPANHIA DO 1ºBPRAIO ',
    value: '30189019',
  },
  {
    label:
      '2º Sgt PM CLAUDIO FREITAS DA SILVA - Matrícula: 15139110 - Unidade: 2ª COMPANHIA DO 1ºBPRAIO ',
    value: '15139110',
  },
  {
    label:
      'Cb PM GUTERREY OLIVEIRA DE ALMEIDA - Matrícula: 30536010 - Unidade: 2ª COMPANHIA DO 1ºBPRAIO ',
    value: '30536010',
  },
  {
    label:
      '3º Sgt PM MARIA ALINE SALES CASTRO - Matrícula: 30218612 - Unidade: 1ª COMPANHIA DO BPMA ',
    value: '30218612',
  },
];
/* const transformedMiltitares = militaresRestantes.map(militar => {
  const transformedMilitar: {
    [key: string]: any;
  } = {};
  Object.entries(columnsMapMilitar).forEach(([newKey, originalKey]) => {
    transformedMilitar[newKey] = militar[originalKey];
  });
  return transformedMilitar;
}); */

/*   const headerKeysMilitar =
    militaresRestantes.length > 0
      ? Object.keys(militaresRestantes[0]).filter(key =>
          ['matricula', 'posto_grad', 'nome_completo', 'opm'].includes(key),
        )
      : [];
 */
