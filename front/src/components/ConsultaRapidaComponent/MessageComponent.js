import React from "react";
import ImageDefaultMessage from "../../Image/undraw_through_the_park_lxnl.png";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";

export default function MessageComponent(props){
    return (
        <div>
            <img src={ImageDefaultMessage} alt="default"/>
            <h4>Felicidades, haz dado el primer paso a la decisión mas importante de tu vida</h4>
            <h5>sfgsjdgfksajgfkasgfkasgfgafgakgfjagkfgakfgkagfkjagfkjagkfgakhfgsfgsjdgfksajgfkasgfkasgfgafgakgfjagkfgakfgkagfkjagfkjagkfgakhfgsfgsjdg</h5>
            <a href="https://github.com/dulcevaleriana/blog-practice/43466436467767">
                https://github.com/dulcevaleriana/blog-practice/43466436467767
            </a>
            <BasicButtons
                onClick={()=>props.onClick()}
                variantName="contained"
                buttonName={"Iniciar cita"}
                iconName={""}
            />
        </div>
    )
}