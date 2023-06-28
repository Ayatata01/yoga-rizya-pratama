import Logo from "./Logo";

export default function Header(props) {
    return (
        <header className="sticky top-0 z-10 shadow bg-white">
            <div className="container mx-auto p-3 flex justify-between">
                <Logo />
                <a onClick={() => props.signout()} className='bg-[#3C37FF] p-2 w-fit text-white rounded-md hover:bg-[#2c25f1] text-[12px] duration-200 font-poppins' href="/">Sign out</a>
            </div>
        </header>
    );
}
