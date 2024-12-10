import { IoPerson } from 'react-icons/io5';
import React from 'react';
import { IconProps, useDisclosure } from '@chakra-ui/react';

interface IIconLogin extends IconProps {
  onOpen?: () => void;
}

export const IconeLogin: React.FC<IIconLogin> = ({ onOpen }) => {
  return (
    <>
      <IoPerson color="#A0AEC0" size={'24px'} />
    </>
  );
};
