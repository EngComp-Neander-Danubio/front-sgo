import { InputProps } from '@chakra-ui/react';
import { useState } from 'react';
import pdfToText from 'react-pdftotext';
import { BotaoUploadLote } from '../botaoSubmeterLote/BotaoUploadLote';

interface IInputFile extends InputProps {
  handleFileChange?: () => void;
  handleClick?: () => void;
}
export const InputFile: React.FC<IInputFile> = () => {
  const [text, setText] = useState('');

  function extractText(event: any) {
    const file = event.target.files[0];
    pdfToText(file)
      .then(text => setText(text))
      .catch(error => console.error('Failed to extract text from pdf'));
      console.log(text);
  }
  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };
  return (
    <>
      <input
        type="file"
        accept="application/pdf"
        id="fileInput"
        onChange={extractText}
        style={{ display: 'none' }}
      />
      <BotaoUploadLote handleClick={handleClick}  />
    </>
  );
};
