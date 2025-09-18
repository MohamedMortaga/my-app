import React from "react";
import Image from "next/image";
import qrc from "@/assets/images/image.png"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaApple, FaGooglePlusG } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-12 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

        {/* Exclusive - Subscribe */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Exclusive</h4>
          <p className="font-medium mb-1">Subscribe</p>
          <p className="text-sm text-gray-300 mb-4">Get 10% off your first order</p>
          <form className="flex items-center border border-white rounded-md overflow-hidden">
            <Input
              type="email"
              placeholder="Enter your email"
              className="text-black bg-white placeholder:text-gray-500 rounded-none border-none focus-visible:ring-0"
            />
            <Button type="submit" className="rounded-none px-4">
              ➤
            </Button>
          </form>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <p className="text-sm text-gray-300">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p className="mt-2 text-sm text-gray-300">exclusive@gmail.com</p>
          <p className="mt-2 text-sm text-gray-300">+88015-88888-9999</p>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Account</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#">My Account</Link></li>
            <li><Link href="#">Login / Register</Link></li>
            <li><Link href="#">Cart</Link></li>
            <li><Link href="#">Wishlist</Link></li>
            <li><Link href="#">Shop</Link></li>
          </ul>
        </div>

        {/* Quick Link */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Link</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms Of Use</Link></li>
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>

        {/* Download App */}
        <div>
        <h4 className="text-lg font-semibold mb-4">Download App</h4>
        <p className="text-xs text-gray-400 mb-2">Save $3 with App New User Only</p>
        <div className="flex items-start gap-3 mb-4">
            <Image
            src={qrc.src}
            alt="QR Code"
            width={80}
            height={80}
            className="bg-white p-1"
            />
            <div className="flex flex-col gap-2">
            {/* Google Play Button */}
            <Link
                href="#"
                className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-md text-sm shadow hover:shadow-md transition"
            >
                <FaGooglePlusG className="text-xl" />
                Google Play
            </Link>

            {/* App Store Button */}
            <Link
                href="#"
                className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-md text-sm shadow hover:shadow-md transition"
            >
            <FaApple className="text-xl" />
                App Store
            </Link>
            </div>
        </div>

        <div className="flex items-center gap-4 text-gray-400 text-xl">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
        </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
        © Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  );
}
