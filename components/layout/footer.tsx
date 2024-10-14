import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-purple-100 py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-2xl font-bold text-purple-600 mb-4 md:mb-0">Aether</div>
                    <nav className="flex space-x-6 mb-4 md:mb-0">
                        <a href="#" className="hover:text-purple-600 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-purple-600 transition">Terms of Service</a>
                        <a href="#" className="hover:text-purple-600 transition">Contact Us</a>
                    </nav>
                    <div className="text-gray-600">© 2024 Aether. All rights reserved.</div>
                </div>
            </div>
        </footer>
    )
}