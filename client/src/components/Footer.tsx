function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center border-b border-gray-800 pb-6">
          <div className="text-xl font-bold mb-2 md:mb-0">KESH.COM</div>

          <div className="flex flex-wrap justify-center gap-3 text-sm md:justify-end">
            <a href="#" className="hover:text-gray-400 transition">
              About Us
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              Terms of Service
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-6">
          © 2026 KESH. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
