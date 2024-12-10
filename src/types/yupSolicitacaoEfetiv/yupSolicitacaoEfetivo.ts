import * as yup from 'yup';

const solicitacaoEfetivoSchema = yup.object().shape({
  data_inicio: yup.date().required('Campo obrigatório'),
  data_final: yup.date().required('Campo obrigatório'),
  uni_codigo: yup.array().of(yup.number().optional()).required('Campo obrigatório'),
  efetivo: yup.array().of(yup.number().optional()).required('Campo obrigatório'),
  totalEfetivo: yup.number().optional(),
  operacao_id: yup.string().optional(),
});
export default solicitacaoEfetivoSchema;
