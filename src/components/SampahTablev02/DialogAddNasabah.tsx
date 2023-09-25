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
} from "@material-tailwind/react";
import { UserPlusIcon } from "./material.tailwind";
import { XCircleIcon } from "@heroicons/react/24/solid";

interface formAddNasabah {
    username: string;
    fullname: string;
    phone: string;
    rt: string;
    rw: string;
}

export function DialogAddNasabah({ reaload }: { reaload: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [formdata, setformdata] = React.useState({
        username: "",
        fullname: "",
        phone: "",
        rt: "",
        rw: "",
    });

    const handleOpen = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/nasabah`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata),
            });

            if (response.status > 400) {
                console.log({ response: response.json() })
                setLoading(false)

                return;
            }

            setLoading(false)
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

            <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => setOpen(!open)}
            >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add sampah
            </Button>
            <Dialog
                open={open}
                handler={() => setOpen(!open)}
                className="relative flex flex-col justify-center items-center md:p-8 p-4"
            >
                <div className="py-4 flex flex-col gap-4">
                    <div className="flex flex-col justify-start">
                        <Typography variant="h4" color="blue-gray">
                            Add Sampah
                        </Typography>
                    </div>
                    <form className="w-full max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <Input
                                onChange={handleChange}
                                size="lg"
                                label="sampah name"
                                id="sampah name"
                                crossOrigin={undefined}
                            />
                            <Input
                                onChange={handleChange}
                                size="lg"
                                label="sampah category"
                                id="sampah category"
                                crossOrigin={undefined}
                            />
                            <Input
                                onChange={handleChange}
                                size="lg"
                                label="sampah price (/kg)"
                                id="sampah price (/kg)"
                                crossOrigin={undefined}
                            />
                        </div>

                        <Button disabled={loading} className="mt-6" fullWidth onClick={handleOpen}>
                            Add Sampah
                        </Button>
                    </form>
                </div>
            </Dialog>
        </>
    );
}
