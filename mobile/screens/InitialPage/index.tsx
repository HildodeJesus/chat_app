import { useNavigation } from "@react-navigation/native";

import * as S from "./styles";
import Logo from "../../components/Logo";

export default function InitialPage() {
	const navigation = useNavigation<any>();

	return (
		<S.Container>
			<Logo size={70} />
			<S.Text>
				Simple. Secure.{"\n"}
				Reliable messaging
			</S.Text>
			<S.StartButton onPress={() => navigation.navigate("Login")}>
				<S.StartButtonText>Vamos Começar</S.StartButtonText>
			</S.StartButton>
		</S.Container>
	);
}
