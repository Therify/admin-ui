import { Meta, Story } from '@storybook/react/types-6-0';
import { Modal as ModalUi, ModalProps } from './Modal';

export const Modal: Story<ModalProps> = (args: ModalProps) => {
    // const [isOpene] = useState(false)
    return <ModalUi isOpen={true} handleClose={() => {}} title={args.title}></ModalUi>;
};

export default {
    title: 'Core/Modal',
    argTypes: {
        title: { control: 'text' },
    },
} as Meta;

Modal.args = {
    title: "I'm a modal!",
};
