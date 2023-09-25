"use client";

import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { DefaultPagination } from "../Pagination";

export interface INasabah {
    balance_id: string;
    balance_total_transaction: number;
    balance_total_balance: number;
    balance_created: Date;
    balance_updated: Date;
    balance_nasabahId: string;
    nasabah_id: string;
    nasabah_username: string;
    nasabah_fullname: string;
    nasabah_phone: string;
    nasabah_rt: string;
    nasabah_rw: string;
    nasabah_created: Date;
    nasabah_updated: Date;
}

const TABLE_HEAD = [
    "nasabah_id",
    "username",
    "fullname",
    "phone",
    "rt",
    "rw",
    "total_transaction",
    "total_balance",
];

interface INasabahTable {
    data_nasabah: INasabah[];
}

const NasabahTable: React.FC<INasabahTable> = ({ data_nasabah }) => {
    return (
        <>
            <Card className="w-full h-4/6 overflow-auto">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map(head => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70 capitalize"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data_nasabah.map((nasabah, index) => (
                            <tr key={index} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {nasabah.nasabah_id}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {nasabah.nasabah_username}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal capitalize"
                                    >
                                        {nasabah.nasabah_fullname}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {nasabah.nasabah_phone}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {nasabah.nasabah_rt}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {nasabah.nasabah_rw}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {nasabah.balance_total_transaction}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        Rp {Number(nasabah.balance_total_balance).toLocaleString("en-US")}
                                    </Typography>
                                </td>
                                {/* <td className="p-4">
                                <Typography
                                    as="a"
                                    href="#"
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium"
                                >
                                    Edit
                                </Typography>
                            </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            <DefaultPagination />
        </>
    );
};

export default NasabahTable;
