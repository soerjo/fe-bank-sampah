import SampahTable from '@/components/SampahTable'
import React from 'react'

const BE_URL = 'http://localhost:3000'

const fetchSampah = async () => {
    const responseFetchSampah = await fetch(`${BE_URL}/sampah?limit=100`)
    const response = await responseFetchSampah.json()

    console.log({ response })

    return response
}

const SampahPage = async () => {
    const listNasabah = await fetchSampah()

    return (
        <div className='relative h-full flex flex-col justify-center gap-3'>
            <h1 className='font-semibold text-2xl'>List Sampah</h1>
            <SampahTable data_nasabah={listNasabah} />
        </div>

    )
}

export default SampahPage