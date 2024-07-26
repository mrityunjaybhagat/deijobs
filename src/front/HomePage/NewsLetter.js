import React from "react";
import Slider from "react-slick";

const NewsLetter = () =>{
    return(
        <>
            <section className="bg-slate-50 py-[60px] px-5">
                <div className="container">
                    <h2 className="text-2xl text-center">NEWSLETTER</h2>
                    <p className="text-lg">Join the community of job seekers and stay connected with a range of topics and aspects that revolve around D&I. Receive regular updates and learn how to navigate workplace dynamics</p>
                    <div className="d-flex flex-row">
                        <Slider>
                            <div className="bg-white text-slate-950 shadow dark:bg-slate-950 dark:text-slate-50 rounded-xl max-w-[290px]">
                                <div className="p-5">
                                    <div className="self-stretch flex-col justify-start items-start gap-2.5 inline-flex">
                                        <div className="h-[186px] flex-col justify-start items-start gap-4 flex">
                                            <div className="h-[34px] pr-1 justify-start items-center inline-flex">
                                                <div className="self-stretch relative">
                                                <img class="w-[34px] h-[34px] rounded-[150px] object-contain" src="https://deijobs.in/uploads/testimonials/8ddb6-default-user.png"/>
                                                <div className=" h-[34px] left-[49px] top-0 absolute flex-col justify-start items-start gap-0.5 inline-flex">
                                                    <div className="w-40 h-4 text-gray-900 text-sm font-light leading-normal">Customer Testimonial</div>
                                                    <div className=" h-4 text-gray-500 text-xs font-light leading-tight">
                                                        Just now
                                                    </div>
                                                    <div className="h-[100px] flex-col justify-start items-start gap-2 flex">
                                                        <div className=" h-6 text-gray-900 text-sm font-normal leading-tight">
                                                             Customer Testimonial
                                                        </div>
                                                        <div className="  text-gray-400 text-xs font-light leading-tight overflow-hidden line-clamp-4">
                                                            <p>
                                                            Try this: go to any page on your website and count the marketing claims you make. How many times is your business described as easy, smart, effective, trusted.</p>
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="h-5  flex flex-row-reverse justify-between items-center w-full">
                                                        <div className="h-5">
                                                            <button className="justify-center rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-gray-300 disabled:text-gray-500 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-5 px-1 py-2 flex items-center gap-1 top-0 text-gray-600 text-xs font-light leading-tight">
                                                            Share
                                                            </button>
                                                        </div>
                                                        <div className="h-5  text-orange-600 text-sm font-medium leading-[14px]">
                                                            Veterans
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    )
}
export default NewsLetter;