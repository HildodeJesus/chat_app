import styled from "styled-components/native";

export const Label = styled.Text<{marginBottom:number,position: string; fontSize: number; marginTop: number;}>`
	font-weight: bold;
	margin-bottom: 10px;
    text-align: ${props => props.position};
    font-size: ${props => props.fontSize + "px"};
    width: 100%;
    margin-bottom: ${props => props.marginBottom + "px"};
    margin-top: ${props => props.marginTop + "px"};
`