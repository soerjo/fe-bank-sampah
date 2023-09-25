import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    Input,
    Checkbox,
    Typography,
    IconButton,
    // Select,
    Option,
    ButtonGroup,
    Tab,
    Tabs,
    TabsHeader,
} from "@material-tailwind/react";
import Select, { SingleValue } from "react-select";
import { UserPlusIcon } from "./material.tailwind";
import { XCircleIcon } from "@heroicons/react/24/solid";

enum TransactionType {
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw",
}

interface formAddNasabah {
    nasabah_id: string;
    username: string;
    fullname: string;

    transaction_type: TransactionType;

    sampah_id: string;
    sampah_price: number;
    weight: number;
    total_price: number;
    admin_fee: number;
    total: number;
}


export function DialogAddNasabah() {
    const [transactionType, setTransactionType] = React.useState<TransactionType>(
        TransactionType.DEPOSIT
    );
    const [listDataNasabah, setListDataNasabah] = React.useState([]);
    const [listDataSampah, setListDataSampah] = React.useState([]);
    const [search, setsearch] = React.useState({
        searchSampah: "",
        searchNasabah: "",
    });
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [formdata, setformdata] = React.useState({
        nasabah_id: "",
        sampah_id: "",
        weight: 0,
        withdraw: 0,
    });

    const [formResponse, setformResponse] = React.useState({
        total_price: 0,
        admin_fee: 0,
        total: 0,
    });

    const [priceSampah, setpriceSampah] = React.useState({
        priceSampah: 0,
        weight: 0
    });

    const getNasabah = async (
        searchNasabah: string,
        controller: AbortController
    ) => {
        // console.log(first)
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BE_URL}/nasabah?limit=5&search=${searchNasabah}`,
                {
                    signal: controller.signal,
                }
            );
            const datas = await response.json();
            const listData = datas.map((data: any) => ({
                value: data.nasabah_id,
                label: `${data.nasabah_username} | ${data.nasabah_fullname} `,
                data: data
            }));
            setListDataNasabah(listData);
        } catch (error) {
            // console.log("aborted fetch")
        }
    };

    React.useEffect(() => {
        const controller = new AbortController();
        getNasabah(search.searchNasabah, controller);

        return () => controller.abort();
    }, [search.searchNasabah]);

    const getSampah = async (
        searchSampah: string,
        controller: AbortController
    ) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BE_URL}/sampah?limit=5&search=${searchSampah}`,
                {
                    signal: controller.signal,
                }
            );
            const datas = await response.json();
            const listData = datas.map((data: any) => ({
                value: data.id,
                label: `${data.name}/${data.kategory} | Rp ${data.price} (/kg)`,
                data: data
            }));
            setListDataSampah(listData);
        } catch (error) {
            // console.log("aborted fetch")
        }
    };

    React.useEffect(() => {
        const controller = new AbortController();
        getSampah(search.searchSampah, controller);

        return () => controller.abort();
    }, [search.searchSampah]);

    const handleOpen = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BE_URL}/transaction/${transactionType}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formdata),
                }
            );

            if (response.status >= 400) {
                console.log({ response: await response.json() });
                setLoading(false);

                return;
            }

            setLoading(false);
            setOpen(!open);
            return;
        } catch (error) {
            console.log("di abort cuy!", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformdata(prev => ({
            ...prev,
            [String(e.target.id)]: e.target.value,
        }));
    };

    return (
        <>
            <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => setOpen(!open)}
            >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Transcation
            </Button>
            <Dialog
                open={open}
                handler={() => setOpen(!open)}
                className="relative flex flex-col justify-center items-center md:p-8 p-4"
            >
                <div className="py-4 flex flex-col gap-4">
                    <div className="flex flex-col justify-start">
                        <Typography variant="h4" color="blue-gray">
                            Add Transaction
                        </Typography>
                    </div>
                    <form className="w-full max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <div>
                                <label htmlFor="sampah">Nasabah</label>
                                <Select
                                    className="border-1 focus:border-black border-gray-500 rounded-md !z-50"
                                    classNamePrefix="select"
                                    // defaultValue={listDataNasabah[0]}
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={true}
                                    isRtl={false}
                                    isSearchable={true}
                                    name="nasabah"
                                    options={listDataNasabah}
                                    onInputChange={e => {
                                        setsearch(prev => ({ ...prev, searchNasabah: e || "" }));
                                    }}
                                    onChange={(e: SingleValue<{
                                        value: string;
                                        label: string;
                                    }>) => {
                                        setformdata(prev => ({
                                            ...prev,
                                            nasabah_id: e?.value || "",
                                        }));
                                    }}
                                />
                            </div>
                            <Tabs value={TransactionType.DEPOSIT} className="w-full">
                                <TabsHeader>
                                    {[TransactionType.WITHDRAW, TransactionType.DEPOSIT].map(
                                        label => (
                                            <Tab
                                                key={label}
                                                value={label}
                                                onClick={() => setTransactionType(label)}
                                            >
                                                &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                            </Tab>
                                        )
                                    )}
                                </TabsHeader>
                            </Tabs>
                            {transactionType === TransactionType.DEPOSIT && (
                                <>
                                    <div>
                                        <label htmlFor="sampah">Sampah</label>
                                        <Select
                                            className="border-1 focus:border-black border-gray-500 rounded-md "
                                            classNamePrefix="select"
                                            // defaultValue={listDataSampah[0]}
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={true}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="sampah"
                                            id="sampah"
                                            options={listDataSampah}
                                            onInputChange={e => {
                                                setsearch(prev => ({ ...prev, searchSampah: e || "" }));
                                            }}
                                            onChange={(e: SingleValue<{
                                                value: string;
                                                label: string;
                                                data: any
                                            }>) => {
                                                setpriceSampah(prev => ({ ...prev, priceSampah: e?.data?.price }))
                                                setformdata(prev => ({ ...prev, sampah_id: e?.value || "" }));
                                                setformResponse({
                                                    total_price: e?.data?.price * Number(priceSampah.weight || 0),
                                                    admin_fee: e?.data?.price * Number(priceSampah.weight || 0) * 25 / 100,
                                                    total: e?.data?.price * Number(priceSampah.weight || 0) - (e?.data?.price * Number(priceSampah.weight || 0) * 25 / 100)
                                                })

                                            }}
                                        />
                                    </div>

                                    <Input
                                        size="lg"
                                        label="weight (kg)"
                                        id="weight"
                                        type="number"
                                        crossOrigin={undefined}
                                        onChange={(e) => {
                                            setformdata(prev => ({ ...prev, weight: Number(e.target.value || 0) }))
                                            setpriceSampah(prev => ({ ...prev, weight: Number(e.target.value || 0) }))
                                            setformResponse({
                                                total_price: priceSampah.priceSampah * Number(e.target.value || 0),
                                                admin_fee: priceSampah.priceSampah * Number(e.target.value || 0) * 25 / 100,
                                                total: priceSampah.priceSampah * Number(e.target.value || 0) - (priceSampah.priceSampah * Number(e.target.value || 0) * 25 / 100)
                                            })
                                        }}
                                    />
                                    <Input
                                        size="lg"
                                        readOnly
                                        label="total_price"
                                        id="total_price"
                                        type="number"
                                        value={formResponse.total_price}
                                        crossOrigin={undefined}
                                    />
                                    <Input
                                        size="lg"
                                        readOnly
                                        label="admin_fee"
                                        id="admin_fee"
                                        type="number"
                                        value={formResponse.admin_fee}
                                        crossOrigin={undefined}
                                    />
                                    <Input
                                        size="lg"
                                        readOnly
                                        label="total"
                                        id="total"
                                        type="number"
                                        value={formResponse.total}
                                        crossOrigin={undefined}
                                        datatype="currence"
                                        className="!font-bold !text-base"
                                    />
                                </>
                            )}

                            {transactionType === TransactionType.WITHDRAW && (
                                <>
                                    <Input
                                        onChange={handleChange}
                                        size="lg"
                                        label="withdraw"
                                        id="withdraw"
                                        type="number"
                                        crossOrigin={undefined}
                                    />
                                </>
                            )}
                        </div>

                        <Button
                            disabled={loading}
                            className="mt-6"
                            fullWidth
                            onClick={handleOpen}
                        >
                            Add Transaction
                        </Button>
                    </form>
                </div>
            </Dialog>
        </>
    );
}
