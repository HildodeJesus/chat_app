import styled from "styled-components/native";

export const WrapperInputs = styled.View<{positionOfInputs: string | undefined}>`
	align-items: ${props => props.positionOfInputs ? props.positionOfInputs : "start"};
	width: 100%;
    padding: 10px 0;
`