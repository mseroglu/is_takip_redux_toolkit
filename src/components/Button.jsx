

const Button = ({ text, type= "submit" }) => {


  return (
    <div>
      <button type={type} className="btn">{text}</button>
    </div>
  )
}

export default Button
