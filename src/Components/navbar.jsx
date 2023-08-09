import { Link, NavLink } from "react-router-dom";

export default function navbar(params) {
    return <>
    <div className="w-100 bg-slate-300 px-10 py-3">
        <div className="flex justify-between w-full">
            <h1>Navbar</h1>
            <div className="flex gap-4">
                <Link to='/login'>Login</Link>
                <NavLink to='/register'>Register</NavLink>
            </div>
        </div>
        
    </div>
    {params.children}
    </>
};
