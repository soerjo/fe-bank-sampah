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
    username: string;
    fullname: string;
    phone: string;
    rt: string;
    rw: string;
}

export function DialogEditNasabah({ nasabah, reload }: { nasabah: formtNasabah, reload: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [formdata, setformdata] = React.useState(nasabah);

    const handleOpen = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BE_URL}/nasabah/${nasabah.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formdata),
                }
            );

            if (response.status > 400) {
                console.log({ response: response.json() });
                setLoading(false);

                return;
            }

            setLoading(false);
            setOpen(!open);
            reload(prev => !prev)
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
                            Edit Nasabah
                        </Typography>
                    </div>
                    <form className="w-full max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <Input
                                value={formdata.username}
                                onChange={handleChange}
                                size="lg"
                                label="username"
                                id="username"
                                crossOrigin={undefined}
                            />
                            <Input
                                value={formdata.fullname}
                                onChange={handleChange}
                                size="lg"
                                label="fullname"
                                id="fullname"
                                crossOrigin={undefined}
                            />
                            <Input
                                value={formdata.phone}
                                onChange={handleChange}
                                size="lg"
                                label="phone"
                                id="phone"
                                crossOrigin={undefined}
                            />
                            <div className="flex items-center gap-4">
                                <Input
                                    value={formdata.rt}
                                    onChange={handleChange}
                                    size="lg"
                                    label="rt"
                                    id="rt"
                                    crossOrigin={undefined}
                                    containerProps={{ className: "min-w-[72px]" }}
                                />
                                <Input
                                    value={formdata.rw}
                                    onChange={handleChange}
                                    size="lg"
                                    label="rw"
                                    id="rw"
                                    crossOrigin={undefined}
                                    containerProps={{ className: "min-w-[72px]" }}
                                />
                            </div>
                        </div>

                        <Button
                            disabled={loading}
                            className="mt-6"
                            fullWidth
                            onClick={handleOpen}
                        >
                            Edit Nasabah
                        </Button>
                    </form>
                </div>
            </Dialog>
        </>
    );
}
