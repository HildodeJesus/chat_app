import * as S from "./styles";
import Logo from "../../components/Logo";
import { useState } from "react";
import usePhoneNumber from "../../hooks/usePhoneNumber";

export default function Login() {
	const [currentNumber, setCurrentNumber] = useState("");
	const { formatPhoneNumber } = usePhoneNumber();

	const handledInput = (text: string) => {
		const formatedNumber = formatPhoneNumber(text);

		setCurrentNumber(formatedNumber);
	};

	return (
		<S.Container>
			<Logo size={70} />
			<S.WelcomeText>Bem-vindo(a) ao whatsapp</S.WelcomeText>
			<S.InfoText color="#62778c">
				Informe seu número de celular com ddd para enviarmos o seu código de
				confirmação
			</S.InfoText>
			<S.Input
				onChangeText={handledInput}
				value={currentNumber}
				keyboardType="numeric"
				placeholder="(**) 9****-****"
			/>
			<S.InfoText>
				Assim que continuar, você concorda com a{" "}
				<S.StrongText>Politica de Privacidade</S.StrongText> e{" "}
				<S.StrongText>Termos</S.StrongText> da nossa comunidade.
			</S.InfoText>

			<S.ButtonSubmit>
				<S.ButtonSubmitText>Continue</S.ButtonSubmitText>
			</S.ButtonSubmit>
		</S.Container>
	);
}
