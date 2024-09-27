import React from "react";
const SearchFrom = () => {
 return(
    <>
        <section className="seachform">
            <div className="container">
                <form>
                    <div className="row p-6">
                        <div className="col-7">
                            <input type="text" className="rounded-md border border-defaultSlate-300 bg-white px-3 py-2 text-sm" placeholder="Enter skills /"/>
                        </div>
                        <div className="col-2">
                            <input type="text" className="rounded-md border border-defaultSlate-300 bg-white px-3 py-2 text-sm" placeholder="designations /"/>
                        </div>
                        <div className="col-2">
                            <input type="text" className="rounded-md border border-defaultSlate-300 bg-white px-3 py-2 text-sm" placeholder="companies Select experience Enter location Search"/>
                        </div>
                        <div className="col-1">
                            <input type="submit" className="rounded-md border border-defaultSlate-300 bg-white px-3 py-2 text-sm" />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </>
 )
}

export default SearchFrom;