import * as S from "./styles";

type LabelProps = {
  size?: number;
  position?: "start" | 'center' | "end";
  text: string;
  marginBottom?: number;
  marginTop?: number;
};

export default function Label(props: LabelProps) {

	return (
    <S.Label marginBottom={props.marginBottom ? props.marginBottom : 0} marginTop={props.marginTop ? props.marginTop : 0} position={props.position ? props.position: "start"} fontSize={props.size? props.size: 16}>{props.text}</S.Label>
	);
}
