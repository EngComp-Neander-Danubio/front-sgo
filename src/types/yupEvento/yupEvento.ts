import * as yup from 'yup';
export const eventoSchema = yup.object().shape({
  "nomeOperacao": yup.string().required('Campo obrigatório'),
  "comandante": yup.number().required('Campo obrigatório'),
  "dataInicio": yup.date().required('Campo obrigatório'),
  "dataFinal": yup.date().required('Campo obrigatório'),
});

