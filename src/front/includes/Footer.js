import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer class="bg-primary">
      <div className='container py-5'>
        <div className='row'>
            <div className='col-md-6'>
                <Logo/>
                <p className='fw-light mt-2'>
                    A specialised job portal focused on promoting diversity, equity and inclusivity in the Indian job market
                </p>
                <ul className='fw-light f_links mt-5 list-unstyled'>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Privacy Policy</a></li>
                </ul>
            </div>
            <div className='col-6 d-flex justify-content-between ps-5'>
                <div>
                <h5 className='mb-4'>Product</h5>
                <ul className='fw-light f_links mt-5 list-unstyled'>
                  <li><a href=''>Privacy Policy</a></li>
                  <li><a href=''>Terms & Conditions</a></li>
                  <li><a href=''>Terms of Use</a></li>
                </ul>
                </div>
                <div>
                <h5 className='mb-4'>Resources</h5>
                <ul className='fw-light f_links mt-5 list-unstyled'>
                  <li><a href='/blog'>Blog</a></li>
                  <li><a href='/pricing'>Pricing</a></li>
                  <li><a href='/Events'>Events</a></li>
                </ul>
                </div>
                <div>
                <h5 className='mb-4'>Follow Us</h5>
                <ul className='fw-light f_links mt-5 list-unstyled'>
                  <li><a href=''>LinkedIn</a></li>
                  <li><a href=''>X</a></li>
                  <li><a href=''>Facebook</a></li>
                </ul>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
