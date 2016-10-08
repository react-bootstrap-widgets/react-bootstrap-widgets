import React from 'react';
import Link from 'react-router/lib/Link';

function Nav(props) {
  return (
    <ul>
      {
        props.data.map((d, i) => {
          const hasChildren = d.children && d.children.length > 0;
          let className = undefined;
          if (hasChildren) className = 'has-children';
          if (d.open) className = `${className} open`;
          return (
            <li
              key={i}
              className={hasChildren ? className : null}
            >
              <Link
                to={d.href}
                activeClassName="active"
              >
                {d.text}
                {d.subt && <span className="text-muted sub-title"> - {d.subt}</span>}
              </Link>
              {
                hasChildren && <Nav data={d.children} />
              }
            </li>
          );
        })
      }
    </ul>
  );
}

class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toc: [
        {
          text: '简介',
          subt: 'Introduction',
          href: 'intro.html',
        },
        {
          text: '组件',
          subt: 'Widgets',
          href: 'widgets.html',
          children: [
            {text: '表格', subt: 'Table', href: 'table.html'},
            {text: '表单', subt: 'Form', href: 'form.html'},
            {text: '弹窗', subt: 'Dialog', href: 'dialog.html'},
            {text: '确认框', subt: 'Confirm', href: 'confirm.html'},
            {text: '警示框', subt: 'Alert', href: 'alert.html'},
            {text: '自动提示输入框', subt: 'Suggestion', href: 'suggestion.html'},
            {text: '工具栏', subt: 'Toolbar', href: 'toolbar.html'},
          ]
        }
      ]
    };
  }

  componentDidMount() {
    this.activePath(this.props.href);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.href !== nextProps.href) {
      this.activePath(nextProps.href);
    }
  }

  activePath(href) {
    if (!href) return;
    var toc = this.state.toc;
    this.processOpen(toc, href);
    this.setState({ toc });
  }

  processOpen(data, href) {
    if (href[0] === '/') {
      href = href.substring(1);
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].href === href) {
        data[i].open = true;
        return true;
      }
      if (data[i].children && data[i].children.length > 0) {
        data[i].open = this.processOpen(data[i].children, href);
        if (data[i].open) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    return (
      <div className="doc-navigation">
        <Nav
          data={this.state.toc}
        />
      </div>
    );
  }
}

Navigation.propTypes = {
  href: React.PropTypes.string,
};
Navigation.defaultProps = {
  href: '',
};

export default Navigation;
