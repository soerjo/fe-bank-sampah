import React from 'react'
import NasabahTablev02 from '@/components/NasabahTablev02'


const NasabahPage = async () => {

  return (
    // <div className='relative h-full flex flex-col justify-center gap-3'>
    //   <h1 className='text-2xl font-semibold'>Nasabah</h1>
    //   <NasabahTable data_nasabah={listNasabah} />
    // </div>
    <div className='h-full flex justify-center items-center py-8'>
      <NasabahTablev02 />
    </div>
  )
}

export default NasabahPage