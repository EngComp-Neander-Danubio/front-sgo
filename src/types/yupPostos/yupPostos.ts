import * as yup from 'yup';
import { IconeRedistribuir } from '../../components/componentesFicha/registrosMedicos/icones/iconeRedistribuir';
import { ColumnProps } from '../../components/componentsCadastro/TableMain/TableMain';
import { IconeEditar } from '../../components/ViewLogin';
export const postosSchema = yup.object().shape({
  "local": yup.string().required('Campo obrigatório'),
  "rua": yup.string().required('Campo obrigatório'),
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

/* 'Coronel': yup.string().required('Campo obrigatório'),
  'Ten Cel': yup.string().required('Campo obrigatório'),
  'Major':yup.string().required('Campo obrigatório'),
  'Capitão':yup.string().required('Campo obrigatório'),
  '1º Ten':yup.string().required('Campo obrigatório'),
  '2º Ten':yup.string().required('Campo obrigatório'),
  'Sub tenente':yup.string().required('Campo obrigatório'),
  '1º Sgt':yup.string().required('Campo obrigatório'),
  '2º Sgt':yup.string().required('Campo obrigatório'),
  '3º Sgt':yup.string().required('Campo obrigatório'),
  'Cb':yup.string().required('Campo obrigatório'),
  'Sd': yup.string().required('Campo obrigatório'), */

/*
'Coronel': 'Cel', // Coronel
'Ten Cel': 'Ten-Cel', // Tenente-Coronel
'Major': 'Maj', // Major
'Capitão': 'Cap', // Capitão
'1º Ten': '1º Ten', // 1º Tenente
'2º Ten': '2º Ten', // 2º Tenente
'Sub tenente': 'St', // Sub-Tenente
'1º Sgt': '1º Sgt', // 1º Sargento
'2º Sgt': '2º Sgt', // 2º Sargento
'3º Sgt': '3º Sgt', // 3º Sargento
'Cb': 'Cb', // Cabo
'Sd': 'Sd', // Soldado
'Al Sd': 'Al Sd', // Aluno-Soldado
*/
