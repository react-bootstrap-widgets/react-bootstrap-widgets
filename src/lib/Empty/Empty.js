import React from 'react';

class Empty extends React.PureComponent {

    getPanelEmpty() {
        return (
            <div className="panel panel-default">
                <div
                    className="panel-body"
                    style={{ lineHeight: '45px', textAlign: this.props.textAlign }}
                >{this.props.text}</div>
            </div>
        );
    }

    getTableEmpty() {
        return (
            <tbody>
                <tr>
                    <td
                        style={{ lineHeight: '45px', textAlign: this.props.textAlign }}
                        colSpan={this.props.colSpan}
                    >{this.props.text}</td>
                </tr>
            </tbody>
        );
    }

    render() {
        if (this.props.type === 'panel') {
            return this.getPanelEmpty();
        }
        if (this.props.type === 'tbody') {
            return this.getTableEmpty();
        }
        return null;
    }
}

Empty.propTypes = {
    text: React.PropTypes.string.isRequired,
    textAlign: React.PropTypes.oneOf(['left', 'right', 'center']),
    type: React.PropTypes.oneOf(['panel', 'tbody']),
    colSpan: React.PropTypes.number,
};
Empty.defaultProps = {
    type: 'tbody',
    colSpan: 0,
    textAlign: 'center',
};

export default Empty;
