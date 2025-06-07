"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getSkipImage } from "@/lib/utils";

interface ContainerData {
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

interface SelectedContainerBarProps {
  data: ContainerData;
  onDeselect: () => void;
}

export default function SelectedContainerBar({
  data,
  onDeselect,
}: SelectedContainerBarProps) {
  const totalPrice =
    data.price_before_vat + (data.price_before_vat * data.vat) / 100;

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        onClick={onDeselect}
        aria-hidden="true"
      />

      {/* Fixed bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 shadow-2xl animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-labelledby="selected-container-title"
        aria-describedby="selected-container-description"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Container Info Section */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Container Image */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                <img
                  src={getSkipImage(data.size)}
                  alt={`${data.size} cubic yard container`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 right-1">
                  <Badge
                    variant="secondary"
                    className="bg-blue-600 text-white text-xs px-1 py-0"
                  >
                    {data.size}yd³
                  </Badge>
                </div>
              </div>

              {/* Container Details */}
              <div className="flex-1 min-w-0">
                <h3
                  id="selected-container-title"
                  className="text-white font-semibold text-lg truncate"
                >
                  {data.size} Cubic Yard Container
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    <span>{data.hire_period_days} days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    <span>{data.postcode}</span>
                  </div>
                </div>

                {/* Features - Hidden on mobile */}
                <div className="hidden sm:flex items-center gap-2 mt-2">
                  {data.allowed_on_road && (
                    <Badge
                      variant="outline"
                      className="border-green-500 text-green-400 bg-green-500/10 text-xs"
                    >
                      <CheckCircle className="w-2 h-2 mr-1" />
                      Road Placement
                    </Badge>
                  )}
                  {data.allows_heavy_waste && (
                    <Badge
                      variant="outline"
                      className="border-orange-500 text-orange-400 bg-orange-500/10 text-xs"
                    >
                      <CheckCircle className="w-2 h-2 mr-1" />
                      Heavy Waste
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="text-right flex-shrink-0">
              <div className="text-green-400 font-bold text-xl">
                £{totalPrice.toFixed(2)}
              </div>
              <div className="text-gray-400 text-sm">
                inc. VAT ({data.vat}%)
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* View Details Button - Hidden on small screens */}
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex border-gray-600 bg-primary text-gray-300 hover:bg-gray-800"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

              {/* Book Now Button */}
              <Button
                size="sm"
                className="bg-green-600 hidden sm:flex hover:bg-green-700 text-white font-semibold px-4"
              >
                <span className="">Continue</span>
                <ChevronRight className="w-4 h-4 mr-1" />
              </Button>
            </div>
          </div>

          {/* Mobile-only additional info */}
          <div className="sm:hidden mt-3 pt-3 border-t border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <div className="flex gap-4 text-gray-300">
                {data.transport_cost && (
                  <span>Transport: £{data.transport_cost}</span>
                )}
                {data.per_tonne_cost && (
                  <span>Per tonne: £{data.per_tonne_cost}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm">back</Button>
                <Button
                  size="sm"
                  className="bg-green-600 items-center justify-center  hover:bg-green-700 text-white font-semibold px-4"
                >
                  <span className="">Continue</span>
                  <ChevronRight className="w-4 h-4 mr-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Screen reader description */}
        <div id="selected-container-description" className="sr-only">
          Selected container: {data.size} cubic yard waste container for{" "}
          {data.hire_period_days} days in {data.postcode}, priced at £
          {totalPrice.toFixed(2)} including VAT.
        </div>
      </div>
    </>
  );
}
