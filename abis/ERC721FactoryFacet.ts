export const badgeFactoryAbi = [
  {
    inputs: [],
    name: "ApplicationAccess_AccountsAndApprovalsMustBeTheSameLength",
    type: "error",
  },
  {
    inputs: [],
    name: "ApplicationAccess_notAuthorised",
    type: "error",
  },
  {
    inputs: [],
    name: "CurrencyTransferLib_insufficientValue",
    type: "error",
  },
  {
    inputs: [],
    name: "CurrencyTransferLib_nativeTokenTransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC721Factory_doNotHavePermission",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC721Factory_failedToInitialize",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC721Factory_noImplementationFound",
    type: "error",
  },
  {
    inputs: [],
    name: "Factory__FailedDeployment",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__NotTransitiveOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuard__ReentrantCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "id",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "royaltyRecipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "royaltyBps",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "implementationId",
        type: "bytes32",
      },
    ],
    name: "Created",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "bool[]",
        name: "approvals",
        type: "bool[]",
      },
    ],
    name: "CreatorAccessUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "currency",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaidPlatformFee",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_implementationId",
        type: "bytes32",
      },
    ],
    name: "calculateERC721FactoryDeploymentAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "_royaltyRecipient",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "_royaltyBps",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "_implementationId",
        type: "bytes32",
      },
    ],
    name: "createERC721",
    outputs: [
      {
        internalType: "address",
        name: "id",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
      {
        internalType: "address",
        name: "_royaltyRecipient",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "_royaltyBps",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "_implementationId",
        type: "bytes32",
      },
    ],
    name: "createERC721WithTokenURI",
    outputs: [
      {
        internalType: "address",
        name: "id",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_implementationId",
        type: "bytes32",
      },
    ],
    name: "getERC721FactoryImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "platformFeeInfo",
    outputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
