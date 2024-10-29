import React from 'react'
import { TbRefresh } from "react-icons/tb";

const RefreshButton = ({ applyWhenClick }: { applyWhenClick: Function }) => {
    return (
        <button onClick={() => applyWhenClick()} className='relative text-white text-center'>
            <p className="bg-yellow-500 hover:bg-yellow-600 font-bold md:py-2 md:px-4 rounded invisible md:visible">RECARREGAR</p>
            <TbRefresh className='absolute bg-yellow-500 hover:bg-yellow-600 rounded visible md:invisible w-8 h-8' />
        </button>
    )
}

export default RefreshButton