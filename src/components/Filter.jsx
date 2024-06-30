import { useEffect, useState } from "react"
import { statusOpt, typeOpt, typeSort } from "../utils/constants"
import AutoInput from "./AutoInput"
import Button from "./Button"
import SelectInput from "./SelectInput"
import apii from "../utils/api"
import { useDispatch } from "react-redux"
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice"


const Filter = () => {
    const [searchText, setSearchText] = useState()
    const [debouncedText, setDebouncedText] = useState()
    const [status, setStatus] = useState()
    const [type, setType] = useState()
    const [sort, setSort] = useState()

    const dispatch = useDispatch()
    // DEBOUNCE yapmak (bir süre bekle, tuşa basılmazsa isteği at)
    useEffect(() => {
        // api istedğini her tuşa basılınca atılmasın diye 
        const timer = setTimeout(() => {
            setDebouncedText(searchText)
        }, 1000);
        // eğer süre dolmadan tekrar tuşa basılırsa önceki sayacı sil
        return () => clearTimeout(timer)
    }, [searchText])

    useEffect(() => {
        const sortP =
            sort === "a-z" || sort === "z-a"
                ? "company"
                : sort === "Yeni üstte" || sort === "Eski üstte"
                    ? "date"
                    : undefined

        const orderP =
            sort === "a-z" || sort === "Eski üstte"
                ? "asc"
                : sort === "z-a" || sort === "Yeni üstte"
                    ? "desc"
                    : undefined

        const params = {
            q: debouncedText,
            status: status || undefined,
            type: type || undefined,
            _sort: sortP,
            _order: orderP
        }
        dispatch(setLoading(true))

        apii.get("/jobs", { params })
            .then((resp) => dispatch(setJobs(resp.data)))
            .catch((err) => dispatch(setError((err.message))))
    }, [debouncedText, status, type, sort])

    const handleReset = (e) => {
        setSearchText()
        setDebouncedText()
        setStatus()
        setType()
        setSort()
    }



    return (
        <div className="filter-section">
            <section className="container">

                <form onReset={handleReset}>
                    <div className="form-area">
                        <div className="input-group">
                            <label htmlFor="search">Ara</label>
                            <input type="text" onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                        <SelectInput
                            label="Durum"
                            name="status"
                            options={statusOpt}
                            fonk={(e) => setStatus(e.target.value)} />
                        <SelectInput
                            label="Tür"
                            name="type"
                            options={typeOpt}
                            fonk={(e) => setType(e.target.value)} />
                        <SelectInput
                            label="Sırala"
                            name="sorting"
                            options={typeSort}
                            fonk={(e) => setSort(e.target.value)} />
                    </div>

                    <div className="buttonArea">
                        <Button text="Filtreleri Sıfırla" type="reset" />
                    </div>
                </form>

            </section>
        </div>
    )
}

export default Filter
