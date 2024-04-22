import { Arbitrum, Polygon } from "@thirdweb-dev/chain-icons";

// Define a type for the props
type ChainNameProps = {
  chain: "arbitrum" | "polygon" | "arbitrumSepolia" | "polygonAmoy";
};

// Define a type for the chain info
type ChainInfo = {
  name: string;
  Icon: React.ComponentType<{ className: string }>;
};

// Define the component
export default function ChainName({ chain }: ChainNameProps) {
  const chainInfo: Record<string, ChainInfo> = {
    arbitrumSepolia: { name: "Arbitrum Sepolia", Icon: Arbitrum },
    arbitrum: { name: "Arbitrum Mainnet", Icon: Arbitrum },
    polygon: { name: "Polygon Mainnet", Icon: Polygon },
    polygonAmoy: { name: "Polygon Amoy", Icon: Polygon },
  };

  const ChainIcon = chainInfo[chain]?.Icon;
  const chainName = chainInfo[chain]?.name;

  return (
    <div className="flex items-center space-x-2">
      {ChainIcon && <ChainIcon className="h-6 w-6" />}
      <p>{chainName}</p>
    </div>
  );
}
