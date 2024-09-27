const NewLetterFrom = () => {
    return(
        <>
            <div className="row">
                <div className="col-md-4  offset-md-4">
                  <h2 className="text-slate-900">Subscribe to Newsletter</h2>
                  <form>
                    <input className="form-control fs-8" name="" type="email" placeholder="Enter your email address"/>
                    <button type="" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-gray-300 disabled:text-gray-500 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-700 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 w-full mt-4">Subscribe Now</button>
                  </form>
                </div>
            </div>
            

        </>
    )
}

export default NewLetterFrom;