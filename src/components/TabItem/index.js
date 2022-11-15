import './index.css'

const TabItem = props => {
  const {tabDetails, getActiveTab, isActiveId} = props
  const {tabName, id} = tabDetails

  const onClickTab = () => {
    getActiveTab(id)
  }

  const className = isActiveId ? 'tab-name active' : 'tab-name'

  return (
    <li className="tab-item" onClick={onClickTab}>
      <p className={className}>{tabName}</p>
    </li>
  )
}
export default TabItem
