"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Snowfall from "./components/snowfall";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadContract, useWriteContract } from "wagmi";
import { wagmiContractConfig } from "./contract";

export default function Home() {
	// const [count, setCount] = useState<number>(12);
	const [year, setYear] = useState<number | null>(null);
	const [inputValue, setInputValue] = useState<number>(0);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	const {
		data: count,
		error,
		isPending,
	} = useReadContract({
		...wagmiContractConfig,
		functionName: "getCount",
		args: [],
		// query: {
		//   enabled: !!address,
		// },
	});

	const { refetch } = useReadContract({
		...wagmiContractConfig,
		functionName: "getCount",
		args: [],
	});
	const handleGetCount = async () => {
		try {
			await refetch();
		} catch (error) {
			console.error("Error refetching count:", error);
		} finally {
			console.log("Refetched count");
		}
	};

	const { writeContract } = useWriteContract();
	// handle increment by one
	const handleIncreaseClick = async () => {
		if (isLoading) return; // Prevent clicking while already loading

		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 5000);
		try {
			await writeContract({
				...wagmiContractConfig,
				functionName: "increment",
				args: [],
			});
		} catch (error) {
			console.error("Error calling CountIncreased:", error);
		}
	};

	// handle decrement by one
	const handleDecreaseClick = async () => {
		if (isLoading) return; // Prevent clicking while already loading

		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 5000);
		try {
			await writeContract({
				...wagmiContractConfig,
				functionName: "decrement",
				args: [],
			});
		} catch (error) {
			console.error("Error calling CountIncreased:", error);
		}
	};

	// handle reset count to zero
	const handleResetClick = async () => {
		if (isLoading) return; // Prevent clicking while already loading

		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 5000);
		try {
			await writeContract({
				...wagmiContractConfig,
				functionName: "resetCount",
				args: [],
			});
		} catch (error) {
			console.error("Error calling CountIncreased:", error);
		}
	};

	// handle increment by value
	const handleIncrementByVal = async (val: number) => {
		try {
			await writeContract({
				...wagmiContractConfig,
				functionName: "incrementByVal",
				args: [BigInt(val)],
			});
		} catch (error) {
			console.error("Error calling CountIncreased:", error);
		} finally {
			console.log("Incremented by ", val);
		}
	};

	// handle decrement by value
	const handleDecrementByVal = async (val: number) => {
		try {
			await writeContract({
				...wagmiContractConfig,
				functionName: "decrementByVal",
				args: [BigInt(val)],
			});
		} catch (error) {
			console.error("Error calling CountDecreased:", error);
		} finally {
			console.log("Incremented by ", val);
		}
	};

	// Handle conditional button click for increase
	const handleCondIncreaseClick = () => {
		if (inputValue !== undefined && inputValue > 0) {
			handleIncrementByVal(inputValue);
			setInputValue(0);
		} else {
			handleIncreaseClick();
		}
	};

	// Handle conditional button click decrease
	const handleCondDecreaseClick = () => {
		if (inputValue !== undefined && inputValue > 0) {
			handleDecrementByVal(inputValue);
			setInputValue(0);
		} else {
			handleDecreaseClick();
		}
	};

	console.log({ count, error, isPending });

	return (
		<div
			className="min-h-screen relative flex flex-col"
			suppressHydrationWarning
		>
			{/* Snowfall Effect */}
			<Snowfall />

			{/* Background Image */}
			<Link href="/">
				<div className="absolute inset-0 z-0 cursor-pointer">
					<Image
						src="/background.jpg"
						alt="Background"
						fill
						style={{ objectFit: "cover" }}
						priority
					/>
					{/* Overlay to ensure text readability */}
					<div className="absolute inset-0 bg-black/30"></div>
				</div>
			</Link>

			{/* Header */}
			<header className="relative z-10 bg-blue-500 py-4 px-6 shadow-md flex justify-between items-center">
				<Image
					src="/logo.png"
					alt="Counter Logo"
					width={150}
					height={40}
					className="object-contain"
				/>
				<ConnectButton
					accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
				/>
			</header>

			{/* Main Content - Centered Card */}
			<main className="relative z-10 flex-grow flex items-center justify-center px-4 py-8">
				<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-xl mx-auto">
					<h2 className="text-center text-gray-600 text-xl mb-4">
						Current Count Is
					</h2>

					<div className="text-center mb-12">
						<span className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
							{count?.toString() ?? "NoN"}
						</span>
					</div>
					<div className="text-center mb-4">
						<input
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(Number(e.target.value))}
							placeholder="eg. 5"
							className="w-full p-4 text-base outline-blue-500 border border-sky-500 rounded-lg"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
						<button
							onClick={handleCondIncreaseClick}
							disabled={isLoading}
							className="bg-emerald-500 text-white py-3 px-4 rounded-lg hover:bg-emerald-600
                        transition-all duration-300 transform hover:scale-105 shadow-md
                        hover:shadow-emerald-300/50 flex justify-center items-center space-x-2"
						>
							{isLoading ? (
								// Render the bouncing dots when loading
								<span>
									<div className="bouncing-dots">
										<div className="bouncing-dot"></div>
										<div className="bouncing-dot"></div>
										<div className="bouncing-dot"></div>
									</div>
								</span>
							) : (
								<>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
											clipRule="evenodd"
										/>
									</svg>
									<span>Increase</span>
								</>
							)}
						</button>

						<button
							onClick={handleCondDecreaseClick}
							disabled={isLoading}
							className="bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600
                        transition-all duration-300 transform hover:scale-105 shadow-md
                        hover:shadow-red-300/50 flex justify-center items-center space-x-2"
						>
							{isLoading ? (
								// Render the bouncing dots when loading
								<div className="bouncing-dots">
									<div className="bouncing-dot"></div>
									<div className="bouncing-dot"></div>
									<div className="bouncing-dot"></div>
								</div>
							) : (
								<>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
											clipRule="evenodd"
										/>
									</svg>
									<span>Decrease</span>
								</>
							)}
						</button>

						<button
							onClick={handleResetClick}
							disabled={isLoading}
							className="bg-amber-500 text-white py-3 px-4 rounded-lg hover:bg-amber-600
                        transition-all duration-300 transform hover:scale-105 shadow-md
                        hover:shadow-amber-300/50 flex justify-center items-center space-x-2"
						>
							{isLoading ? (
								// Render the bouncing dots when loading
								<div className="bouncing-dots">
									<div className="bouncing-dot"></div>
									<div className="bouncing-dot"></div>
									<div className="bouncing-dot"></div>
								</div>
							) : (
								<>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
											clipRule="evenodd"
										/>
									</svg>
									<span>Reset</span>
								</>
							)}
						</button>

						<button
							onClick={handleGetCount}
							className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600
                        transition-all duration-300 transform hover:scale-105 shadow-md
                        hover:shadow-blue-300/50 flex justify-center items-center space-x-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 100-2H9z"
									clipRule="evenodd"
								/>
							</svg>
							<span>Get Count</span>
						</button>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="relative z-10 text-center py-6 text-white">
				<p>Built with Next.js and Tailwind CSS • {year ?? "..."}</p>
			</footer>
		</div>
	);
}
