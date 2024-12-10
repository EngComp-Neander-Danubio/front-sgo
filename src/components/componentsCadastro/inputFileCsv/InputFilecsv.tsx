import React, { useState } from 'react';
import { BotaoUploadLote } from '../botaoSubmeterLote/BotaoUploadLote';
import { TableFicha } from '../../componentesFicha/table';

type Data = {
  Zona: string;
  'Cod. Município': string;
  Município: string;
  'Cod. Local': string;
  'Local de Votação': string;
  Endereço: string;
  Bairro: string;
  CEP: string;
  'Qtd. Seções Principais': string;
  'Qtd. Seções Principais+Agregadas': string;
  'Total Eleitores Aptos Eleição Federal': string;
};

export const InputFilecsv: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [array, setArray] = useState<Data[]>([]);

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const csvFileToArray = (csvString: string) => {
    const csvHeader = csvString.slice(0, csvString.indexOf('\n')).split(';');
    const csvRows = csvString.slice(csvString.indexOf('\n') + 1).split('\n');

    const parsedArray = csvRows.map(row => {
      const values = row.split(';');
      const obj: any = csvHeader.reduce((object, header, index) => {
        object[header.trim()] = values[index]?.trim();
        return object;
      }, {});
      return obj;
    });

    setArray(parsedArray);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          csvFileToArray(text);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1'); // Usando encoding para suportar acentos
    }
  };

  const headerKeys = array.length > 0 ? Object.keys(array[0]) : [];

  return (
    <>
      <input
        type="file"
        accept=".csv"
        id="fileInput"
        onChange={handleOnChange}
        style={{ display: 'none' }}
      />
      <BotaoUploadLote handleClick={handleClick} />
      <button onClick={handleOnSubmit}>Submit</button>
      <TableFicha
        isOpen={array.length > 0}
        columns={headerKeys}
        registers={array}
      />
    </>
  );
};
