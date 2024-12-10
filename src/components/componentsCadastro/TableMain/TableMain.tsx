import {
  Center,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';

export interface ColumnProps<T> {
  key: string;
  title: string | ReactElement;
  render?: (column: ColumnProps<T>, item: T, index?: number) => ReactElement;
}

type Props<T> = {
  columns: Array<ColumnProps<T>>;
  data?: T[];
};

const TableMain = <T,>({ data, columns }: Props<T>) => {
  const headers = columns.map((column, index) => {
    return (
      <Th key={`headCell-${index}`}>
        <Flex gap={2} flexDirection={'row'} align={'center'} justify={'center'}>
          {column.title}
          {column.title !== 'Ações' ? <AiOutlineArrowDown /> : null}
        </Flex>
      </Th>
    );
  });

  const rows = !data?.length ? (
    <Tr>{null}</Tr>
  ) : (
    data?.map((row, index) => {
      return (
        <Tr key={`row-${index}`}>
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string);

            return (
              <Td key={`cell-${index2}`}>
                <Center
                  fontWeight={400}
                  color="rgba(102, 112, 133, 1)"
                  fontSize={'1rem'}
                  lineHeight="18px"
                  letterSpacing="0em"
                  h={'10px'}
                >
                  {value}
                </Center>
              </Td>
            );
          })}
        </Tr>
      );
    })
  );

  return (
    <>
      <Flex
        //overflowY={'auto'}
        //border={'1px solid red'}
        w="100%"
      >
        <TableContainer
          //pt={2}
          w="100%"
          transitionDuration="1.0s"
          //h={headers.length > 0 ? `30vh` : 'fit-content'}
          h={'fit-content'}
          //minH={'30vh'}
          //overflowY={'auto'}
          mb={10}
          border={'1px solid rgb(160, 174, 192)'}
          borderRadius={'8px'}
        >
          <Table variant="simple" fontSize={'14px'}>
            <Thead
            //border={'1px solid red'}
            //bgColor={'rgba(0, 0, 0, 0.32)'}
            >
              <Tr
                borderTop="1px solid rgba(234, 236, 240, 1)"
                borderBottom="1px solid rgba(234, 236, 240, 1)"
                bg="rgba(252, 252, 253, 1)"
              >
                {headers}
              </Tr>
            </Thead>
            <Tbody>{rows}</Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default TableMain;
