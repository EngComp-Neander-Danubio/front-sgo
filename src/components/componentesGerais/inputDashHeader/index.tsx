import {
  InputGroup,
  InputRightElement,
  Input,
  Flex,
  InputProps,
} from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';
interface IInput extends InputProps {}

export const InputDashHeader: React.FC<IInput> = props => {
  return (
    <Flex
      alignItems="center" // Use alignItems para alinhamento vertical
      textAlign="center"
      justify="right"
      h={'100%'}
      ml={'auto'}
      //border={'1px solid red'}
      boxSize={'fit-content'}
      {...props}
    >
      {/* <IconeFiltro /> */}
      <InputGroup w={'70%'}>
        <Input
          ml={1}
          mr={2}
          type="search"
          //placeholder='search'
          h="31px"
          //border={'1px solid black'}
        />
        <InputRightElement pointerEvents="none" h={'31px'}>
          <Flex alignItems={'center'} h={'100%'}>
            <IoIosSearch color="#A0AEC0" size={'20px'} />
          </Flex>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
