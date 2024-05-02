import * as S from "./styles";

type LogoProps = {
	size: number;
};

export default function Logo({ size }: LogoProps) {
	return (
		<S.LogoContainer>
			<S.LogoImage
				size={size}
				source={require("../../assets/whatsapp-icon.png")}
			/>
			<S.LogoText size={(40 / 100) * size}>Whatsapp</S.LogoText>
		</S.LogoContainer>
	);
}
