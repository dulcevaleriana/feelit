import React, {useContext, useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import CardMeet from '../UIElements/cardMeet';
import { AuthContext } from '../../shared/context/auth-context';
import ActionAreaCard from '../UIElements/ActionAreaCard';
import { useHttpClient } from '../../shared/hooks/http-hook';

const DUMMY_MEET_LIST = [
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/23181/photo-1467051989526-23a939d703d8.jpg'
    },
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/17542/photo-1475332432029-9fe0c4461530.jpg'
    },
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/77939/adult.jpeg'
    },
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/75283/art.jpeg'
    },
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/45737/face.jpeg'
    },
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/75005/beautiful.jpeg'
    },
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/47010/face.jpeg'
    },
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/78291/adult.jpeg'
    },
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/82788/adult.jpeg'
    },
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/40639/adult.jpeg'
    },
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/77262/beautiful.jpeg'
    },
    {
        img:'https://d29fhpw069ctt2.cloudfront.net/photo/thumb/75244/attractive.jpeg'
    }
]

export default function CitasPendientes(props){
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const [getList, setGetList] = useState(null);

    useEffect(()=>{
        const getUserFunction = async () => {
            const response = await sendRequest(process.env.REACT_APP_ + 'doctor/')
            setGetList(response)
        }
        getUserFunction()
    },[sendRequest])

    const filterDoctor = getList?.getAllDoctor?.filter(data => {
        return props.getSecondList?.getAllServices?.some(info => info.idDoctor !== data.id)
    })

    console.log({filterDoctor})

    return auth.rol === "638f3ddd1af87455b52cf7d7" ? <div>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Chatea con mas doctores
            </Typography>
            <div>
                {filterDoctor && filterDoctor.map((index, key) => <ActionAreaCard
                    key={key}
                    img={index.img}
                    name={index.name}
                    specialty={index.specialty}
                    isLoggedIn={auth.isLoggedIn}
                    isPacienteLogged={auth.rol === "638f3ddd1af87455b52cf7d7"}
                    onClick={()=>props.onClick(index)}/>)}
            </div>
        </div> :
        <div>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Tus citas pendientes
            </Typography>
            <div>
                {DUMMY_MEET_LIST.map((index,key)=><CardMeet key={key} img={index.img}/>)}
            </div>
        </div>
}