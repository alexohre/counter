export const wagmiContractConfig = {
	address: "0x8488EAaAe391A36D6EE280C714A6F28041418569",
	abi: [
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "uint256",
					name: "newValue",
					type: "uint256",
				},
			],
			name: "CountDecreased",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "uint256",
					name: "value",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "newValue",
					type: "uint256",
				},
			],
			name: "CountDecreasedByVal",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "uint256",
					name: "newValue",
					type: "uint256",
				},
			],
			name: "CountIncreased",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "uint256",
					name: "value",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "newValue",
					type: "uint256",
				},
			],
			name: "CountIncreasedByVal",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "uint256",
					name: "newValue",
					type: "uint256",
				},
			],
			name: "ResetCount",
			type: "event",
		},
		{
			inputs: [],
			name: "countVal",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "decrement",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "_val", type: "uint256" }],
			name: "decrementByVal",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "getCount",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "increment",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "_val", type: "uint256" }],
			name: "incrementByVal",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "resetCount",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "runner",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "pure",
			type: "function",
		},
	],
} as const;
