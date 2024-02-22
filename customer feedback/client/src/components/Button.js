import PropTypes from 'prop-types'

const Button = ({ text, onClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>  
        <button
        onClick={onClick}
        style={{ backgroundColor: 'blue' }}
        className='btn'
        >
        {text}
        </button>
    </div>    
  )
}


Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button