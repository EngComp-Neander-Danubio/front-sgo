export type OptionType = { label: string; value: string };

export enum Modaliade {
  "A PÉ" = '1',
  Viatura = '2',
  Moto = '3',
  Montado = '4',
  "Prontidão" = '5',
}
export type DataPostos = {
  id?: string;
  local: string;
  endereco: string;
  numero: number;
  bairro: string;
  cidade: string;
  modalidade: string;
  qtd_efetivo?: number;
  militares_por_posto?: number;
};
