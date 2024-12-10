import * as yup from 'yup';
export const inputSchema = yup.object().shape({
  title_event: yup.string().required('Campo obrigatório'),
  cmt: yup.string().required('Campo obrigatório'),
  dateOfBegin: yup.date().required('Campo obrigatório'),
  dateOfFinish: yup.date().required('Campo obrigatório'),
});

