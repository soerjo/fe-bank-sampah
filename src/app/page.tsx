import NavbarComponent from '@/components/Navbar'
import SortableTable from '@/components/TransactionTablev02'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='h-full flex justify-center items-center py-8'>
      {/* <SortableTable /> */}
      <Image src={"/images/g12.svg"} alt='managemen_image' width={600} height={600} />
    </div>
  )
}
