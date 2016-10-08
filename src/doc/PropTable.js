import merge from 'lodash/merge';
import React from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Label from 'react-bootstrap/lib/Label';
import Table from 'react-bootstrap/lib/Table';
import capitalize from 'react-bootstrap/lib/utils/capitalize';
import metaData from '../prop_data.json';

function cleanDocletValue(str) {
  return str.trim().replace(/^\{/, '').replace(/\}$/, '');
}

function getPropsData(component) {
  let componentData = metaData[component] || {};
  let props = componentData.props || {};

  if (componentData.composes) {
    componentData.composes.forEach(other => {
      if (other !== component) {
        props = merge({}, getPropsData(other), props);
      }
    });
  }

  if (componentData.mixins) {
    componentData.mixins.forEach( other => {
      if (other !== component && componentData.composes.indexOf(other) === -1) {
        props = merge({}, getPropsData(other), props);
      }
    });
  }

  return props;
}


const PropTable = React.createClass({

  componentWillMount() {
    this.propsData = getPropsData(this.props.component);
  },

  render() {
    let propsData = this.propsData;

    if (!Object.keys(propsData).length) {
      return <div className="text-muted"><em>There are no public props for this component.</em></div>;
    }

    return (
      <div className="prop-table">
        <Table bordered striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            { this._renderRows(propsData) }
          </tbody>
        </Table>
      </div>
    );
  },

  _renderRows(propsData) {
    return Object.keys(propsData)
      .sort()
      .filter(propName => propsData[propName].type && !propsData[propName].doclets.private )
      .map(propName => {
        let propData = propsData[propName];

        return (
          <tr key={propName} className="prop-table-row">
            <td>
              {propName} {this.renderRequiredLabel(propData)}
            </td>
            <td>
              <div>{this.getType(propData)}</div>
            </td>
            <td>{propData.defaultValue}</td>

            <td>
              { propData.doclets.deprecated
                && <div className="prop-desc-heading">
                  <strong className="text-danger">{'Deprecated: ' + propData.doclets.deprecated + ' '}</strong>
                </div>
              }
              { this.renderControllableNote(propData, propName) }
              <div className="prop-desc" dangerouslySetInnerHTML={{__html: propData.descHtml }} />
            </td>
          </tr>
        );
      });
  },

  renderRequiredLabel(prop) {
    if (!prop.required) {
      return null;
    }

    return (
      <Label>required</Label>
    );
  },

  renderControllableNote(prop, propName) {
    let controllable = prop.doclets.controllable;
    let isHandler = this.getDisplayTypeName(prop.type.name) === 'function';

    if (!controllable) {
      return false;
    }

    let text = isHandler ? (
      <span>
        controls <code>{controllable}</code>
      </span>
    ) : (
      <span>
        controlled by: <code>{controllable}</code>,
        initial prop: <code>{'default' + capitalize(propName)}</code>
      </span>
    );

    return (
      <div className="prop-desc-heading">
        <small>
          <em className="text-info">
            <Glyphicon glyph="info-sign"/>
            &nbsp;{ text }
          </em>
        </small>
      </div>
    );
  },

  getType(prop) {
    let type = prop.type || {};
    let name = this.getDisplayTypeName(type.name);
    let doclets = prop.doclets || {};

    switch (name) {
      case 'object':
        return name;
      case 'union':
        return type.value.reduce((current, val, i, list) => {
          let item = this.getType({ type: val });
          if (React.isValidElement(item)) {
            item = React.cloneElement(item, {key: i});
          }
          current = current.concat(item);

          return i === (list.length - 1) ? current : current.concat(' | ');
        }, []);
      case 'array':
        let child = this.getType({ type: type.value });

        return <span>{'array<'}{child}{'>'}</span>;
      case 'enum':
        return this.renderEnum(type);
      case 'custom':
        return cleanDocletValue(doclets.type || name);
      default:
        return name;
    }
  },

  getDisplayTypeName(typeName) {
    if (typeName === 'func') {
      return 'function';
    } else if (typeName === 'bool') {
      return 'boolean';
    }

    return typeName;
  },

  renderEnum(enumType) {
    const enumValues = enumType.value || [];

    const renderedEnumValues = [];
    enumValues.forEach(function renderEnumValue(enumValue, i) {
      if (i > 0) {
        renderedEnumValues.push(
          <span key={`${i}c`}>, </span>
        );
      }

      renderedEnumValues.push(
        <code key={i}>{enumValue}</code>
      );
    });

    return (
      <span>one of: {renderedEnumValues}</span>
    );
  }
});


export default PropTable;
