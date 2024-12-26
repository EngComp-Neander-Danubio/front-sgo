import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FlexboxProps,
} from '@chakra-ui/react';
import { FormPosto } from '../formPosto/FormPosto';
import { FormProvider, useForm } from 'react-hook-form';
import { PostoForm } from '../../../context/postosContext/PostosContex';
import { postosSchema } from '../../../types/yupPostos/yupPostos';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { usePostos } from '../../../context/postosContext/usePostos';
import { optionsModalidade } from '../../../types/typesModalidade';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { da } from 'date-fns/locale';
import { FormPostoEditing } from '../formPosto/FormPostoEditing';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  uploadPosto: (data: PostoForm, operacao_id: string, id?: number ) => void;
  isEditing: boolean;
}

export const ModalFormAddPosto: React.FC<IModal> = ({
  isOpen,
  onClose,
  uploadPosto,
  isEditing,
}) => {
  const methodsInput = useForm<PostoForm>({
    resolver: yupResolver(postosSchema),
  });
  const { reset, setValue } = methodsInput;
  const {postoById} = usePostos();
  const { OperacaoById } = useOperacao();
  const onSubmit = async (data: PostoForm) => {
    console.log('postos', data)
    if(postoById?.id && OperacaoById?.id && isEditing){
      uploadPosto(data, OperacaoById?.id, Number(postoById.id));
    }
      else if(OperacaoById?.id){
        uploadPosto(data, OperacaoById.id)
    }
    onClose();
    reset();
  };

  useEffect(() => {
    console.log(postoById)
    if (postoById && isEditing) {
      setValue('id', postoById.id);
      setValue('local', postoById?.local);
      setValue('endereco', postoById?.endereco);
      setValue('bairro', postoById?.bairro);
      setValue('numero', postoById?.numero);
      setValue('cidade', postoById?.cidade);
      setValue('militares_por_posto', Number(postoById?.militares_por_posto));
      const modalidade = optionsModalidade.find(m => m.label.includes(postoById.modalidade));
      if (modalidade) {
        setValue('modalidade', modalidade.value);
      }
    }
  }, [postoById, isEditing, optionsModalidade, setValue]); // Dependency array

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <FormProvider {...methodsInput}>
            <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
              <ModalHeader color={'rgba(0, 0, 0, 0.48)'}
            fontWeight={'700'}>Adicionar Posto de Serviço</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {!isEditing ? (
                    <FormPosto/>
                  ) : (<FormPostoEditing isEditing />)}
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="ghost"
                  bgColor=" #38A169"
                  _hover={{
                    bgColor: 'green',
                    cursor: 'pointer',
                    transition: '.5s',
                  }}
                  color={'#fff'}
                  onClick={() => reset}
                  type="submit"
                >
                  {!isEditing ? `Salvar` : `Editar`}
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
};
