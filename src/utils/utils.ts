export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
export const normalizeDate = (date: string) => {
  // Substitui "DD-MM-YYYY" por "YYYY-MM-DD"
  const parts = date.split('-');
  if (parts.length === 3) {
    // Criar a data considerando o fuso horário local
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10) - 1; // Meses começam em 0
    const day = parseInt(parts[0], 10);

    return new Date(year, month, day);
  }
  return null;
};
