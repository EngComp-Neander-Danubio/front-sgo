import { Flex, Image } from '@chakra-ui/react';
import LogoCetic from '../../assets/img/logo-cetic.png';

export function Footer() {
  return (
    <Flex align="center" direction="column">
      <Image src={LogoCetic} w={{ base: '56px', sm: '62px' }} alt="CETIC" />
    </Flex>
  );
}
