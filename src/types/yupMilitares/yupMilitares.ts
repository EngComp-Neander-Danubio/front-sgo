import * as yup from 'yup';
export const militarSchema = yup.object().shape({
  'nome_completo': yup.string().required('Campo obrigatório'),
  'opm': yup.string().required('Campo obrigatório'),
  'matricula': yup.string().required('Campo obrigatório'),
  'posto_grad': yup.string().required('Campo obrigatório'),
  'uni_codigo': yup.array().of(yup.number().required('Campo obrigatório')).required('Campo obrigatório'),

});

