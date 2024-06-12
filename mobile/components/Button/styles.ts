import styled from "styled-components/native";

export const ButtonSubmit = styled.Pressable<{bgColor: string;}>`
	font-weight: bold;
	width: 100%;
	padding: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.bgColor};
	border-radius: 25px;
	margin-top: 30px;
`;

export const ButtonSubmitText = styled.Text<{textColor: string;}>`
	font-size: 18px;
	font-weight: bold;
	color: ${props => props.textColor};
`;
