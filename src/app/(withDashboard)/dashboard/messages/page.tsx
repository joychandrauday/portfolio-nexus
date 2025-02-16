"use client";

import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import LoadingPage from "@/components/utils/Loading";
import { motion } from "framer-motion"; // Importing motion

const MessagePage = () => {
    const [messages, setMessages] = useState<{ user_name: string; user_email: string; message: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const storedMessages = localStorage.getItem("contactMessages");
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            }
            setLoading(false);
        }, 1000);
    }, []);

    // Remove message function
    const removeMessage = (index: number) => {
        const updatedMessages = messages.filter((_, i) => i !== index);
        setMessages(updatedMessages);
        localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-left mb-6 text-white">Messages</h1>

            {loading ? (
                <LoadingPage />
            ) : messages.length > 0 ? (
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            className="relative p-4 bg-white/10 backdrop-blur-lg text-white rounded-lg shadow-md border border-white/20 flex flex-col gap-2"
                            initial={{ opacity: 0, y: 100 }} // Initial state
                            animate={{ opacity: 1, y: 0 }} // Animate to this state
                            transition={{ duration: 1 }} // Set transition duration
                        >
                            {/* Remove Button */}
                            <button
                                className="absolute top-2 right-2 text-red-400 hover:text-red-500"
                                onClick={() => removeMessage(index)}
                            >
                                <IoMdClose className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-2">
                                <FaUser className="text-blue-400" />
                                <h2 className="text-lg font-semibold">{msg.user_name}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdEmail className="text-yellow-400" />
                                <p className="text-sm text-gray-300">{msg.user_email}</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <RiMessage2Fill className="text-green-400 mt-1" />
                                <p className="mt-1">{msg.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400">No messages found.</p>
            )}
        </div>
    );
};

export default MessagePage;
