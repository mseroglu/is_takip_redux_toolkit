import { useSelector } from "react-redux"


const AutoInput = ({ label, name }) => {
    const { jobs } = useSelector(store => store.jobReducer)

    const newArray = jobs.map((job) => job[name])

    const set = new Set(newArray)

    const options = Array.from(set)

    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input list={name + "1"} name={name} id={name} type="text" required/>

            <datalist id={name + "1"}>
                {
                    options.map((item, i) => (<option key={i} value={item}></option>))
                }
            </datalist>
        </div>
    )
}

export default AutoInput
