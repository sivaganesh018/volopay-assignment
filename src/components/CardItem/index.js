import {format} from 'date-fns'
import {ImFire} from 'react-icons/im'
import {BsFillCircleFill} from 'react-icons/bs'
import {MdLoop} from 'react-icons/md'

import './index.css'

const CardItem = props => {
  const {cardDetails} = props
  const {
    name,
    budgetName,
    ownerId,
    spent,
    availableToSpent,
    cardType,
    expiry,
    limit,
    status,
  } = cardDetails

  const cardTypeIcon = () => {
    let icon
    if (cardType === 'burner') {
      icon = <ImFire />
    } else {
      icon = <MdLoop />
    }
    return icon
  }

  return (
    <li className="card-item">
      <div className="card-name-and-card-type-container">
        <div className="card-name-and-budget-container">
          <h1 className="card-name">{name}</h1>
          <p className="owner-name-and-budget-name">
            {ownerId} . {budgetName}
          </p>
        </div>
        <div className="card-type-container">{cardTypeIcon()}</div>
      </div>
      <div className="card-type-expiry-container">
        <p className="card-type">{cardType}</p>
        <p className="card-expires">Expires: {expiry}</p>
      </div>
      <hr className="hr-line" />
      <div className="spent-container">
        <div className="spent-card">
          <BsFillCircleFill className="spent-circle-icon" />
          <p className="spent-text">spent</p>
        </div>
        <p className="spent-value-currency">
          {spent.value} {spent.currency}
        </p>
      </div>
      <div className="available-container">
        <div className="spent-card">
          <BsFillCircleFill className="available-circle-icon" />
          <p className="available-text">Available to spent</p>
        </div>
        <p className="available-value-currency">
          {availableToSpent.value} {availableToSpent.currency}
        </p>
      </div>
    </li>
  )
}
export default CardItem
