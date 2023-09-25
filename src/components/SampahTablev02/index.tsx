'use client'

import React from "react";
import Link from "next/link";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    PencilIcon,
    UserPlusIcon,
    Card,
    Input,
    Typography,
    Button,
    CardBody,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    CalendarDaysIcon
} from "./material.tailwind";
import { useInView } from "framer-motion"
import { Spinner } from "@material-tailwind/react";
import { DialogAddNasabah } from "./DialogAddNasabah";
import { DialogEditNasabah } from "./DialogEditNasabah";

const TABS = [
    {
        label: "LH",
        value: "lh",
    },
    {
        label: "Pengepul A",
        value: "Pengepul A",
    },
    {
        label: "Pengepul B",
        value: "Pengepul B",
    },
];

export interface INasabah {
    id: string,
    name: string,
    kategory: string,
    price: number,
    created_time: string,
    created: Date
}

const TABLE_HEAD = [
    // "sampahh_id",
    "sampah_name",
    "sampah_category",
    "sampah_price(/kg)",
    // "sampah_created",
    "action"
];

export default function SortableTable() {
    const [reload, setreload] = React.useState(false)
    const [search, setsearch] = React.useState('')
    const [listNasabah, setlistNasabah] = React.useState<INasabah[] | null>()
    // const ref = React.useRef(null)
    // const isInView = useInView(ref)

    React.useEffect(() => {
        const controller = new AbortController()
        async function fetchData(search: string) {
            try {
                const fetch_nasabah = await fetch(
                    `${process.env.NEXT_PUBLIC_BE_URL}/sampah?search=${search}`, {
                    signal: controller.signal,
                }
                );
                const response: INasabah[] = await fetch_nasabah.json();
                setlistNasabah(response)
            } catch (error) {
                console.log("di abort cuy!", error)
            }

        }
        fetchData(search)
        return () => controller.abort()
    }, [search, reload])

    return (
        <Card className="h-full w-full p-4 shadow-lg flex flex-col">
            <div className="rounded-none pt-2">
                <div className="mb-2 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Sampah list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all sampah
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        {/* <Button variant="outlined" size="sm">
                            view all
                        </Button> */}
                        <DialogAddNasabah reaload={setreload} />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="lh" className="w-full md:w-1/3">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={label} value={value} className="whitespace-nowrap">

                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            onChange={(e) => setsearch(e.target.value)}
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            crossOrigin={undefined}
                        />
                    </div>
                </div>
                {/* <div className="w-full h-[50px]"></div> */}
            </div>
            <CardBody className="overflow-auto p-0 mt-4 flex-initial">
                {!listNasabah && <div className="flex gap-2 py-2"><Spinner /> loading...</div>}

                <table className="relative w-full min-w-max table-auto text-left">
                    <thead className="sticky top-0 z-50 bg-white">
                        <tr className="">
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer  bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}{" "}
                                        {index !== TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {listNasabah && listNasabah.map((nasabah, index) => {
                            const isLast = index === listNasabah.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    {/* <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {nasabah.id}
                                        </Typography>
                                    </td> */}
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {nasabah.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {nasabah.kategory}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-center"
                                        >
                                            {`Rp ${nasabah.price.toLocaleString("en-US")} / kg`}
                                        </Typography>
                                    </td>
                                    {/* <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-center"
                                        >
                                            {new Date(nasabah.created).toLocaleString()}
                                        </Typography>
                                    </td> */}
                                    <td className={classes}>
                                        <div className="flex justify-center items-center gap-4">
                                            {/* <Link href={`/transaction/${nasabah.id}`}>
                                                <Tooltip content="History transaction">
                                                    <IconButton variant="text">
                                                        <CalendarDaysIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Link> */}
                                            <DialogEditNasabah nasabah={nasabah} reaload={setreload} />


                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            {/* <div className="flex items-center justify-between border-t border-blue-gray-50 h-fit py-4 px-2">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </div> */}
        </Card>
    );
}
