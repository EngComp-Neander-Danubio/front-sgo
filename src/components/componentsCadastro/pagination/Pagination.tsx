import { Flex, Button, Text, FlexProps, Select } from '@chakra-ui/react';

interface IPagination extends FlexProps{
  firstDataIndex: number;
  lastDataIndex: number;
  totalPages: number;
  dataPerPage: number;
  loadLess: () => void;
  loadMore: () => void;
}
// all right, it's over here
export const Pagination: React.FC<IPagination> = ({
  totalPages,
  loadLess,
  loadMore,
  firstDataIndex,
  lastDataIndex,
  ...props
}) => {
  return (
    <Flex justify="space-between" mt={-9} align={'center'} {...props}>
      <Text fontSize={'14px'} color={'#666666'} fontWeight={'medium'}>

      {totalPages ? Number(firstDataIndex) + 1 : 0} - {' '}
      {totalPages < lastDataIndex ? totalPages : lastDataIndex} de {' '}
      {totalPages} Itens
      </Text>
      <Select placeholder='' w='60px' color='#A0AEC0'>
        <option value='option1' defaultValue='option1'>1</option>
        <option value='option2'>2</option>
        <option value='option3'>3</option>
        <option value='option4'>4</option>
        <option value='option5'>5</option>
        <option value='option6'>6</option>
        <option value='option7'>7</option>
        <option value='option8'>8</option>
        <option value='option9'>9</option>
        <option value='option10'>10</option>
      </Select>
      <Flex p={0} color="rgba(52, 64, 84, 1)">
        <Button
          mr={2}
          fontSize="12px"
          fontWeight="none"
          bg="none"
          border="1px solid"
          borderColor="rgba(208, 213, 221, 1)"
          borderRadius="8px"
          color="#344054"
          onClick={loadLess}
          disabled={firstDataIndex <= 1} // Desabilita se estiver na primeira página
        >
          Anterior
        </Button>
        <Button
          ml={2}
          fontSize="12px"
          fontWeight="none"
          bg="none"
          border="1px solid"
          borderColor="rgba(208, 213, 221, 1)"
          color="rgba(52, 64, 84, 1)"
          borderRadius="8px"
          onClick={loadMore}
          disabled={lastDataIndex >= totalPages} // Desabilita se estiver na última página
        >
          Próximo
        </Button>
      </Flex>
    </Flex>
  );
};
