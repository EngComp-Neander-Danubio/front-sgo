import * as yup from 'yup';
export const requisitosSchema = yup.object().shape({
  quantity_militars: yup.number().required('Campo obrigatório').min(1, 'No minimo um policial'),
  quantity_turnos: yup.number().required('Campo obrigatório').min(1, 'No minimo um turno'),
  aleatoriedade: yup.boolean().required('Campo obrigatório').nonNullable(),
  antiguidade: yup.array().when('aleatoriedade', {
      is: (val: boolean) => !val,
      then:()=> yup.array().of(
        yup.string().required('Campo obrigatório')
      ).required().min(1, 'no minimo 1'),
      otherwise:()=> yup.array().of(
        yup.string().required('Campo obrigatório')
    ).notRequired(),
    }),
  //modalidade: yup.string().nonNullable().required('Campo obrigatório'),
  dateFirst: yup.date().required('Campo obrigatório'),
  dateFinish: yup.date().required('Campo obrigatório'),
  turnos: yup.array().of(
    yup.object().shape({
      initial: yup.date().required('Campo obrigatório'),
      finished: yup.date().required('Campo obrigatório'),
    })
  ).required('Campo obrigatório'),
});

