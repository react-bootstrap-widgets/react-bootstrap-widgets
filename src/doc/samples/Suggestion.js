class SuggestionDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [
                { id: 1, name: 'Tom', age: 22, city: 'BeiJing'},
                { id: 2, name: 'Lucy', age: 25, city: 'WeiFang'},
                { id: 3, name: 'Jack', age: 24, city: 'NanJing'},
                { id: 4, name: 'Lily', age: 23, city: 'ShangHai'},
            ],
        };
    }

    render() {
        return (
            <div>
                <Suggestion
                    data={this.state.users}
                    columns={this.columns}
                    templates={this.templates}
                    labels={this.labels}
                />
            </div>
        );
    }
}

ReactDOM.render(<SuggestionDemo/>, mountNode);
