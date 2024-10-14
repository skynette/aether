import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, CreditCard, Globe, Lock, Smartphone } from "lucide-react"
import Footer from "@/components/layout/footer"

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white text-gray-800">
            <main className="text-center">
                <section className="container mx-auto px-4 py-20 max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Crypto Payments Made <span className="text-purple-600">Simple</span></h1>
                    <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">Experience the future of transactions with Aether. Fast, secure, and borderless payments at your fingertips.</p>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                        <Input type="email" placeholder="Enter your email" className="max-w-xs" />
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                </section>

                <section id="features" className="py-20 bg-gradient-to-b from-white to-purple-50">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold mb-12">Why Choose Aether</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Globe className="h-12 w-12 text-purple-600" />}
                                title="Global Transactions"
                                description="Send and receive payments anywhere in the world, instantly and with minimal fees."
                            />
                            <FeatureCard
                                icon={<Lock className="h-12 w-12 text-purple-600" />}
                                title="Bank-Grade Security"
                                description="Your funds and data are protected by state-of-the-art encryption and security measures."
                            />
                            <FeatureCard
                                icon={<CreditCard className="h-12 w-12 text-purple-600" />}
                                title="Multiple Cryptocurrencies"
                                description="Support for a wide range of cryptocurrencies, all in one convenient app."
                            />
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="py-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <StepCard
                                number="1"
                                title="Create an Account"
                                description="Sign up for free and verify your identity in minutes."
                            />
                            <StepCard
                                number="2"
                                title="Add Funds"
                                description="Deposit crypto or connect your bank account securely."
                            />
                            <StepCard
                                number="3"
                                title="Start Transacting"
                                description="Send, receive, or spend your crypto with ease."
                            />
                        </div>
                    </div>
                </section>

                <section id="testimonials" className="py-20 bg-gradient-to-b from-purple-50 to-white">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <TestimonialCard
                                quote="Aether has revolutionized how I handle international payments. It's fast, cheap, and incredibly user-friendly."
                                author="Sarah K., Small Business Owner"
                            />
                            <TestimonialCard
                                quote="I've tried many crypto apps, but Aether stands out with its simplicity and robust feature set. Highly recommended!"
                                author="Alex M., Crypto Enthusiast"
                            />
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                        <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">Join thousands of users who are already enjoying the benefits of Aether. Sign up now and experience the future of payments.</p>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3">Create Your Free Account</Button>
                    </div>
                </section>
            </main>
        </div>
    )
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

interface StepCardProps {
    number: string;
    title: string;
    description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-4">{number}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

interface TestimonialCardProps {
    quote: string;
    author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg mb-4">"{quote}"</p>
            <p className="text-gray-600">- {author}</p>
        </div>
    )
}