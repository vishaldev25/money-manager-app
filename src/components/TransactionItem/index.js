import './index.css'

const TranscationItem = props => {
  const {transcationDetails, deleteTranscation} = props
  const {title, type, amount, id} = transcationDetails

  const onDeleteValue = () => {
    deleteTranscation(id)
  }

  return (
    <li className="transcation-items">
      <p className="title-list">{title}</p>
      <p className="type-list">{type}</p>
      <p className="amount-list">{amount}</p>
      <div>
        <button
          type="button"
          className="delete-button"
          onClick={onDeleteValue}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="del-image"
          />
        </button>
      </div>
    </li>
  )
}

export default TranscationItem
