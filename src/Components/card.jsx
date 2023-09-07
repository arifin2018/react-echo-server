export default function card(params) {
    return (
        <>
            <div className="p-3 w-full md:w-3/12 rounded-lg">
                {/* <img src="https://picsum.photos/500/300" alt="random" className="object-fill rounded-t-lg"/> */}
                <div className="bg-slate-400 px-3 py-2 space-y-2 rounded-lg">
                    {params.loginForm}
                </div>
            </div>
        </>
    )
};
