import styled from "styled-components/native";

export const Container = styled.View`
	height: 100%;
	width: 100%;
	justify-content: center;
	padding: 50px;
	align-items: center;
`;

export const WelcomeText = styled.Text`
	color: black;
	font-size: 20px;
	font-weight: bold;
	margin-top: 80px;
	margin-bottom: 20px;
	width: 100%;
`;

export const InfoText = styled.Text<{ color?: string }>`
	color: ${props => (props.color ? props.color : "#62778c90")};
	font-size: 16px;
	text-align: justify;
	width: 100%;
`;

export const Input = styled.TextInput`
	padding: 10px 15px;
	border: 1px solid black;
	border-radius: 15px;
	margin-top: 30px;
	margin-bottom: 30px;
	width: 100%;
`;

export const StrongText = styled.Text`
	color: #62778c;
	font-size: 16px;
	text-align: justify;
	font-weight: bold;
`;

export const ButtonSubmit = styled.Pressable`
	font-weight: bold;
	width: 100%;
	padding: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #16d173;
	border-radius: 25px;
	margin-top: 150px;
`;

export const ButtonSubmitText = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: white;
`;
