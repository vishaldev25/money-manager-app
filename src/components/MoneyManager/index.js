import {Component} from 'react'
import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    historyList: [],
  }
  renderWelcomeDetails = () => (
    <div className="welcome mb-3">
      <h1 className="greeting">Hi, Richard</h1>
      <p className="para">
        Welcome back to your <span>Money Manager</span>
      </p>
    </div>
  )

  deleteTranscation = id => {
    const {historyList} = this.state
    const updated = historyList.filter(each => id !== each.id)

    this.setState({historyList: updated})
  }

  addTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  addAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  clicked = event => {
    this.setState({optionId: event.target.value})
  }

  onAddButton = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const optionSelected = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    const {displayText} = optionSelected
    const newTranscation = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prev => ({
      historyList: [...prev.historyList, newTranscation],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getExpenses = () => {
    const {historyList} = this.state
    let expenses = 0
    historyList.forEach(each => {
      if (each.type === transactionTypeOptions[1].displayText) {
        expenses += each.amount
      }
    })
    return expenses
  }

  getIncome = () => {
    const {historyList} = this.state
    let income = 0
    historyList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        income += each.amount
      }
    })
    return income
  }

  getBalance = () => {
    const {historyList} = this.state
    let balance = 0
    let income = 0
    let expenses = 0
    historyList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        income += each.amount
      } else if (each.type === transactionTypeOptions[1].displayText) {
        expenses = each.amount
      }
      balance = income - expenses
    })
    return balance
  }

  renderInputDetails = () => {
    const {titleInput, amountInput, optionId} = this.state
    return (
      <div className="form-control col-12 col-md-6 mt-3 mb-3 p-3">
        <h2 className="trans-heading pb-2">Add Transactions</h2>
        <form onSubmit={this.onAddButton}>
          <div className="d-flex flex-column mb-3">
            <label htmlFor="title" className="pb-1">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              onChange={this.addTitle}
              value={titleInput}
            />
          </div>
          <div className="d-flex flex-column mb-3">
            <label htmlFor="amount" className="pb-1">
              AMOUNT
            </label>
            <input
              type="text"
              id="amount"
              onChange={this.addAmount}
              value={amountInput}
            />
          </div>
          <div className="d-flex flex-column mb-3">
            <label htmlFor="type" className="pb-1">
              TYPE
            </label>
            <select onChange={this.clicked} value={optionId} id="type">
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    )
  }

  renderHistoryTranscations = () => {
    const {historyList} = this.state

    return (
      <div className="form-control">
        <h1 className="trans-heading">History</h1>
        <div className="trans-table">
          <ul className="unordered-lists">
            <li className="d-flex">
              <p className="title-value ">Title</p>
              <p className="amount-value ">Type</p>
              <p className="type-value ">Amount</p>
            </li>
            {historyList.map(each => (
              <TransactionItem
                key={each.id}
                transcationDetails={each}
                deleteTranscation={this.deleteTranscation}
              />
            ))}
            <hr />
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {historyList} = this.state
    console.log(historyList)
    const balance = this.getBalance()
    const income = this.getIncome()
    const expenses = this.getExpenses()
    return (
      <div className="container">
        <div className="row">
          <div className="manager-container pb-5">
            <div className="">{this.renderWelcomeDetails()}</div>

            <MoneyDetails
              balance={balance}
              income={income}
              expenses={expenses}
            />

            <div className=" mt-5 history-cont ">
              <div className="mb-3 col-12 col-md-4">
                {this.renderInputDetails()}
              </div>
              <div className="col-12 col-md-7 mt-3 just-details">
                {this.renderHistoryTranscations()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
