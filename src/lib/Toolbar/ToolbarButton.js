import React from 'react';
import className from 'class-name';

class ToolbarButton extends React.Component {
    render() {
        let clsName = className(
            'btn', 'mr-15', { btn: [this.props.style, this.props.size] }
        );
        return (
            <button className={clsName} onClick={this.props.handler}>
                <i
                    className={className('fa', { fa: [this.props.icon] })}
                /> {this.props.text}
            </button>
        );
    }
}

ToolbarButton.propTypes = {
    size: React.PropTypes.oneOf(['normal', 'sm', 'lg']),
    style: React.PropTypes.oneOf(['danger', 'default', 'primary', 'warning', 'info']),
    text: React.PropTypes.string,
    icon: React.PropTypes.string,
    handler: React.PropTypes.func,
};

ToolbarButton.defaultProps = {
    size: 'sm',
    style: 'default',
    handler: () => {},
};

export default ToolbarButton;
