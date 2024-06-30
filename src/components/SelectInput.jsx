

const SelectInput = ({ label, name, options, fonk }) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        onChange={fonk}
        required >
          
        <option value="">Seçiniz</option>
        {
          options.map((item, i) => <option key={i} value={item}>{item}</option>)
        }
      </select>
    </div>
  )
}

export default SelectInput
