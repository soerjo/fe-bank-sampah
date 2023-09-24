import React from 'react'
import TransactionTable from '@/components/TransactionTable'

const BE_URL = 'http://localhost:3000'

const fetchSampah = async () => {
    const responseFetchSampah = await fetch(`${BE_URL}/transaction?limit=100`)
    const response = await responseFetchSampah.json()

    // console.log({ response })

    return response
}

const SampahPage = async () => {
    const listNasabah = await fetchSampah()

    return (
        <div className='relative h-full flex flex-col justify-center gap-3'>
            <h1 className='text-2xl font-semibold pt-4 text-left mb-4'>Transaction</h1>
            <TransactionTable data_transaction={listNasabah} />
        </div>
    )
}

export default SampahPage