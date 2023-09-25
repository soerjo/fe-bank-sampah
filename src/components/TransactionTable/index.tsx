"use client";

import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { DefaultPagination } from "../Pagination";

export interface ITransaction {
    transaction_id: string,
    transaction_transaction_type: string,
    transaction_sampah_name: string,
    transaction_sampah_category: string,
    transaction_sampah_price: number,
    transaction_weight: number,
    transaction_total_sampah_price: number,
    transaction_admin_fee: number,
    transaction_total_transaction: number,
    transaction_created_time: number,
    transaction_created: Date,
    transaction_updated: Date,
    transaction_nasabahId: string,
    nasabah_id: string,
    nasabah_username: string,
    nasabah_fullname: string,
    nasabah_phone: string,
    nasabah_rt: string,
    nasabah_rw: string,
    nasabah_created: Date,
    nasabah_updated: Date
}

const TABLE_HEAD = [
    "date",
    "transaction_type",
    "nasabah_username",
    "nasabah_fullname",
    "nasabah_phone",
    "sampah_name",
    "sampah_category",
    "sampah_price",
    "sampah_weight",
    "sampah_total_price",
    "transaction_admin_fee",
    "transaction_total"
];

interface ITransactionTable {
    data_transaction: ITransaction[];
}

const TransactionTable: React.FC<ITransactionTable> = ({ data_transaction }) => {
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
                        {data_transaction.map((transaction, index) => (
                            <tr key={index} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal "
                                    >
                                        {new Date(transaction?.transaction_created).toLocaleString()}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {transaction?.transaction_transaction_type}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {transaction?.nasabah_username}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {transaction?.nasabah_fullname}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {transaction?.nasabah_phone}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {transaction?.transaction_sampah_name}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {transaction?.transaction_sampah_category}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        Rp {Number(transaction?.transaction_sampah_price).toLocaleString("en-US")}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {transaction?.transaction_weight}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        Rp {Number(transaction?.transaction_total_sampah_price).toLocaleString("en-US")}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        Rp {Number(transaction?.transaction_admin_fee).toLocaleString("en-US")}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        Rp {Number(transaction?.transaction_total_transaction).toLocaleString("en-US")}
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

export default TransactionTable;
