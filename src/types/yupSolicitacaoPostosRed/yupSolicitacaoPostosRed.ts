import * as yup from 'yup';
export const solicitacaoPostosSchemaRed = yup.object().shape({
  dataInicio: yup.date().required('Campo obrigatório'),
  dataFinal: yup.date().required('Campo obrigatório'),
  uni_codigo: yup.array().of(yup.number().required('Campo obrigatório')).required('Campo obrigatório'),
});
