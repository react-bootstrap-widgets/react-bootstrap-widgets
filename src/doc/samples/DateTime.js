class DateTimeDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <DateTime
                    data={this.state.users}
                    columns={this.columns}
                    templates={this.templates}
                    labels={this.labels}
                />
            </div>
        );
    }
}

ReactDOM.render(<DateTimeDemo/>, mountNode);
