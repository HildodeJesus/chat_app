import styled from "styled-components/native";

export const Container = styled.View`
	padding: 50px;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	gap: 200px;
`;

export const Text = styled.Text`
	font-size: 26px;
	font-weight: bold;
	color: #6277bc;
`;

export const StartButton = styled.Pressable`
	font-weight: bold;
	width: 100%;
	padding: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #16d173;
	border-radius: 25px;
`;

export const StartButtonText = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: white;
`;
