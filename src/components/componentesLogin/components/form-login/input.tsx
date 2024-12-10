import {
  InputGroup,
  InputRightElement,
  Input as InputBase,
  FormLabel,
  Stack,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { EyeSlash, Eye } from '@phosphor-icons/react'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface InputProps {
  name: string
  type: 'text' | 'password'
  placeholder: string
  label?: string
  onChange: Dispatch<SetStateAction<string>>
  isRequired?: boolean
}

export function Input({
  name,
  type,
  placeholder,
  label,
  onChange,
  isRequired = false,
  ...rest
}: InputProps) {
  const [value, setValue] = useState('')
  const [isError, setIsError] = useState(false)
  const [isTextVisible, setIstextVisible] = useState(type === 'text')

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsError(false)
    setValue(event.target.value)
    onChange(event.target.value)
  }

  function handleInputBlur() {
    setIsError(!value)
  }
  return (
    <Stack spacing={0}>
      <FormControl isInvalid={isError}>
        {!!label && (
          <FormLabel htmlFor={name} color="gray.700" fontSize="sm">
            {label}
          </FormLabel>
        )}
        <InputGroup>
          <InputBase
            onSubmit={handleInputBlur}
            id={name}
            type={isTextVisible || type === 'text' ? 'text' : 'password'}
            placeholder={placeholder}
            color="gray.400"
            _placeholder={{ color: 'gray.400', fontSize: 'md' }}
            _focusVisible={{ border: '2px', borderColor: 'green.700' }}
            required={isRequired}
            onChange={(e) => handleInputChange(e)}
            onBlur={handleInputBlur}
            {...rest}
          />
          {type === 'password' && (
            <InputRightElement
              mr={2}
              onClick={() => setIstextVisible(!isTextVisible)}
            >
              {isTextVisible ? (
                <EyeSlash size={24} color="#A0AEC0" />
              ) : (
                <Eye size={24} color="#A0AEC0" />
              )}
            </InputRightElement>
          )}
        </InputGroup>
        {isError && isRequired && (
          <FormErrorMessage>Campo obrigatório</FormErrorMessage>
        )}
      </FormControl>
    </Stack>
  )
}
