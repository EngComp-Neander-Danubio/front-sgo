export type OptionType = { label: string; value: string | number };

export enum Modalidade {
  "A PÉ" = '1',
  Viatura = '2',
  Moto = '3',
  Montado = '4',
  "Prontidão" = '5',
}
export const optionsModalidade: OptionType[] = [
  { label: 'A PÉ', value: '1' },
  { label: 'VIATURA', value: '2' },
  { label: 'MOTO', value: '3' },
  { label: 'MONTADO', value: '4' },
  { label: 'PRONTIDÃO', value: '5' },
];
