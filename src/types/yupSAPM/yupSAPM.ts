import * as yup from 'yup';

export const sapmSchema = yup.object().shape({
  checkboxespecializadas: yup
    .boolean()
    .required('Selecione pelo menos uma opção de especializadas.')
    .oneOf([true], 'Selecione pelo menos uma opção de especializadas.'),
  checkboxdgpi: yup
    .boolean()
    .required('Selecione pelo menos uma opção de Setores Administrativos.')
    .oneOf([true], 'Selecione pelo menos uma opção de Setores Administrativos.'),
  checkbox1crpm: yup
    .boolean()
    .required('Selecione pelo menos uma opção do 1° CRPM.')
    .oneOf([true], 'Selecione pelo menos uma opção do 1° CRPM.'),
  checkbox2crpm: yup
    .boolean()
    .required('Selecione pelo menos uma opção do 2° CRPM.')
    .oneOf([true], 'Selecione pelo menos uma opção do 2° CRPM.'),
  checkbox3crpm: yup
    .boolean()
    .required('Selecione pelo menos uma opção do 3° CRPM.')
    .oneOf([true], 'Selecione pelo menos uma opção do 3° CRPM.'),
  checkbox4crpm: yup
    .boolean()
    .required('Selecione pelo menos uma opção do 4° CRPM.')
    .oneOf([true], 'Selecione pelo menos uma opção do 4° CRPM.'),
  checkboxcpchoque: yup
    .boolean()
    .required('Selecione pelo menos uma opção do CPCHOQUE.')
    .oneOf([true], 'Selecione pelo menos uma opção do CPCHOQUE.'),
  checkboxcpraio: yup
    .boolean()
    .required('Selecione pelo menos uma opção do CPRAIO.')
    .oneOf([true], 'Selecione pelo menos uma opção do CPRAIO.'),
  checkboxcpe: yup
    .boolean()
    .required('Selecione pelo menos uma opção do CPE.')
    .oneOf([true], 'Selecione pelo menos uma opção do CPE.'),
  select_opm: yup
    .object()
    .nullable()
    .required('Selecione uma OPM.')
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    }),
});

