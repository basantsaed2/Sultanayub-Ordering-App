import React from 'react'
import { PulseLoader } from 'react-spinners'

const StaticSpinner = () => {
       return (
              <>
                     <div className='w-full h-full flex justify-center items-center'>
                            <PulseLoader color='#e7020a' size={20} />
                     </div>
              </>
       )
}

export default StaticSpinner