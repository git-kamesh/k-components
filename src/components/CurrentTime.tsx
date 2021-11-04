import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import styled from "styled-components";

const Time = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    background-color: #000;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
`;

const CurrentTime: FunctionComponent = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <Time>{currentTime}</Time>;
}

export default CurrentTime;