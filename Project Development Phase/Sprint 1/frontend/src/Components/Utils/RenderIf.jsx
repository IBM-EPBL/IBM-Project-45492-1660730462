import Proptypes from 'prop-types'

const RenderIf = ({ condition = false, children, otherwise = null }) => {
    return condition ? children : otherwise
}
RenderIf.propsTypes = {
    condition: Proptypes.bool,
    otherwise: Proptypes.oneOfType([Proptypes.arrayOf(Proptypes.node), Proptypes.node]),
    children: Proptypes.oneOfType([Proptypes.arrayOf(Proptypes.node), Proptypes.node]),
}
RenderIf.defaultProps = {
    otherwise: null,
}
export default RenderIf
