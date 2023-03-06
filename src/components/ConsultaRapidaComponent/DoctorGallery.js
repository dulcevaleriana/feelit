import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { useHttpClient } from '../../shared/hooks/http-hook';
import GetTodayDate from "../../shared/util/getTodayDate";

export default function DoctorGallery(props) {
    const [counterSelect, setCounterSelect] = useState(0);
    const { sendRequest } = useHttpClient();
    const [getList, setGetList] = useState(null);
    const {actualDay} = GetTodayDate();

    const filterDoctor = props.functionFilter ? getList?.getAllDoctor?.filter((data)=>props.functionFilter(data)) : getList?.getAllDoctor;

    useEffect(()=>{
        filterDoctor && counterSelect === 0 && props.sendDoctor(filterDoctor[counterSelect])
        // props.sendDoctor(filterDoctor[counterSelect])
    },[filterDoctor,counterSelect,props])

    useEffect(()=>{
        const getUserFunction = async () => {
            const response = await sendRequest(process.env.REACT_APP_ + 'doctor/')
            setGetList(response)
        }
        getUserFunction()
    },[sendRequest])

    const backFunction = () => {
        if(counterSelect <= 0){
            return setCounterSelect(0)
        }
        setCounterSelect(counterSelect - 1)
        props.sendDoctor(filterDoctor[counterSelect - 1])
    }

    const nextFunction = () => {
        setCounterSelect(counterSelect + 1)
        props.sendDoctor(filterDoctor[counterSelect + 1])
    }

    const GetSpecialtyName = (specialty) => {
        const [getSpecialty, setGetSpecialty] = useState(null);

        useEffect(()=>{
            const getSpecialtyFunction = async () => {
                try{
                    const specialtyResponse = await sendRequest(process.env.REACT_APP_ + 'specialty/' + specialty.specialty)
                    setGetSpecialty(specialtyResponse)
                } catch(err){}
            }
            getSpecialtyFunction()
        },[specialty])

        return <h5>{getSpecialty?.getSpecialtyId?.specialtyName ? getSpecialty?.getSpecialtyId?.specialtyName : "N/A"}</h5>
    }

    return <div className="class-DoctorGallery">
        <h5>Elige tu medico de preferencia, fecha y hora de la cita</h5>
        <div>
            {filterDoctor?.length > 1 && <FontAwesomeIcon
                onClick={backFunction}
                icon={faAngleLeft}
                size="lg"
            />}
            <span className={filterDoctor?.length === 1 && "class-column-2 class-select"}>
            {filterDoctor?.map((index, key) => (
                <span
                    key={key}
                    className={
                        key === counterSelect
                        ? "class-select"
                        : key === counterSelect - 1 || key === counterSelect + 1
                        ? "class-semi-view"
                        : " "
                    }
                >
                    <div><img src={index.image ? index.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt={index.image ? index.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}/></div>
                    {key === counterSelect && <>
                        <h4>{index.name}</h4>
                        <GetSpecialtyName specialty={index.specialty}/>
                    </>}
                </span>
            ))}
            </span>
            {filterDoctor?.length > 1 && <FontAwesomeIcon
                onClick={nextFunction}
                icon={faAngleRight}
                size="lg"
            />}
        </div>
        <h6>Hoy es: {actualDay}</h6>
    </div>
}