import React from "react";

interface Props {
    children: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
    return <div className="container mx-auto m-4">{children}</div>;
};

export default BaseLayout;
