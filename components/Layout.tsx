import Header from "./Header";
import {ReactNode} from "react";

type LayoutProp = {
    children: ReactNode,
}

export default function ({ children }: LayoutProp) {
    return(
        <>
            <Header />
            <main className="h-[calc(100vh-70px)]">{children}</main>
        </>
    )
}