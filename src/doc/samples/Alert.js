class TableDemo extends React.Component {

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

    columns = ['name', 'age', 'city', 'op'];

    labels = {
        op: 'Operation',
    };

    templates = {
        op: user => <a href="#" onClick={e => this.deleteUser(e, user)}>Delete</a>,
    };

    deleteUser(e, user) {
        e.preventDefault();
        this.setState({
            users: this.state.users.filter(u => u.id !== user.id),
        });
    }

    render() {
        return (
            <div>
                <Table
                    data={this.state.users}
                    columns={this.columns}
                    templates={this.templates}
                    labels={this.labels}
                />
            </div>
        );
    }
}

ReactDOM.render(<TableDemo/>, mountNode);
