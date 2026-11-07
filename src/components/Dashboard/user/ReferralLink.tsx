import { useState } from "react";
import { FaUsers, FaCopy, FaCheck, FaGift } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const ReferralLink = ({ link }: { link: string }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <FaUsers className="text-emerald-600 text-xl" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                            Referral Program
                            <HiSparkles className="text-yellow-500 ml-2" />
                        </h3>
                        <p className="text-emerald-600 font-medium">
                            Earn 10% commission
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Benefits */}
                <div className="mb-6">
                    <div className="flex items-start space-x-3 mb-4">
                        <FaGift className="text-emerald-500 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                                How it works
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Share your referral link with friends and earn
                                10% commission on their first investment. Your
                                earnings are instantly available for withdrawal!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-600">
                            10%
                        </div>
                        <div className="text-xs text-gray-500">Commission</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                            ∞
                        </div>
                        <div className="text-xs text-gray-500">No Limit</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                            24h
                        </div>
                        <div className="text-xs text-gray-500">Instant Pay</div>
                    </div>
                </div>

                {/* Referral Link */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Your Referral Link
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={link}
                            readOnly
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm font-mono"
                        />
                        <button
                            onClick={handleCopy}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 active:scale-95 ${
                                copySuccess
                                    ? "bg-green-500 text-white"
                                    : "bg-emerald-500 text-white"
                            }`}
                        >
                            {copySuccess ? (
                                <>
                                    <FaCheck className="text-sm" />
                                    <span className="text-sm">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <FaCopy className="text-sm" />
                                    <span className="text-sm">Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Share Options */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-3">Share via:</p>
                    <div className="flex space-x-3">
                        <button
                            onClick={() =>
                                window.open(
                                    `https://wa.me/?text=${encodeURIComponent(`Join AlgoTrades and start trading! ${link}`)}`,
                                )
                            }
                            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium"
                        >
                            WhatsApp
                        </button>
                        <button
                            onClick={() =>
                                window.open(
                                    `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent("Join AlgoTrades!")}`,
                                )
                            }
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium"
                        >
                            Telegram
                        </button>
                        <button
                            onClick={() =>
                                window.open(
                                    `mailto:?subject=Join AlgoTrades&body=${encodeURIComponent(`Check out AlgoTrades: ${link}`)}`,
                                )
                            }
                            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
                        >
                            Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralLink;
