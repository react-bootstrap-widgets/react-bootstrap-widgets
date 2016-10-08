import React from 'react';
import ToolbarButton from './ToolbarButton';

class Toolbar extends React.Component {
    render() {
        return (
            <div style={{ marginBottom: 15 }} className="clearfix">
                {
                    this.props.buttons.map(
                        (button, index) => <ToolbarButton key={index} {...button} />
                    )
                }
                {this.props.children}
            </div>
        );
    }
}

Toolbar.propTypes = {
    buttons: React.PropTypes.arrayOf(React.PropTypes.object),
};
Toolbar.defaultProps = {
    buttons: [],
};

export default Toolbar;
