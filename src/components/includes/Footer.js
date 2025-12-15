import React from 'react';
import Logo from './Logo';
import { LogOut } from 'lucide-react';
import LogoutModal from '../ui/LogoutModal';

const Footer = () => {
  return (
    <>
    <footer className="footer bg-primary">
      <div className='container'>
        <div className='row'>
            <div className='col-md-6'>
                <Logo/>
                <p className='fw-light mt-2'>
                    A specialised job portal focused on promoting <br/>diversity, equity and inclusivity in the Indian job market
                </p>
            </div>
            <div className='col-md-6 d-flex justify-content-between footer-right'>
                <div>
                <h5 className='mb-4'>Product</h5>
                <ul className='fw-light f_links mt-5 list-unstyled'>
                  <li><a href='/privacy_policy'>Privacy Policy</a></li>
                  <li><a href='/t&c'>Terms & Conditions</a></li>
                  <li><a href='/termsofuse'>Terms of Use</a></li>
                </ul>
                </div>
                <div>
                <h5 className='mb-4'>Resources</h5>
                <ul className='fw-light f_links mt-5 list-unstyled'>
                  <li><a href='/blog'>Blog</a></li>
                  <li><a href='/faq'>FAQ</a></li>
                  {/* <li><a href='/Events'>Events</a></li> */}
                </ul>
                </div>
                <div>
                <h5 className='mb-4'>Follow Us</h5>
                <ul className='fw-light f_links mt-5 list-unstyled'>
                  <li><a href='https://www.linkedin.com/company/deijobsin/about/'>LinkedIn</a></li>
                  <li><a href='https://www.instagram.com/deijobs.in/'>Instagram</a></li>
                  <li><a href='https://www.facebook.com/people/DEIJobsin/61552768880052/'>Facebook</a></li>
                </ul>
                </div>
            </div>
        </div>
        <div className='copyright'>
            <a href='/' style={{fontSize:'12px'}}>© DEI Jobs 2023. All rights reserved.</a>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
