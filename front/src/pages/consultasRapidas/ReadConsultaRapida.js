import React, {useState} from 'react';
import FilterComponent from '../../components/ConsultaRapidaComponent/FilterComponent';
import CardConsultas from '../../components/ConsultaRapidaComponent/CardConsultas';
import PaginationRounded from '../../components/UIElements/PaginationRounded';

const DUMMY_DATA = [
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega0",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega1",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega2",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega3",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega4",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega5",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega6",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega7",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega8",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega9",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega10",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega11",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega12",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega13",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega14",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega15",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega16",
        date:"08/08/2022",
        time:"2:00pm"
    },
    {
        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__480.jpg",
        alt:"img-client",
        name:"Juan Ortega17",
        date:"08/08/2022",
        time:"2:00pm"
    },
]

console.log("DUMMY_DATA",DUMMY_DATA)

export default function ReadConsultaRapida(){
    const [lessCard, setLessCard] = useState(0);
    const [prevCard, setPrevCard] = useState(6);

    const handleChange = (event, value) => {
        setLessCard(
            value === 1 ? 0 :
            value === 2 ? 6 :
            value === 3 ? 12 : 0
        );
        setPrevCard(
            value === 1 ? 6 :
            value === 2 ? 12 :
            value === 3 ? 18 : 0
        );
    };

    return(
        <div className='class-GestionarConsultas'>
            <FilterComponent/>
            <div>
                {DUMMY_DATA.filter((condition,key)=> ( key >= lessCard && key <= prevCard)).map((item,key)=>(
                    <CardConsultas
                        key={key}
                        img={item.img}
                        alt={item.alt}
                        name={item.name}
                        date={item.date}
                        time={item.time}
                        seeDetailFunction={()=>{}}
                        editFunction={()=>{}}
                    />
                ))}
            </div>
            <PaginationRounded
                spacing={2}
                count={3}
                handleChange={handleChange}
            />
        </div>
    )
}