import React from 'react';
import Typography from '@mui/material/Typography';
import CardConsultas from '../UIElements/CardConsultas';
import { Link } from "react-router-dom";

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

export default function UltimasConsultas(){
    return <div>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Ultimas consultas
        </Typography>
        <div>
            {DUMMY_MEET_LIST.filter((index,key)=>key <= 6).map((index,key)=><CardConsultas key={key} img={index.img}/>)}
            <Link to="/">Ver más</Link>
        </div>
    </div>
}