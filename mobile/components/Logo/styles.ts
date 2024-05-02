import styled from "styled-components/native";

export const LogoContainer = styled.View`
	font-size: 24px;
	font-weight: bold;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
`;

export const LogoImage = styled.Image<{ size?: number }>`
	height: ${props => (props.size ? `${props.size}px` : "50px")};
	width: ${props => (props.size ? `${props.size}px` : "50px")};
`;

export const LogoText = styled.Text<{ size?: number }>`
	font-size: ${props => (props.size ? `${props.size}px` : "20px")};
	font-weight: bold;
	color: black;
`;
