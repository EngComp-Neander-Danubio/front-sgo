import * as yup from 'yup';
export const postosSchema = yup.object().shape({
  "local": yup.string().required('Campo obrigatório'),
  "endereco": yup.string().required('Campo obrigatório'),
  "bairro": yup.string().required('Campo obrigatório'),
  "numero": yup.number().required('Campo obrigatório'),
  "cidade": yup.string().required('Campo obrigatório'),
  "modalidade": yup.string().required('Campo obrigatório'),
  'militares_por_posto': yup.number().required('Campo obrigatório').min(1, 'No minimo um policial'),
});


export const columnsMapPostos: {
  [key: string]: string;
} = {
  'Id': 'id',
  'Local': 'local',
  'Rua': 'rua',
  'Número': 'numero',
  'Bairro': 'bairro',
  'Cidade': 'cidade',
  'Modalidade': 'modalidade',
  'Qtd Efetivo': 'militares_por_posto',
  'Qtd Militares': 'militares_por_posto',

};

