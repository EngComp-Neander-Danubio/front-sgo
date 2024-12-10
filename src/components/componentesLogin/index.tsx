import { Flex, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { ButtonEnter } from "./components/button";
import { Link, useNavigate } from "react-router-dom"; // Importando useNavigate
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useForm, Controller } from "react-hook-form";

interface IFormInputs {
    matricula: string;
    senha: string;
}

export const ViewLogin = () => {
    const navigate = useNavigate(); // Inicializando o hook useNavigate
    // const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const auth = useAuth();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<IFormInputs>({
        defaultValues: {
            matricula: "",
            senha: ""
        }
    });
    const onSubmit = async (data: IFormInputs) => {
        const { matricula, senha } = data;
        try {
            //setIsLoading(true);
            await auth.authenticate(matricula, senha);
            navigate("/servico");
            toast({
                title: "Sucesso!",
                description: "Login realizado com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
            reset(); // Reset the form after successful submission
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("error:", error);
            toast({
                title: "Erro ao fazer login.",
                description: error.response
                    ? error.response.data.message
                    : "Verifique suas credenciais e tente novamente.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
        } finally {
            //setIsLoading(false);
        }
    };

    return (
        <Flex
            borderRadius="20px"
            bg="rgba(255, 255, 255, 1)"
            flexDirection="column"
            justify="center"
            w={{ xl: "423px", lg: "423px", md: "423px", sm: "380px" }}
            h={{ xl: "407px", lg: "500px", md: "500px", sm: "500px" }}
        >
            <Flex align="center" justify="center" flexDirection="column" p={4} gap={2}>
                <FormLabel fontWeight={"bold"} alignSelf={"flex-start"}>
                    Matrícula
                </FormLabel>
                <Controller
                    name="matricula"
                    control={control}
                    /*  rules={{
              required: "Email é obrigatório!",
              validate: (value) => isEmailValid(value) || "Email inválido!",
            }} */
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="email"
                            aria-invalid={errors.matricula ? "true" : "false"}
                            placeholder="Informe sua matrícula"
                        />
                    )}
                />
                {errors.matricula && (
                    <p role="alert" style={{ color: "red", fontSize: "12px" }}>
                        {errors.matricula.message}
                    </p>
                )}
                <FormLabel fontWeight={"bold"} alignSelf={"flex-start"}>
                    Senha
                </FormLabel>
                <Controller
                    name="senha"
                    control={control}
                    /*  rules={{
              required: "Email é obrigatório!",
              validate: (value) => isEmailValid(value) || "Email inválido!",
            }} */
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="password"
                            aria-invalid={errors.senha ? "true" : "false"}
                            placeholder="Informe sua senha"
                        />
                    )}
                />
                {errors.senha && (
                    <p role="alert" style={{ color: "red", fontSize: "12px" }}>
                        {errors.senha.message}
                    </p>
                )}
            </Flex>

            <Flex align="center" justify="center"></Flex>

            <Flex gap={6} flexDirection="column" justifyContent="space-between">
                <Flex pl={5}>
                    <Link to="#">
                        <Text color="rgba(49, 130, 206, 1)">
                            Recuperar senha
                        </Text>
                    </Link>
                </Flex>

                <Flex align="center" justify="center">
                    <ButtonEnter
                        handleSubmit={handleSubmit(onSubmit)}
                        type="submit"
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};
