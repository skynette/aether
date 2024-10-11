import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-black">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    <Link href="/privacy" className=" hover:text-gray-500">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className=" hover:text-gray-500">
                        Terms of Service
                    </Link>
                    <a href="https://twitter.com/yourcompany" className=" hover:text-gray-500">
                        Twitter
                    </a>
                    <a href="https://github.com/yourcompany" className=" hover:text-gray-500">
                        GitHub
                    </a>
                </div>
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base ">
                        &copy; 2024 Your Company, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}