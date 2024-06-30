import { toast } from "react-toastify"
import AutoInput from "../components/AutoInput"
import SelectInput from "../components/SelectInput"
import Button from "../components/Button"
import { statusOpt, typeOpt } from "../utils/constants"
import { v4 as uuid } from "uuid"
import apii from "../utils/api"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addNewJob } from "../redux/slices/jobSlice"


const AddJob = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const newJob = Object.fromEntries(formData.entries())

    newJob.id = uuid()
    newJob.date = Date.now()

    console.log(newJob)

    apii.post("/jobs", newJob)
      .then((resp) => {
        dispatch(addNewJob(newJob))
        navigate("/")
        toast.success("Kayıt Başarılı..")
      })
      .catch((err) => toast.error("Hata Kodu : " + err.message))



  }
  return (
    <div className="add-page">
      <section className="container">
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-area">
            <AutoInput label="Pozisyon" name="position" />
            <AutoInput label="Şirket" name="company" />
            <AutoInput label="Lokasyon" name="location" />
            <SelectInput label="Durum" name="status" options={statusOpt} />
            <SelectInput label="Tür" name="type" options={typeOpt} />
          </div>

          <div className="buttonArea">
            <Button text="Gönder" />
          </div>
        </form>
      </section>


    </div>
  )
}

export default AddJob
