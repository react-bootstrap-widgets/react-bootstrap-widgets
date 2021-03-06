import React from 'react';
import ReactBSTable from 'react-bootstrap/lib/Table';
import Panel from 'react-bootstrap/lib/Panel';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import clone from 'lodash/clone';

import './Table.css';

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: [],
    };
  }

  processOrder() {
    if (this.props.data.length === 0) return this.props.data;
    let data = clone(this.props.data);
    this.state.order.forEach(o => {
      data = data.sort(this.compare(o[0], o[1] || 'asc'));
    });
    return data;
  }

  compare(column, order) {
    const orderDirection = order === 'asc' ? 1 : -1;
    return function (a, b) {
      let ret = 0;
      if (a[column] < b[column]) {
        ret = -1;
      }
      if (a[column] > b[column]) {
        ret = 1;
      }
      return ret * orderDirection;
    }
  }

  orderBy(column) {
    console.info(column);
    if (this.props.sort.indexOf(column) === -1) return;
    const os = [];
    let c = [];
    this.state.order.forEach((o) => {
      if (o[0] === column) {
        c = [o[0], o[1] === 'desc' ? 'asc' : 'desc'];
      } else {
        os.push(o);
      }
    });
    if (c.length === 0) {
      c = [column, 'asc'];
    }
    os.push(c);
    this.setState({ order: os });
  }

  getOrderMap() {
    const ret = {};
    this.state.order.forEach(o => {
      ret[o[0]] = o[1];
    });
    return ret;
  }

  renderHeader() {
    const columns = this.props.columns;
    const labels = this.props.labels;
    const om = this.getOrderMap();
    const tableHeaderCells = (
      columns.map((c, index) => {
        const thc = labels[c] || c;
        return (
          <th
            key={index}
            onClick={() => this.orderBy(c)}
            className={`${om[c]} ${this.props.sort.indexOf(c) === -1 ? '' : 'sorted-col'}`}
          >
            {thc}
          </th>
        );
      })
    );
    return <thead>
      <tr>{tableHeaderCells}</tr>
    </thead>;
  }

  renderBody() {
    const data = this.props.data;
    const dataLoading = this.props.dataLoading;
    const columns = this.props.columns;
    const loadingMessage = this.props.loadingMessage;
    const emptyMessage = this.props.emptyMessage;
    const templates = this.props.templates;
    const tdClassNames = this.props.tdClassNames;
    const tdStyles = this.props.tdStyles;
    let rows;
    if (dataLoading) {
      rows = <tr>
        <td colSpan={columns.length}>{loadingMessage}</td>
      </tr>;
    } else if (data.length === 0) {
      rows = <tr>
        <td colSpan={columns.length}>{emptyMessage}</td>
      </tr>;
    } else {
      const sortedData = this.processOrder();
      rows = sortedData.map((d, index) => (
        <tr key={index}>
          {
            columns.map((c, tdIdx) => {
              const template = templates[c];
              const tdClassName =
                tdClassNames[c] ? tdClassNames[c].join(' ') : undefined;
              const tdStyle = tdStyles[c] ? tdStyles[c] : undefined;
              if (template && isFunction(template)) {
                return (
                  <td
                    className={tdClassName}
                    style={tdStyle}
                    key={tdIdx}
                  >{template(d)}</td>
                );
              }
              return <td key={tdIdx}>{d[c]}</td>;
            })
          }
        </tr>
      ));
    }
    return <tbody>{rows}</tbody>;
  }

  render() {
    const {
      data, alwaysShowHeader, dataLoading, loadingMessage, emptyMessage,
      ...otherProps,
    } = this.props;
    const reactBsTableProps = omit(otherProps, [
      'labels',
      'columns',
      'templates',
      'selectable',
      'tdClassNames',
      'tdStyles',
      'sort',
    ]);
    if (!alwaysShowHeader) {
      if (dataLoading) {
        return <Panel>{loadingMessage}</Panel>;
      }
      if (data.length === 0) {
        return <Panel>{emptyMessage}</Panel>;
      }
    }
    return (
      <ReactBSTable {...reactBsTableProps}>
        {this.renderHeader()}
        {this.renderBody()}
      </ReactBSTable>
    );
  }
}

Table.propTypes = {
  /**
   * Data to display in table.
   */
  data: React.PropTypes.array,

  /**
   * Weather table data is loading.
   */
  dataLoading: React.PropTypes.bool,

  /**
   * Columns to display in table.
   */
  columns: React.PropTypes.arrayOf(React.PropTypes.string),

  /**
   * Field labels to display in table header.
   */
  labels: React.PropTypes.object,

  /**
   * Template string or function to custom filed value which will be displayed in table cell.
   */
  templates: React.PropTypes.object,

  /**
   * Css classNames attached to td and th, like: { xxxColumn: ['cls1', 'cls2']}.
   */
  tdClassNames: React.PropTypes.object,

  /**
   * Css styles attached to td and th, like: { xxxColumn: { width: 100 }}.
   */
  tdStyles: React.PropTypes.object,

  /**
   * Text to display when table data is empty
   */
  emptyMessage: React.PropTypes.string,

  /**
   * Text to display when table data is loading.
   */
  loadingMessage: React.PropTypes.string,

  /**
   * Weather to show table header when table data is empty or loading.
   */
  alwaysShowHeader: React.PropTypes.bool,

  /**
   * Columns can be sorted.
   */
  sort: React.PropTypes.array,
};

Table.defaultProps = {
  data: [],
  dataLoading: false,
  columns: [],
  labels: {},
  templates: {},
  tdClassNames: {},
  tdStyles: {},
  emptyMessage: 'There\'s no data to display.',
  loadingMessage: 'Loading...',
  alwaysShowHeader: true,
  hover: true,
  bordered: true,
  sort: [],
};

export default Table;
