export type OptionType = { label: string; value: string };

export enum Modalidade {
  "A PÉ" = '1',
  Viatura = '2',
  Moto = '3',
  Montado = '4',
  "Prontidão" = '5',
}
export const optionsModalidade: OptionType[] = [
  { label: 'A pé', value: '1' },
  { label: 'Viatura', value: '2' },
  { label: 'Moto', value: '3' },
  { label: 'Montado', value: '4' },
  { label: 'Prontidão', value: '5' },
];
