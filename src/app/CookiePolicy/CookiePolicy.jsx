'use client';
import React from 'react';
import {
  cookiePolicyLastUpdated,
  cookiePolicyIntro,
  howWeUseCookiesTitle,
  howWeUseCookiesParagraphs,
  typesOfCookiesTitle,
  typesOfCookiesParagraphs,
  thirdPartyCookiesTitle,
  thirdPartyCookiesParagraph,
  managingCookiesTitle,
  managingCookiesParagraphs,
  changesToPolicyTitle,
  changesToPolicyParagraph,
  contactUsTitle,
  contactUsParagraphs
} from './constants/cookiePolicyContent';
import Image from 'next/image';

const CookiePolicy = () => {
  return (
    <div className="bg-black text-white flex justify-center items-center min-h-screen py-10">
      <div className="max-w-screen-md px-4 lg:px-10 text-center">
        {/* Cookie Policy title and last updated text */}
        <h1 className="text-3xl lg:text-[34px] font-semibold mb-6 mt-[40px] md:mt-[80px] text-[#FFFFFF]">
          Cookie Policy
        </h1>
        <p className="text-sm lg:text-[16px] mb-[10px] text-[#979797]">
          {cookiePolicyLastUpdated}
        </p>

        {/* Introductory paragraph */}
        <p className="text-[16px] mb-4 leading-relaxed  text-[#F1F1F1]">
          {cookiePolicyIntro}
        </p>

        {/* Shield logo after the introductory paragraph */}
        <div className="flex justify-center mb-6">
          <Image src="/imgs/PrivacyPolicy/scut.svg" width={40} height={58} alt="scut" />
        </div>

        {/* How We Use Cookies Section */}
        <h2 className="text-lg lg:text-2xl font-bold mb-2 text-white">
          {howWeUseCookiesTitle}
        </h2>
        {howWeUseCookiesParagraphs.map((paragraph, index) => (
          <p key={index} className="text-[16px] mb-2 leading-relaxed font-ekMukta text-[#F1F1F1]">
            {paragraph}
          </p>
        ))}

        {/* Types of Cookies Section */}
        <h2 className="text-lg lg:text-2xl font-bold mb-2 text-white">
          {typesOfCookiesTitle}
        </h2>
        {typesOfCookiesParagraphs.map((paragraph, index) => (
          <p key={index} className="text-[16px] mb-2 leading-relaxed font-ekMukta text-[#F1F1F1]">
            {paragraph}
          </p>
        ))}

        {/* Third-Party Cookies Section */}
        <h2 className="text-lg lg:text-2xl font-bold mb-2 text-white">
          {thirdPartyCookiesTitle}
        </h2>
        <p className="text-[16px] mb-2 leading-relaxed font-ekMukta text-[#F1F1F1]">
          {thirdPartyCookiesParagraph}
        </p>

        {/* Managing Cookies Section */}
        <h2 className="text-lg lg:text-2xl font-bold mb-2 text-white">
          {managingCookiesTitle}
        </h2>
        {managingCookiesParagraphs.map((paragraph, index) => (
          <p key={index} className="text-[16px] mb-2 leading-relaxed font-ekMukta text-[#F1F1F1]">
            {paragraph}
          </p>
        ))}

        {/* Changes to This Policy */}
        <h2 className="text-lg lg:text-2xl font-bold mb-2 text-white">
          {changesToPolicyTitle}
        </h2>
        <p className="text-[16px] mb-2 leading-relaxed font-ekMukta text-[#F1F1F1]">
          {changesToPolicyParagraph}
        </p>

        {/* Contact Us Section */}
        <h2 className="text-lg lg:text-2xl font-bold mb-2 text-white">
          {contactUsTitle}
        </h2>
        {contactUsParagraphs.map((paragraph, index) => (
          <p key={index} className="text-[16px] mb-2 leading-relaxed font-ekMukta text-[#F1F1F1]">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CookiePolicy;
