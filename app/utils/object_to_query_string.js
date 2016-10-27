import _ from 'lodash'
const objectToQueryString = (obj = {}) => {
	const qs = _.reduce(obj, (result, value, key) => (!_.isNull(value) && !_.isUndefined(value)) ? (result += `${key}=${value}&`) : result, '').slice(0, -1) // eslint-disable-line
	return qs
}
export default objectToQueryString
