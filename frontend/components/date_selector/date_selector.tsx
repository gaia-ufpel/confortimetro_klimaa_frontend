import React, { useState, useEffect } from 'react'

const Date_selector = (props: any) => {
    var [date, setDate] = useState(null);
    useEffect(() => {
        if(date){
            props.handleCallback(`${props.id}`, date)
        }
    }, [date])
    return (
        <div className='grid'>
            <label htmlFor={`${props.id}`}>{`${props.text}`}</label>
            <input id={`${props.id}`} type="date" onChange={(ev: any) => { setDate(ev?.target.value); }} />
        </div>
    )
}

export default Date_selector