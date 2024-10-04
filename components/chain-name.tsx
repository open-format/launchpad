import { cn } from "@/lib/utils";
import { Arbitrum, Polygon } from "@thirdweb-dev/chain-icons";

// Define a type for the props
type ChainNameProps = {
  chain: "arbitrum" | "polygon" | "arbitrumSepolia" | "polygonAmoy";
};

// Define a type for the chain info
type ChainInfo = {
  name: string;
  Icon: React.ComponentType<{ className: string }>;
  color: string;
};

// Define the component
export default function ChainName({ chain }: ChainNameProps) {
  const chainInfo: Record<string, ChainInfo> = {
    arbitrumSepolia: {
      name: "Arbitrum Sepolia",
      Icon: Arbitrum,
      color: "#59a3f8",
    },
    arbitrum: {
      name: "Arbitrum Mainnet",
      Icon: Arbitrum,
      color: "#59a3f8",
    },
    polygon: {
      name: "Polygon Mainnet",
      Icon: Polygon,
      color: "#59a3f8",
    },
    polygonAmoy: {
      name: "Polygon Amoy",
      Icon: Polygon,
      color: "#59a3f8",
    },
  };

  const ChainIcon = chainInfo[chain]?.Icon;
  const chainName = chainInfo[chain]?.name;
  const chainColor = chainInfo[chain]?.color;

  return (
    <div className="flex items-center space-x-1">
      {ChainIcon && <ChainIcon className="h-8 w-8" />}
      <p className={cn("font-bold")} style={{ color: chainColor }}>
        {chainName}
      </p>
    </div>
  );
}
