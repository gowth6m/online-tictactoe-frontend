"use client";

import React from "react";
import { Toaster, ToasterProps } from "react-hot-toast";

// --------------------------------------------------

interface Props extends ToasterProps {}

const CoreToaster: React.FC<Props> = ({ ...props }) => {
    return (
        <Toaster
            containerStyle={{
                zIndex: "9999 !important",
            }}
            toastOptions={{
                className: "react-hot-toast",
                style: {
                    width: "360px",
                    zIndex: "9999 !important",
                },
                success: {
                    style: {
                        background: "#2c3e50",
                        color: "#ecf0f1",
                    },
                },
                error: {
                    style: {
                        background: "#c0392b",
                        color: "#ecf0f1",
                    },
                },
            }}
            position="top-center"
            {...props}
        />
    );
};

export default CoreToaster;
