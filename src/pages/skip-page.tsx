import { useState, useEffect } from "react";
import SkipCard from "@/components/skip-card";
import { getSkips } from "@/apis/skips";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkipCardSkeleton from "@/components/skip-card-skeleton";
import SelectedContainerBar from "@/components/selected-skip-bar";
import Stepper from "@/components/stepper";

interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export default function Home() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkips = async () => {
    setLoading(true);
    setError(null);

    const result = await getSkips();

    if (result.success) {
      setSkips(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSkips();
  }, []);

  const handleCardSelect = (id: number) => {
    setSelectedCard(selectedCard === id ? null : id);
  };

  const handleRetry = () => {
    fetchSkips();
  };

  return (
    <div className="min-h-screen py-16 pb-32 px-4 bg-[#121212]">
      <div className="max-w-6xl mx-auto">
        <Stepper currentStep={3} />
        {/* Current Step Content */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white mb-1">
            Choose Your Skip Size
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            Select the skip size that best suits your needs
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkipCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Unable to Load Skips
            </h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <Button
              onClick={handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : skips.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                No Skips Available
              </h2>
              <p className="text-gray-400 mb-6">
                No waste containers are currently available for NR32, Lowestoft.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {skips.map((skip) => (
              <SkipCard
                key={skip.id}
                data={skip}
                onSelect={handleCardSelect}
                isSelected={selectedCard === skip.id}
              />
            ))}
          </div>
        )}

        {selectedCard && (
          <SelectedContainerBar
            data={skips.find((skip) => skip.id === selectedCard)!}
            onDeselect={() => setSelectedCard(null)}
          />
        )}
      </div>
    </div>
  );
}
