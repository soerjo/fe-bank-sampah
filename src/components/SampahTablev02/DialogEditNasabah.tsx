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
    Tooltip,
} from "@material-tailwind/react";
import { UserPlusIcon } from "./material.tailwind";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/outline";

interface formtNasabah {
    id: string,
    name: string,
    kategory: string,
    price: number,
    created_time: string,
    created: Date
}

export function DialogEditNasabah({ nasabah, reaload }: { nasabah: formtNasabah, reaload: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [formdata, setformdata] = React.useState(nasabah);

    const handleOpen = async () => {
        try {
            setLoading(true);
            console.log({ formdata })
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BE_URL}/sampah/${nasabah.id}`,
                {
                    method: "PATCH",
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
            reaload(prev => !prev)
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
            <Tooltip content="Edit User">
                <IconButton variant="text" onClick={() => setOpen(!open)}>
                    <PencilIcon className="h-4 w-4" />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                handler={() => setOpen(!open)}
                className="relative flex flex-col justify-center items-center  md:p-8 p-4"
            >
                <div className="hover:cursor-pointer bg-black">
                    <XCircleIcon className="bg-black" />
                </div>

                <div className="py-4 flex flex-col gap-4">
                    <div className="flex flex-col justify-start">
                        <Typography variant="h4" color="blue-gray">
                            Edit Sampah
                        </Typography>
                    </div>
                    <form className="w-full max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <Input
                                value={formdata.name}
                                onChange={handleChange}
                                size="lg"
                                label="sampah name"
                                id="name"
                                crossOrigin={undefined}
                            />
                            <Input
                                value={formdata.kategory}
                                onChange={handleChange}
                                size="lg"
                                label="sampah category"
                                id="kategory"
                                crossOrigin={undefined}
                            />
                            <Input
                                value={formdata.price}
                                onChange={handleChange}
                                size="lg"
                                label="sampah price (/kg)"
                                id="price"
                                crossOrigin={undefined}
                            />
                        </div>

                        <Button
                            disabled={loading}
                            className="mt-6"
                            fullWidth
                            onClick={handleOpen}
                        >
                            Edit Sampah
                        </Button>
                    </form>
                </div>
            </Dialog>
        </>
    );
}
