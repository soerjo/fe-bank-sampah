"use client";

import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { DefaultPagination } from "../Pagination";

export interface INasabah {
    id: string,
    name: string,
    kategory: string,
    price: number,
    created_time: number,
    created: Date
}

const TABLE_HEAD = [
    "sampah_id",
    "sampah_name",
    "sampah_kategory",
    "sampah_price(/kg)",
    "sampah_created",
];

interface ISampahTable {
    data_nasabah: INasabah[];
}

const SampahTable: React.FC<ISampahTable> = ({ data_nasabah }) => {
    return (
        <>
            {/* <h1 className='text-2xl font-semibold text-left'>Sampah</h1> */}
            <Card className="w-full h-5/6 overflow-auto">
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
                                        className="font-normal capitalize"
                                    >
                                        {nasabah?.id}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal capitalize"
                                    >
                                        {nasabah?.name}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {nasabah?.kategory}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        Rp {Number(nasabah?.price).toLocaleString("en-US")}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {new Date(nasabah?.created).toLocaleString()}
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

export default SampahTable;
