import $ from 'jquery-ajax';
import React from 'react';
import ReactDom from 'react-dom';
import isString from 'lodash/isString';
import slice from 'lodash/slice';
import map from 'lodash/map';
import each from 'lodash/each';
import filter from 'lodash/filter';
import s from './Suggenstion.css';

class Sug extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            style: { width: this.props.width },
            results: [],
            selected: this.props.defaults || [],
            inputValue: '',
            loading: false,
        };
    }

    timer = 0;

    handleInputChange(e) {
        const inputValue = e.target.value.trim();
        if (!inputValue) {
            this.setState({
                inputValue: '',
                results: [],
            });
            return;
        }
        this.setState({ inputValue });
        if (isString(this.props.source)) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.fetchData(inputValue);
            }, 500);
        }
    }

    handleInputKeyUp(e) {
        if (e.keyCode === 8 && this.state.selected.length > 0 && this.state.inputValue === '') {
            const selected = slice(this.state.selected, 0, this.state.selected.length - 2);
            this.handleSelectedChange(selected);
        }
    }

    handleItemClick(index) {
        const item = this.state.results[index];
        this.select(item);
    }

    handleRemoveSelected(index) {
        const selected = filter(this.state.selected, (item, i) => i !== index);
        this.handleSelectedChange(selected);
    }

    handleSelectedChange(selected) {
        this.props.onChange(selected);
        this.setState({ selected });
        setTimeout(() => {
            this.calculateStyle();
        }, 0);
    }

    clear() {
        this.setState({
            inputValue: '',
            results: [],
        });
    }

    select(item) {
        const selected = this.state.selected.concat(item);
        this.setState({
            results: [],
            inputValue: '',
        });
        this.handleSelectedChange(selected);
    }

    focusInput() {
        this.refs['sugInput'].focus();
    }

    fetchData(query) {
        const data = {};
        data[this.props.queryKey] = query;
        this.setState({ loading: true });
        $.get(this.props.source, data, res => {
            let results = res.data;
            if (res.code === 200) {
                if (results.length > 5) {
                    // 最多显示5个
                    results = slice(results, 0, 5);
                }
                this.setState({ results });
            }
        }).always(() => {
            this.setState({ loading: false });
        });
    }

    calculateStyle() {
        const style = {
            width: this.props.width,
            paddingTop: 6,
            paddingLeft: 12,
        };
        const inputNode = ReactDom.findDOMNode(this.refs['sugInput']);
        const inputWidth = inputNode.offsetWidth;
        let contentWidth = 0;
        each(this.state.selected, (item, index) => {
            const node = ReactDom.findDOMNode(this.refs[`tag-${index}`]);
            const nodeWidth = node.offsetWidth + 5;
            if ((contentWidth + nodeWidth) > (inputWidth - 5)) {
                contentWidth = nodeWidth;
                style.paddingTop += 34;
                style.paddingLeft = 12 + nodeWidth;
            } else {
                contentWidth += nodeWidth;
                style.paddingLeft += nodeWidth;
            }
        });
        this.setState({ style });
        this.focusInput();
    }

    renderSelected() {
        return map(this.state.selected, (item, index) => (
            <span
                key={index}
                className={s.selected}
                ref={`tag-${index}`}
                onClick={() => this.handleRemoveSelected(index)}
            >
                {this.props.display(item)}
            </span>
        ));
    }

    render() {
        const showList = this.state.results.length > 0;
        const listItems = map(this.state.results, (item, index) => (
            <a
                key={item.id || index}
                onClick={() => this.handleItemClick(index)}
                onKeyUp={() => this.handleKeyUp(index)}
                className="list-group-item"
            >
                {this.props.display(item)}
            </a>
        ));
        return (
            <div className={s.sug}>
                <div
                    className={s['selected-tag-wrapper']}
                    onClick={() => { ReactDom.findDOMNode(this.refs['sugInput']).focus(); }}
                >
                    {this.renderSelected()}
                </div>
                <input
                    ref="sugInput"
                    type="text"
                    className="form-control"
                    style={this.state.style}
                    placeholder={this.props.ph}
                    onChange={e => this.handleInputChange(e)}
                    onKeyUp={e => this.handleInputKeyUp(e)}
                    value={this.state.inputValue}
                />
                {!this.state.loading ? null : <i className="fa fa-spin fa-spinner" />}
                <div className="list-group" style={{ display: showList ? 'block' : 'none' }}>
                    {listItems}
                </div>
            </div>
        );
    }
}

Sug.propTypes = {
    width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    ph: React.PropTypes.string,
    source: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.array,
    ]),
    defaultValue: React.PropTypes.string,
    queryKey: React.PropTypes.string,
    display: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func,
};

Sug.defaultProps = {
    width: 260,
    queryKey: 'query',
    defaultValue: '',
    display: item => item.toString(),
    onChange: () => null,
};

export default Sug;
