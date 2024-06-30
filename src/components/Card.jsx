import DelButton from "./DelButton"
import { IoLocation } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";


const Card = ({ job }) => {
    
    const bg_colors = {
        "Mülakat":"bg_red",
        "Devam Ediyor":"bg_green",
        "Reddedildi": "bg_orange"
    }

    return (
        <div className="card">
            <div className="head">
                <section>
                    <div className="letter">
                        <span>{job.company[0]}</span>
                    </div>
                    <div className="info">
                        <p>{job.position}</p>
                        <p>{job.company}</p>
                    </div>
                </section>

                <section>
                    <DelButton id={job.id} />
                </section>
            </div>

            <div className="body">
                <div className="field"><IoLocation /> {job.location}</div>
                <div className="field"><FaSuitcase /> {job.type}</div>
                <div className="field"><IoCalendarNumberOutline /> {new Date(job.date).toLocaleDateString()}</div>
                <div><span className={"status "+bg_colors[job.status]}>{job.status}</span></div>
            </div>
        </div>
    )
}

export default Card
