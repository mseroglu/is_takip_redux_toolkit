import { useSelector } from "react-redux"
import Loader from "../components/Loader"
import Error from "../components/Error"
import Card from "../components/Card"
import Filter from "../components/Filter"


const JobList = ({ retry }) => {
    const { isLoading, error, jobs } = useSelector(store => store.jobReducer)

    return (
        
        <div className="list-page">
            <Filter />

            {
                isLoading
                    ? <Loader />
                    : error
                        ? <Error msg={error} retry={retry} />
                        : (
                            <div className="card-wrapper">
                            {jobs.map((job, i) => (<Card key={i} job={job} />))}
                        </div>
                        )
            }
        </div>
    )

}

export default JobList
