import React from 'react';
import ReactForm from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';
import Checkbox from 'react-bootstrap/lib/Checkbox';

class Form extends React.Component {

    renderFormControl(controlProps) {
        const { type, children, ...otherProps } = controlProps;
        if (type === 'radio') {
            return <Radio {...otherProps}>{children}</Radio>;
        }
        if (type === 'checkbox') {
            return <Checkbox {...otherProps}>{children}</Checkbox>;
        }
        return <FormControl {...controlProps}>{children}</FormControl>;
    }

    renderFormGroups() {
        return this.props.controls.map((c, index) => {
            const { name, label, help, ...controlProps } = c;
            return (
                <FormGroup controlId={name || index}>
                    {label && (<ControlLabel>{label}</ControlLabel>)}
                    {this.renderFormControl(controlProps)}
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
        });
    }

    render() {
        return (
            <ReactForm inline={this.props.inline}>
                {this.renderFormGroups()}
            </ReactForm>
        );
    }
}

Form.propTypes = {
    controls: React.PropTypes.array,
};
Form.defaultProps = {
    controls: [],
};

export default Form;
