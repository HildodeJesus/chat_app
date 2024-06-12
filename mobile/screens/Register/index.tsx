import * as S from "./styles";
import Logo from "../../components/Logo";
import { useEffect, useState } from "react";
import WrapperInputs from "../../components/WrapperInputs";
import Input from "../../components/Input";
import Label from "../../components/Label";
import { Button } from "../../components/Button";


export default function Register() {
	const [currentName, setCurrentName] = useState<string | undefined>("")
	const [currentEmail, setCurrentEmail] = useState<string | undefined>("")
	const [currentPassword, setCurrentPassword] = useState<string | undefined>("")

	return (
		<S.Container>
			<Logo size={70} />
			<S.WelcomeText>Bem-vindo(a) ao What-Is</S.WelcomeText>
			<WrapperInputs>
				<Label position="start" size={16} marginBottom={10} text="Seu nome"/>
				<Input placeholder="example" value={currentName} onChangeText={e => setCurrentName(e)} keyboardType="default"/>
				<Label position="start" size={16} marginBottom={10} text="Seu melhor email"/>
				<Input placeholder="example@provedor.com" value={currentEmail} onChangeText={e => setCurrentEmail(e)} keyboardType="email-address"/>
				<Label position="start" size={16} marginBottom={10} text="Crie uma senha"/>
				<Input placeholder="******" value={currentPassword} onChangeText={e => setCurrentPassword(e)} keyboardType="visible-password"/>
			</WrapperInputs>
			<S.InfoText>
				Assim que continuar, você concorda com a{" "}
				<S.StrongText>Politica de Privacidade</S.StrongText> e{" "}
				<S.StrongText>Termos</S.StrongText> da nossa comunidade.
			</S.InfoText>

			<Button bgColor="#16d173" text="Cadastrar" textColor="white" />

		</S.Container>
	);
}
