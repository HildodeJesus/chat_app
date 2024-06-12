import * as S from "./styles";
import { TextInputProps } from "react-native";

type LoginProps = TextInputProps;

export default function Input(props: LoginProps) {
	return (
        <S.Input {...props} />
	);
}
