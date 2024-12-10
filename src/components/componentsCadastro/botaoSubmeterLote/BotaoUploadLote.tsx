import { Button, ButtonProps } from '@chakra-ui/react';
import { FaFileUpload } from 'react-icons/fa';
interface IButton extends ButtonProps{
  handleClick: () => void;
}
export const BotaoUploadLote: React.FC<IButton> = ({ handleClick }) => {
         return (
           <Button
             type="submit"
             // h={'44px'}
             // bg={'rgba(39, 103, 73, 1)'}
             colorScheme="blue"
             // color={'rgba(255, 255, 255, 1)'}
             // fontSize={'24px'}
             rightIcon={<FaFileUpload />}
             variant="outline"
             onClick={handleClick}
           >
             Adicionar Lote
           </Button>
         );
       };
