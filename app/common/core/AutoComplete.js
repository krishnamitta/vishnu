import React from 'react'
import MuiAutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'

// import xhr from '../../utils/xhr'
// import { objectByPath } from '../../utils/lang'
// import { objectToQuery } from '../../utils/form'
import { substitute } from '../../utils/string'
import { startsWithFilter } from '../../utils/filters'

class AutoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || '',
      dataSource: this.initializeDataSource(this.props.dataSource),
      rawDataSource: this.props.dataSource
    }
  }
  componentDidMount() {
    this.searchTextField = this.autoComplete.refs.searchTextField
    this.searchInput = this.autoComplete.refs.searchTextField.input
    this.triggerProcessInput()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('value')) {
      const changed = this.state.value !== nextProps.value
      this.setState({ value: nextProps.value || '' })
      if (changed) {
        this.triggerProcessInput()
      }
    }
  }
  onAutoComplete(selectedItem) {
    if (this.props.onAutoComplete) {
      this.props.onAutoComplete(selectedItem)
    }
  }
  getFilterQuery(searchText, lookupValue) {
    if (this.props.getFilterQuery) {
      return this.props.getFilterQuery(searchText, lookupValue)
    }
    return { q: searchText }
  }
  getItemValue(item) {
    if (this.props.getItemValue) {
      return this.props.getItemValue(item)
    }
    return substitute(this.props.valueTemplate, item)
  }
  getItemInputLabel(item) {
    if (this.props.getItemInputLabel) {
      return this.props.getItemInputLabel(item)
    }
    return substitute(this.props.labelTemplate, item)
  }
  getItemMenuLabel(item) {
    if (this.props.getItemMenuLabel) {
      return this.props.getItemMenuLabel(item)
    }
    return substitute(this.props.menuTemplate, item)
  }
  setErrors(valid, restrictOnly = true) {
    if (valid) {
      this.autoComplete && this.autoComplete.setState({ errorText: '' })
      this.searchInput.setCustomValidity('')
    } else {
      if (!restrictOnly) {
        this.autoComplete.setState({ errorText: 'Invalid input' })
      }
      this.searchInput.setCustomValidity('Invalid value. Please select appropriate option.')
    }
  }
  getDataSourcesState(rawDataSource) {
    if (this.props.getDataSourcesState) {
      return this.props.getDataSourcesState(rawDataSource)
    }
    // converting array data source to map our request templates
    if ((rawDataSource instanceof Object) && !(Array.isArray(rawDataSource))) {
      rawDataSource = this.convertObjectToArray(rawDataSource) // eslint-disable-line
    }
    const dataSource = rawDataSource.map((item) => { return this.buildItem(item) })
    return { rawDataSource, dataSource }
  }
  convertObjectToArray(obj) {
    const keys = Object.keys(obj)
    return keys.map((item) => { return { code: item, description: obj[item] } })
  }
  triggerProcessInput() {
    setImmediate(() => {
      if (typeof this.props.dataSource === 'string') {
        if (this.props.preload) {
          this.updateDataSource('', true).then(() => {
            this.processInput(this.state.value, [this.props.valueTemplate])
          })
        } else if (this.state.value) {
          this.updateDataSource(this.state.value, false, true).then(() => {
            this.processInput(this.state.value, [this.props.valueTemplate])
          })
        }
      } else if (Array.isArray(this.props.dataSource)) {
        this.processInput(this.state.value, [this.props.valueTemplate])
      }
    })
  }
  buildItem(item) {
    if (this.props.buildItem) {
      return this.props.buildItem(item)
    }
    const itemValue = this.getItemValue(item)
    const itemInputLabel = this.getItemInputLabel(item)
    return {
      text: itemInputLabel,
      value: (<MenuItem key={ itemValue } value={ itemInputLabel } primaryText={ this.getItemMenuLabel(item) } />),
      id: itemValue
    }
  }
  handleBlur(event) {
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
    setImmediate(() => {
      if (!this.state.value && this.autoComplete.state.searchText && !this.autoComplete.state.open) {
        this.processInput(this.autoComplete.state.searchText, [this.props.labelTemplate, this.props.valueTemplate])
      }
    })
  }
  handleNewRequest(searchText, index) {
    const chosenRequest = (index === -1) ?
      this.processInput(searchText, [this.props.labelTemplate, this.props.valueTemplate]) : this.state.rawDataSource[index]
    if (chosenRequest) {
      this.setState({ value: substitute(this.props.valueTemplate, chosenRequest) })
      this.setErrors(true)
    }
    if (this.props.onNewRequest && chosenRequest) {
      this.props.onNewRequest(chosenRequest, index)
    }
    setImmediate(() => { this.autoComplete && this.autoComplete.focus() }) //eslint-disable-line
  }
  handleUpdateInput(searchText, dataSource) {
    if (typeof this.props.dataSource === 'string' && !this.props.preload) {
      this.updateDataSource(searchText)
    }
    this.setErrors(!searchText)
    this.setState({ value: '' })
    if (this.props.onUpdateInput) {
      this.props.onUpdateInput(searchText, dataSource)
    }
  }
  processInput(inputText, templates) {
    if (!inputText) {
      this.setErrors(true)
      return null
    }
    const selectedItem = this.findSelectedItem(inputText, templates)
    if (!selectedItem) {
      this.setErrors(false)
      return null
    } else {
      this.setErrors(true)
      this.selectOption(selectedItem)
      this.onAutoComplete(selectedItem)
      return selectedItem
    }
  }
  findSelectedItem(searchText, templates) {
    return this.state.rawDataSource.find((item) => {
      switch (typeof item) {
        case 'string':
          return item.toLowerCase() === searchText.toLowerCase()
        case 'object':
          return templates.some((template) => {
            return substitute(template, item).toLowerCase() === searchText.toLowerCase()
          })
        default:
          return null
          // Do Nothing
      }
    })
  }
  selectOption(rawItem) {
    this.autoComplete.setState({ searchText: substitute(this.props.labelTemplate, rawItem) })
    this.setState({ value: substitute(this.props.valueTemplate, rawItem) })
  }
  initializeDataSource(propsDataSource) {
    if (Array.isArray(propsDataSource)) {
      return propsDataSource.map((item) => { return this.buildItem(item) })
    } else {
      return []
    }
  }
  updateDataSource(searchText, preload, lookupValue = false) {
    if (searchText.length > 0 || preload) {
      let query = { wt: 'json' }
      if (!preload) {
        query = Object.assign(this.getFilterQuery(searchText, lookupValue), query)
      }
      const url = `${this.props.dataSource}?${objectToQuery(query)}`
      return xhr.get(url).then((response) => {
        const rawDataSource = this.props.remoteDataSourcePath ?
          objectByPath(response.data, this.props.remoteDataSourcePath) : response.data
        this.setState(this.getDataSourcesState(rawDataSource))
      })
    }
  }
  blur() {
    this.autoComplete.blur()
  }

  focus() {
    this.autoComplete.focus()
  }

  select() {
    this.searchInput.select()
  }
  render() {
    const {
      onBlur,               // eslint-disable-line
      onNewRequest,         // eslint-disable-line
      onUpdateInput,        // eslint-disable-line
      name,                 // eslint-disable-line
      value,                // eslint-disable-line
      dataSource,           // eslint-disable-line
      underlineShow,
      ...other,
    } = this.props
    const autoCompleteProps = {
      ref: (elem) => this.autoComplete = elem,
      filter: this.props.fieldType === 'dropdown' ? MuiAutoComplete.noFilter : this.props.filter,
      dataSource: this.state.dataSource,
      floatingLabelFixed: this.props.disabled,
      hintText: this.props.disabled ? '' : (this.props.hintText || this.props.label),
      onBlur: (event) => this.handleBlur(event),
      onClick: () => this.select(),
      onNewRequest: (chosenRequest, index) => this.handleNewRequest(chosenRequest, index),
      onUpdateInput: (searchText, ds) => this.handleUpdateInput(searchText, ds),
      name,
      underlineShow
    }
    const inputProps = {
      type: 'hidden',
      value: this.state.value,
      ref: (elem) => this.input = elem,
      name
    }
    return (
      <div>
        <MuiAutoComplete
          { ...other }
          { ...autoCompleteProps }
        />
        <input
          { ...inputProps }
        />
      </div>
    )
  }
}
AutoComplete.propTypes = {
  buildItem: React.PropTypes.func,
  filter: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  onNewRequest: React.PropTypes.func,
  onUpdateInput: React.PropTypes.func,
  getFilterQuery: React.PropTypes.func,
  getDataSourcesState: React.PropTypes.func,
  getDisplayedValue: React.PropTypes.func,
  getItemValue: React.PropTypes.func,
  getItemInputLabel: React.PropTypes.func,
  getItemMenuLabel: React.PropTypes.func,
  onAutoComplete: React.PropTypes.func,
  strict: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  dataSource: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.string]),
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  valueTemplate: React.PropTypes.string,
  labelTemplate: React.PropTypes.string,
  menuTemplate: React.PropTypes.string,
  hintText: React.PropTypes.string,
  label: React.PropTypes.string,
  remoteDataSourcePath: React.PropTypes.string,
  preload: React.PropTypes.bool,
  fieldType: React.PropTypes.string,
  underlineShow: React.PropTypes.bool
}
AutoComplete.defaultProps = {
  strict: false,
  valueTemplate: '${code}',
  labelTemplate: '${description}',
  menuTemplate: '${description}',
  filter: startsWithFilter,
  preload: false,
  fullWidth: true,
}
export default AutoComplete
