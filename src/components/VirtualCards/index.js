import {Component} from 'react'

import {BsCameraVideo} from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
import {BiMenu, BiGridSmall} from 'react-icons/bi'

import './index.css'
import TabItem from '../TabItem'
import CardItem from '../CardItem'

const tabsList = [
  {
    id: 'YOUR',
    tabName: 'Your',
  },
  {
    id: 'ALL',
    tabName: 'All',
  },
  {
    id: 'BLOCKED',
    tabName: 'Blocked',
  },
]

const apiConstantsStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VirtualCards extends Component {
  state = {
    activeTab: tabsList[1].id,
    apiStatus: apiConstantsStatus.initial,
    cardData: [],
  }

  componentDidMount() {
    this.getVirtualCards()
  }

  getVirtualCards = async () => {
    this.setState({apiStatus: apiConstantsStatus.inProgress})

    const apiUrl =
      'https://636f9579bb9cf402c81aeb5f.mockapi.io/cards?page=1&limit=10'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.map(eachCard => ({
        id: eachCard.id,
        name: eachCard.name,
        budgetName: eachCard.budget_name,
        ownerId: eachCard.owner_id,
        spent: eachCard.spent,
        availableToSpent: eachCard.available_to_spent,
        cardType: eachCard.card_type,
        expiry: eachCard.expiry,
        limit: eachCard.limit,
        status: eachCard.status,
      }))
      console.log(updatedData)
      this.setState({
        cardData: updatedData,
        apiStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsStatus.failure})
    }
  }

  activeTabId = id => {
    this.setState({activeTab: id})
  }

  renderVirtualCards = () => {
    const {cardData} = this.state
    return (
      <ul className="cards-list">
        {cardData.map(eachCard => (
          <CardItem key={eachCard.id} cardDetails={eachCard} />
        ))}
      </ul>
    )
  }

  render() {
    const {activeTab} = this.state
    console.log(activeTab)
    return (
      <div className="app-container">
        <div className="virtual-cards-header-container">
          <div className="virtual-cards-head">
            <h1 className="heading">VirtualCards</h1>
            <a href="true" className="anchor-tag">
              <BsCameraVideo className="video-icon" />
              <p className="learn-more-text">Learn more</p>
            </a>
          </div>
          <div className="add-card-container">
            <AiOutlinePlus className="plus-icon" />
            <p className="virtual-card-add-text">VirtualCard</p>
          </div>
        </div>
        <div className="tabs-container">
          <ul className="tabs-list">
            {tabsList.map(eachTab => (
              <TabItem
                key={eachTab.id}
                tabDetails={eachTab}
                getActiveTab={this.activeTabId}
                isActiveId={activeTab === eachTab.id}
              />
            ))}
          </ul>
          <div className="menu-grid-icons-container">
            <BiGridSmall className="grid-icon" />
            <BiMenu className="menu-icon" />
          </div>
        </div>
        {this.renderVirtualCards()}
      </div>
    )
  }
}
export default VirtualCards
