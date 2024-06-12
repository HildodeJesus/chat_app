import * as S from "./styles"

type ButtonProps = {
    bgColor: string;
    textColor: string;
    text: string;
    onPress?: () => void;
}

export function Button({bgColor, onPress, textColor, text} :ButtonProps) {
    return (
        <S.ButtonSubmit bgColor={bgColor} onPress={onPress}>
            <S.ButtonSubmitText textColor={textColor}>{text}</S.ButtonSubmitText>
        </S.ButtonSubmit>
    )
}