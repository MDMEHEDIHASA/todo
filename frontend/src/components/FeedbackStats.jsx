import { useSelector } from 'react-redux'

function FeedbackStats() {
  const { items } = useSelector(state=>state.product)

  const average =
    items.length === 0
      ? 0
      : items.reduce((acc, { rating }) => acc + rating, 0) / items.length

  return (
    <div className='feedback-stats'>
      <h4 className='text-white'>{items.length} Reviews</h4>
      <h4 className='text-white'>Average Rating: {average.toFixed(1).replace(/[.,]0$/, '')}</h4>
    </div>
  )
}

export default FeedbackStats