import { Link } from "react-router-dom";
import AppLink from "./AppLink";

export default function NavPanel() {
  return (
    <div className="w-full h-[75px] border-b border-zinc-900 flex absolute">
        <div>
            test
        </div>
        <div className="flex items-center justify-end grow p-4">
            <AppLink authType={'redirectLogin'}>login</AppLink>
            <AppLink authType={'redirectRegister'}>register</AppLink>
            <Link to='/home'>Home</Link>
        </div>
    </div>
  )
}
