import { h, render, ComponentType } from 'preact';
import Button from './components/Button';
import CurrentTime from './components/CurrentTime';
import './style.css';

declare global {
    interface Window {
        components: {
            [key: string]: Function;
        };
    }
}

function renderComponent(selector: string, Comp: ComponentType, props: object, children: any = ''): void {
    render(
        <Comp {...props}>{children}</Comp>,
        document.querySelector(selector)
    );
}

// Eposing the components to the window through wrapper, mirofont-end kind of thing
window.components = {
    button: (selector: string, props: object, children: any) => renderComponent(selector, Button, props, children),
    currentTime: (selector: string) => renderComponent(selector, CurrentTime, {})
};