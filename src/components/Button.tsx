import { h, FunctionComponent } from "preact";
import styled from "styled-components";

const Button = styled.button`
    ${props => props.mode == 'filled' ? `background-color: ${props.color};` : ''}
    border: 1px solid ${props => props.color};
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        box-shadow: 0px 0px 5px ${props => props.color};
    }

    &:active {
        transform: scale(0.95);
    }
`;

const ButtonComponent: FunctionComponent<Props> = (props) => {
    return (
        <Button mode={props.type} color={props.color} onClick={() => props.handleClick()}>
            {props.children}
        </Button>
    );
}

interface Props {
    type: 'filled' | 'outline';
    color: string;
    handleClick: Function;
}

export default ButtonComponent;