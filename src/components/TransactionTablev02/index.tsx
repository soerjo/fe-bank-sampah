"use client";

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
    CalendarDaysIcon,
} from "./material.tailwind";
import { useInView } from "framer-motion";
import { Chip, Spinner } from "@material-tailwind/react";
import { DialogAddNasabah } from "./DialogAddNasabah";
import { DialogEditNasabah } from "./DialogEditNasabah";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
    },
];

export interface IData {
    nasabah_created: string;
    nasabah_fullname: string;
    nasabah_id: string;
    nasabah_phone: string;
    nasabah_rt: string;
    nasabah_rw: string;
    nasabah_updated: string;
    nasabah_username: string;
    transaction_admin_fee: number;
    transaction_created: Date;
    transaction_created_time: number;
    transaction_id: string;
    transaction_nasabahId: string;
    transaction_sampah_category: string;
    transaction_sampah_name: string;
    transaction_sampah_price: number;
    transaction_total_sampah_price: number;
    transaction_total_transaction: number;
    transaction_transaction_type: string;
    transaction_updated: Date;
    transaction_weight: number;
}

const TABLE_HEAD = [
    "date",
    "transaction_type",
    "nasabah",
    // "nasabah_fullname",
    "nasabah_phone",
    "sampah",
    // "sampah_category",
    // "sampah_price(/kg)",
    "sampah_weight(kg)",
    "total_price",
    "admin_fee",
    "total_transaction",
];

export default function SortableTable() {
    const [search, setsearch] = React.useState("");
    const [listNasabah, setlistNasabah] = React.useState<IData[] | null>();
    // const ref = React.useRef(null)
    // const isInView = useInView(ref)

    React.useEffect(() => {
        const controller = new AbortController();
        async function fetchData(search: string) {
            try {
                const fetch_nasabah = await fetch(
                    `${process.env.NEXT_PUBLIC_BE_URL}/transaction?search=${search}`,
                    {
                        signal: controller.signal,
                    }
                );

                const response: IData[] = await fetch_nasabah.json();
                console.log({ response });
                setlistNasabah(response);
            } catch (error) {
                console.log("di abort cuy!", error);
            }
        }
        fetchData(search);
        return () => controller.abort();
    }, [search]);

    return (
        <Card className="h-full w-full p-4 shadow-lg flex flex-col">
            <div className="rounded-none pt-2">
                <div className="mb-2 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Transaction list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all transaction
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        {/* <Button variant="outlined" size="sm">
                            view all
                        </Button> */}
                        <DialogAddNasabah />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
                    {/* <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs> */}
                    <div className="w-full md:w-72">
                        <Input
                            onChange={e => setsearch(e.target.value)}
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            crossOrigin={undefined}
                        />
                    </div>
                </div>
                {/* <div className="w-full h-[50px]"></div> */}
            </div>
            <CardBody className="overflow-auto p-0 mt-4 flex-initial">
                {!listNasabah && (
                    <div className="flex gap-2 py-2">
                        <Spinner /> loading...
                    </div>
                )}

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
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize"
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
                        {listNasabah &&
                            listNasabah.map((nasabah, index) => {
                                const isLast = index === listNasabah.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {new Date(nasabah.transaction_created).toLocaleString()}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={nasabah.transaction_transaction_type}
                                                    color={
                                                        nasabah.transaction_transaction_type ===
                                                            "DEPOSIT/TABUNG"
                                                            ? "blue"
                                                            : "teal"
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={
                                                        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg"
                                                    }
                                                    alt={"gambar_orang"}
                                                    size="sm"
                                                />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {nasabah.nasabah_username}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {nasabah.nasabah_fullname}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {nasabah.nasabah_phone}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            {nasabah.transaction_sampah_name === "-" ? (
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal text-center"
                                                >
                                                    {"-"}
                                                </Typography>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {`${nasabah.transaction_sampah_name} / ${nasabah.transaction_sampah_category}`}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {`Rp ${Number(
                                                                nasabah.transaction_sampah_price
                                                            ).toLocaleString("en-US")} / kg`}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal text-center"
                                            >
                                                {nasabah.transaction_sampah_name === "-" ? "-" : `${nasabah.transaction_weight} kg`}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal text-center"
                                            >
                                                {nasabah.transaction_sampah_name === "-" ? "-" : `Rp ${Number(nasabah.transaction_total_sampah_price).toLocaleString("en-US")}`}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal text-center"
                                            >
                                                {nasabah.transaction_sampah_name === "-" ? "-" : `Rp ${Number(nasabah.transaction_admin_fee).toLocaleString("en-US")}`}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal text-center"
                                            >
                                                {`Rp ${Number(nasabah.transaction_total_transaction).toLocaleString("en-US")}`}
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
                                        {/* <td className={classes}>
                                        <div className="flex justify-center items-center gap-4">
                                            <Link href={`/transaction/${nasabah.id}`}>
                                                <Tooltip content="History transaction">
                                                    <IconButton variant="text">
                                                        <CalendarDaysIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                            <DialogEditNasabah nasabah={nasabah} />


                                        </div>
                                    </td> */}
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
