import { useNavigation } from "@react-navigation/native";

import * as S from "./styles";
import Logo from "../../components/Logo";
import { Button } from "../../components/Button";

export default function ValidateCode() {
	const navigation = useNavigation<any>();

	return (
		<S.Container>
			<Logo size={70} />
			<S.Text>
				Simple. Secure.{"\n"}
				Reliable messaging
			</S.Text>

			<Button text="Vamos começar" textColor="white" bgColor="#16d173" onPress={() => navigation.navigate("Login")} />
		</S.Container>
	);
}
