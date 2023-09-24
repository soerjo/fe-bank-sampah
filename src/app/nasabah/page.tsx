import React from 'react'
import NasabahTable from '@/components/NasabahTable/indext'

const BE_URL = 'http://localhost:3000'

const fetchNasabah = async () => {
  const responseFetchNasabah = await fetch(`${BE_URL}/nasabah?limit=100`)
  const response = await responseFetchNasabah.json()

  return response
}

const NasabahPage = async () => {
  const listNasabah = await fetchNasabah()

  return (
    <div className='relative h-full flex flex-col justify-center gap-3'>
      <h1 className='text-2xl font-semibold pt-4 text-left'>Nasabah</h1>
      <NasabahTable data_nasabah={listNasabah} />
    </div>
  )
}

export default NasabahPage