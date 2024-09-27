import React from "react";
const TestimonialCard = () =>{
    return(
        <>
        <div className="col testi_card bg-white text-slate-950 shadow dark:bg-slate-950 dark:text-slate-50 rounded-xl max-w-[290px]">
            <div className="p-5">
                <div></div>
                <h6 className="">Customer Testimonial</h6>
                <div className="text-gray-400 text-xs font-light leading-tight overflow-hidden line-clamp-4">
                    Try this: go to any page on your website and count the marketing claims you make. How many times is your business described as easy, smart, effective, trusted.
                </div>
                <div className="testi_bottom">
                    <h6>Veterans</h6>
                    <div>Share</div>
                </div>
            </div>
        </div>
        </>
    )
}
export default TestimonialCard;