import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-200 text-gray-600 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between mb-10"></div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 xl:w-1/2 mb-4 md:mb-0">
              <h5 className="text-lg font-bold mb-2">Stay Connected</h5>
              <ul className="flex flex-wrap justify-start">
                <li className="mr-4">
                  <a href="#" className="text-blue-600 hover:text-blue-900">
                    <i className="pi pi-facebook"></i>
                  </a>
                </li>
                <li className="mr-4">
                  <a href="#" className="text-red-600 hover:text-red-900">
                    <i className="pi pi-twitter"></i>
                  </a>
                </li>
                <li className="mr-4">
                  <a href="#" className="text-green-500 hover:text-green-900">
                    <i className="pi pi-whatsapp"></i>
                  </a>
                </li>
                <li className="mr-4">
                  <a href="#" className="text-orange-600 hover:text-orange-900">
                    <i className="pi pi-linkedin-in"></i>
                  </a>
                </li>
                <li className="mr-4">
                  <a href="#" className="text-blue-600 hover:text-blue-900">
                    <i className="pi pi-telegram"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/2 text-right">
              <p className="text-sm">
                &copy; 2025 Exam Master. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
