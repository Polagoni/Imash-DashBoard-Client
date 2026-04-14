import LogOut from "../(user)/logout"
import Link from "next/link";
const SideNavBar = () => {
    return (
        <>
            <div className="flex flex-col justify-between  border min-w-[200px] h-screen pl-3">
                <div className="flex flex-col gap-5">

                    <img src="/imashLogo.png" alt="logo" className="w-32 h-auto pt-4" />


                    <ul className="flex flex-col gap-4 pt-5">
                        <li>
                            dashboard
                        </li>

                    </ul>
                </div>
                <div className="flex justify-center items-center pb-6">
                    <LogOut />
                </div>

            </div>
        </>
    )
}
export default SideNavBar