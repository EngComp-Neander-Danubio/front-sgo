import { Td, Flex, Text, HStack, TableProps } from "@chakra-ui/react";
import React from "react";

interface ITdTable extends TableProps {
  text?: string | number;
  customIcons?: React.ReactNode[];
}

export const TdTable: React.FC<ITdTable> = (props) => {
  const { text, customIcons } = props;

  return (
    <Td
    //border="1px solid green"
    p={1} textAlign="center">
      <Flex
        align="center"
        justify="center"
        fontWeight={400}
        color="rgba(102, 112, 133, 1)"
        fontSize={12}
        lineHeight="18px"
        letterSpacing="0em"
        w="auto"

        //border="1px solid red"
      >
        {text && <Text textTransform="capitalize">{text}</Text>}
        {customIcons && customIcons.length > 0 && (
          <Flex ml={text ? "4px" : 0}>
            <HStack spacing={1}>
              {customIcons.map((icon, index) => (
                <React.Fragment key={index}>{icon}</React.Fragment>
              ))}
            </HStack>
          </Flex>
        )}
      </Flex>
    </Td>
  );
};
