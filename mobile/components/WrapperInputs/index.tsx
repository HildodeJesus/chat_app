import * as S from "./styles";
import { ReactElement, useState } from "react";

type WrapperInputsProps = {
    children: ReactElement[];
    positionInput?: "start" | "center" | "end"
};

export default function WrapperInputs(props: WrapperInputsProps) {

	return (
        <S.WrapperInputs positionOfInputs={props.positionInput}>
			{props.children}
		</S.WrapperInputs>
	);
}
