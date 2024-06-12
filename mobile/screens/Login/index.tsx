import { NavigationProp } from "@react-navigation/native";

import * as S from "./styles";
import Logo from "../../components/Logo";
import { useState } from "react";
import WrapperInputs from "../../components/WrapperInputs";
import Input from "../../components/Input";
import Label from "../../components/Label";
import { Button } from "../../components/Button";

type LoginProps = {
	navigation: NavigationProp<any>;
}

export default function Login({navigation}: LoginProps) {
	const [currentEmail, setCurrentEmail] = useState<string | undefined>("")
	const [currentPassword, setCurrentPassword] = useState<string | undefined>("")


	return (
		<S.Container>
			<Logo size={70} />
			<S.WelcomeText>Bem-vindo(a) ao What-Is</S.WelcomeText>
			<WrapperInputs>
				<Label position="start" size={16} marginBottom={10} text="Email"/>
				<Input placeholder="example@provedor.com" value={currentEmail} onChangeText={(e) => setCurrentEmail(e)} keyboardType="email-address"/>
				<Label position="start" size={16} marginBottom={10} text="Senha"/>
				<Input placeholder="******" value={currentPassword} onChangeText={(e) => setCurrentPassword(e)} keyboardType="visible-password"/>
			</WrapperInputs>

			<Button bgColor="#16d173" text="Entrar" textColor="white" />

			<Label text="ou" size={20} position="center" marginTop={15}/>

			<Button onPress={() => navigation.navigate("Register")} bgColor="#16b5d1" text="Cadastrar" textColor="white"/>
		</S.Container>
	);
}
