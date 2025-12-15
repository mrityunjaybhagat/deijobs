import React, { useState, useEffect } from 'react';
import images from "../../assets/images";
import { useResponsive } from '../../config/responsive';
import PayNowCard from '../../components/profile/PayNowCard';
import ProfileCard from '../../components/profile/ProfileCard';
import JobAlertToggle from '../../components/profile/NotificationCard';

const ReceiptPage = () => {
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  // const [verificationData, setVerificationData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const userId = localStorage.getItem('login_token');
  return (
    <>
      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center">
          <img src={companyLogo} className="h-10 w-15" />
          <div className="flex flex-col justify-center">
            <div className=" text-gray-500 text-xs font-light font-['Lexend'] leading-tight">
              {data?.data?.no}
            </div>
            <div className=" text-gray-500 text-xs font-light font-['Lexend'] leading-tight">
              Issued on: {formatDate(data?.data?.transactonDate)}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10 mb-10">
          <div className="text-gray-900 text-base font-medium font-['Lexend'] leading-7">
            Receipt
          </div>
        </div>
        <div className="flex flex-col mb-10">
          <div className=" h-7 text-gray-900 text-sm font-light font-['Lexend'] leading-tight">
            Bill To:
          </div>
          <div className="flex gap-10">
            <div className="w-12 h-7 text-gray-700 text-xs font-light font-['Lexend'] leading-tight">
              Name:
            </div>
            <div className="h-5 text-gray-700 text-sm font-normal font-['Lexend'] leading-none ">
              {data?.data?.name}
            </div>
          </div>
          <div className="flex gap-10">
            <div className="w-12 h-7 text-gray-700 text-xs font-light font-['Lexend'] leading-tight">
              Email:
            </div>
            <div className="h-5 text-gray-700 text-sm font-normal font-['Lexend'] leading-none ">
              {data?.data?.email ?? "-"}
            </div>
          </div>
          <div className="flex gap-10">
            <div className="w-12 h-7 text-gray-700 text-xs font-light font-['Lexend'] leading-tight">
              Mobile:
            </div>
            <div className="h-5 text-gray-700 text-sm font-normal font-['Lexend'] leading-none ">
              {data?.data?.mobile ?? "-"}
            </div>
          </div>
          {/* <div className="flex gap-10">
            <div className="w-12 h-7 text-gray-700 text-xs font-light font-['Lexend'] leading-tight">
              Address:
            </div>
            <div className=" text-gray-700 text-sm font-normal font-['Lexend'] leading-none ">
              {data?.data?.address}
            </div>
          </div> */}
        </div>
        <div className=" flex flex-col border-t border-b border-gray-200 flex pt-6 pb-6">
          <div className="flex ">
            <div className="w-20 h-8 text-gray-700 text-xs font-light font-['Lexend'] leading-tight">
              Sr No.
            </div>
            <div className="w-60 h-8 text-gray-700 text-xs font-light font-['Lexend'] leading-tight">
              Product
            </div>
            <div className="w-20 h-8 text-right text-gray-700 text-xs font-light font-['Lexend'] leading-tight">
              Amount
            </div>
          </div>
          <div className="flex">
            <div className="w-20 h-5 text-gray-700 text-xs font-light font-['Lexend'] leading-tight">
              1.
            </div>
            <div className=" w-60 flex flex-col">
              <div className="h-5 text-gray-700 text-sm font-normal font-['Lexend'] leading-none">
                {data?.data?.product}
              </div>
              {/* <div className="h-5 text-gray-700 text-sm font-normal font-['Lexend'] leading-none">
                Lorem ipsum
              </div> */}
            </div>
            <div className="w-20 text-right text-gray-700 text-sm font-medium font-['Lexend'] leading-none">
              {data?.data?.productAmount && "₹" + data?.data?.productAmount}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end mt-4 mr-3 border-b border-gray-200">
          <div className="mb-4">
            <div className="flex gap-5 ">
              <div className="w-70 h-5 text-right text-gray-700 text-xs font-light font-['Lexend'] leading-tight">
                Tax (18%)
              </div>
              <div className="w-20 h-5 text-right text-gray-700 text-xs font-light font-['Lexend'] leading-tight">
                {data?.data?.tax1 && "₹" + data?.data?.tax1}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-end border-b border-gray-200 py-5 mr-3">
          <div className="flex gap-5 ">
            <div className="w-70 h-5 text-right text-gray-700 text-sm font-normal font-['Lexend'] leading-none">
              Total amount
            </div>
            <div className="w-20 h-5 text-right text-gray-700 text-sm font-normal font-['Lexend'] leading-none">
              {data?.data?.totalAmount && "₹" + data?.data?.totalAmount}
            </div>
          </div>
          <div className="text-right text-gray-500 text-sm font-normal font-['Lexend'] leading-none">
            {data?.data?.textAmount}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="mt-5 h-7 text-indigo-700 text-sm font-light font-['Lexend'] leading-normal cursor-pointer">
            <a
              href={data?.data?.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </div>
        </div>
        <div className=" h-7 text-gray-900 text-sm font-light font-['Lexend'] leading-tight">
          Payment Information:
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-gray-600 text-xs font-normal font-['Lexend']">
            Bank: HDFC Bank
          </div>
          <div className="text-gray-600 text-xs font-normal font-['Lexend']">
            Account Name: Sapphire Human Solutions Pvt. Ltd
          </div>
          <div className="text-gray-600 text-xs font-normal font-['Lexend']">
            Account Number: 00600340044667
          </div>
          <div className="text-gray-600 text-xs font-normal font-['Lexend']">
            IFSC Code – HDFC0000060
          </div>
          <div className="text-gray-600 text-xs font-normal font-['Lexend']">
            Payment Method: Online
          </div>
        </div>
      </div>

      {/* <div className="bg-white">
        <div className="flex flex-col px-4 py-8">
          <div className=" h-7 text-gray-600 text-base font-medium font-['Lexend'] leading-7">
            Company info
          </div>
          <div className="text-gray-600 text-xs font-light font-['Lexend'] leading-tight my-4">
            Lorem ipsum dolor sit dolor sit
            <br />
            Lorem ipsum dolor sit dolor sit
            <br />
            Lorem ipsum dolor sit dolor sit
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex gap-6">
              <img src={phone} />
              <div className="text-gray-600 text-xs font-normal font-['Lexend']">
                +91-22-61672424
              </div>
            </div>
            <div className="flex gap-6">
              <img src={email} />
              <div className=" text-gray-600 text-xs font-normal font-['Lexend']">
                feedback@deijobs.in
              </div>
            </div>
            <div className="flex gap-6">
              <img src={web} />
              <div className="text-gray-600 text-xs font-normal font-['Lexend']">
                deijobs.in
              </div>
            </div>
          </div>
          <div className="h-5 text-gray-600 text-xs font-light font-['Lexend'] leading-tight mb-4">
            Lorem ipsum dolor sit dolor sit
          </div>
        </div>
      </div> */}
      <div className="flex flex-col p-4 gap-2">
        <div className="h-7 text-gray-600 text-base font-medium font-['Lexend'] leading-7">
          Thank you for using our services!
        </div>
        <div className="text-gray-600 text-xs font-normal font-['Lexend']">
          Branch - FORT
        </div>
        <div className="text-gray-600 text-xs font-normal font-['Lexend']">
          Address - MANEKJI WADIA BLDG <br />
          GROUND FLOOR, NANIK MOTWANI MARG,
          <br />
          FORT
        </div>
        <div className="text-gray-600 text-xs font-normal font-['Lexend']">
          Email: info@deijobs.in
        </div>
        <div className="text-gray-600 text-xs font-normal font-['Lexend']">
          Website: www.deijobs.in
        </div>
        <div className="text-gray-600 text-xs font-normal font-['Lexend']">
          Note: This is an electronic invoice and does not require a signature.
        </div>
        {/* <ul className="list-disc pl-4 flex flex-col gap-1">
          <li className="text-gray-600 text-xs font-light font-['Lexend'] leading-tight">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
            aliqua.Pellentesque habitant morbi tristique sene malesuada. Amet
            consectetur adi
          </li>
          <li className="text-gray-600 text-xs font-light font-['Lexend'] leading-tight">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
            aliqua.Pellentesque habitant morbi tristique sene malesuada. Amet
            consectetur adi
          </li>
        </ul> */}
      </div>
    </>
  );
};

export default ReceiptPage;
