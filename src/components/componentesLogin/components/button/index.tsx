import { Button, ButtonProps } from "@chakra-ui/react";
interface IButton extends ButtonProps {
    handleSubmit: () => void;
}
export const ButtonEnter: React.FC<IButton> = ({ handleSubmit }: IButton) => {
    return (
        <Button
            w={{ xl: "383px", lg: "383px", md: "383px", sm: "350px" }}
            h={"44px"}
            bg={"rgba(39, 103, 73, 1)"}
            color={"rgba(255, 255, 255, 1)"}
            fontSize={"24px"}
            onClick={handleSubmit}
        >
            Entrar
        </Button>
    );
};
