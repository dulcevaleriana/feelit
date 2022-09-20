import React from 'react';

const SelectSubComponent = props => {
    return <select
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}>
        {props.selectOptions.map((elem,key)=>(
            <option key={key} value={elem}>{elem}</option>
        ))}
    </select>
}

const TextareaSubComponent = props => {
    return <textarea
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        cols={props.cols || 30}
        rows={props.rows || 10}>
            {props.placeholder}
    </textarea>
}

const InputComponent = (props) => {
    const validateElement = props.elementType === 'input' ? <input id={props.id} type={props.type} placeholder={props.placeholder}/> :
                            props.elementType === 'textarea' ? <TextareaSubComponent {... props}/> :
                            props.elementType === 'select' ? <SelectSubComponent {... props}/> : null;
    return <div className={`class-input ${props.className}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {validateElement}
    </div>
}

export default InputComponent;