import React, {useState, useContext, useEffect} from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import FilterComponent from '../../components/ConsultaRapidaComponent/FilterComponent';
import CardConsultas from '../../components/ConsultaRapidaComponent/CardConsultas';
import PaginationRounded from '../../components/UIElements/PaginationRounded';
import NestedModal from '../../components/UIElements/NestedModal';
import BasicButtons from '../../components/UIElements/BasicButtons-MUI';

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

export default function ReadConsultaRapida(){
    const [cardClassName, setCardClassName] = useState(true);
    const [modalDeleteCita, setModalDeleteCita] = useState(false);
    const [lessCard, setLessCard] = useState(0);
    const [prevCard, setPrevCard] = useState(6);

    const SeeOrEditData = useContext(AuthContext);

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

    useEffect(()=>{
        setModalDeleteCita(localStorage.modalDeleteCita);
        console.log("modalDeleteCita",modalDeleteCita)
    },[modalDeleteCita])

    const handleClose = () => {
        localStorage.removeItem("modalDeleteCita")
        setModalDeleteCita(false);
    }

    return(
        <>
            <NestedModal
                withButton={false}
                open={modalDeleteCita}
                handleClose={handleClose}
                title="Cita eliminada"
                message="Dulce,la cita que selecciono fue eliminada"
                cancelButton={false}
                buttonOptions={
                    <BasicButtons
                        onClick={handleClose}
                        variantName="contained"
                        buttonName={"Entendido"}
                    />
                }
            />
            <div className='class-GestionarConsultas'>
                <FilterComponent
                    cardClassName={cardClassName}
                    cardOptionFunction={()=>setCardClassName(true)}
                    tableOptionFunction={()=>setCardClassName(false)}
                />
                <div className={ cardClassName === false ? "class-flexDirection" : ""}>
                    {DUMMY_DATA.filter((condition,key)=> ( key >= lessCard && key <= prevCard)).map((item,key)=>(
                        <CardConsultas
                            key={key}
                            img={item.img}
                            alt={item.alt}
                            name={item.name}
                            date={item.date}
                            time={item.time}
                            tipo="Consulta flash"
                            especialidad="Pediatra"
                            estado="Activo"
                            className={cardClassName ? 'class-cardConsulta' : 'class-cardConsulta-table'}
                            seeDetailFunction={()=> SeeOrEditData.setSeeDetailConsultaRapida(true)}
                            editFunction={()=> SeeOrEditData.setEditConsultaRapida(true)}
                        />
                    ))}
                </div>
                <PaginationRounded
                    spacing={2}
                    count={3}
                    handleChange={handleChange}
                />
            </div>
        </>
    )
}