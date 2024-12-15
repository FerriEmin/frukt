import { ReactElement } from "react";
import SignupForm from "./components/SignupForm";

export default async function page (): Promise<ReactElement> {
    return <div className="flex flex-col items-center justify-center h-screen">
        <SignupForm />
    </div>
}