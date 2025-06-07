"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckCircle, Truck, Calendar, MapPin, Coins } from "lucide-react";
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

interface DataCardProps {
  data: ContainerData;
  onSelect?: (id: number) => void;
  isSelected?: boolean;
}

export default function SkipCard({
  data,
  onSelect,
  isSelected = false,
}: DataCardProps) {
  const totalPrice =
    data.price_before_vat + (data.price_before_vat * data.vat) / 100;

  const handleSelect = () => {
    onSelect?.(data.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <Card
      className={`
        bg-gray-900 p-0  border-gray-700 text-white transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20
        ${isSelected ? "ring-2 ring-purple-500 border-purple-500" : "hover:border-gray-600"}
        w-full max-w-sm mx-auto
      `}
      role="article"
      aria-labelledby={`card-title-${data.id}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <CardHeader className=" p-0">
        <div className="relative w-full h-60 mb-4 rounded-t-lg overflow-hidden bg-gray-800">
          <img
            src={getSkipImage(data.size)}
            alt={`${data.size} cubic yard waste container`}
            className="object-cover transition-transform duration-300 hover:scale-105 h-full w-full"
          />
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-purple-600 text-white font-semibold"
              aria-label={`Container size: ${data.size} cubic yards`}
            >
              {data.size} yd³
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 absolute bottom-1 left-3">
            {data.allowed_on_road && (
              <Badge
                variant="outline"
                className="border-green-500 text-green-300 bg-green-700"
                aria-label="Road placement allowed"
              >
                <CheckCircle className="w-3 h-3 mr-1" aria-hidden="true" />
                Road Placement
              </Badge>
            )}
            {data.allows_heavy_waste && (
              <Badge
                variant="outline"
                className="border-orange-500 text-orange-300 bg-orange-700"
                aria-label="Heavy waste allowed"
              >
                <CheckCircle className="w-3 h-3 mr-1" aria-hidden="true" />
                Heavy Waste
              </Badge>
            )}
          </div>
        </div>

        <h3
          id={`card-title-${data.id}`}
          className="text-xl font-bold text-white px-4"
        >
          {data.size} Yard Skip
        </h3>
      </CardHeader>

      <div className="flex flex-col justify-between gap-4 h-full">
        <CardContent className="space-y-4 px-4">
          {/* Pricing Section */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Price (excl. VAT)</span>
              <span className="text-white font-semibold">
                £{data.price_before_vat}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">VAT ({data.vat}%)</span>
              <span className="text-white">
                £{((data.price_before_vat * data.vat) / 100).toFixed(2)}
              </span>
            </div>
            <hr className="border-gray-600 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">Total Price</span>
              <span className="text-green-400 font-bold text-lg">
                £{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar
                className="w-4 h-4 text-blue-400 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-gray-300">Hire Period:</span>
              <span className="text-white font-medium">
                {data.hire_period_days} days
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin
                className="w-4 h-4 text-blue-400 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-gray-300">Postcode:</span>
              <span className="text-white font-medium">{data.postcode}</span>
            </div>

            {data.transport_cost && (
              <div className="flex items-center space-x-2">
                <Truck
                  className="w-4 h-4 text-blue-400 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-gray-300">Transport:</span>
                <span className="text-white font-medium">
                  £{data.transport_cost}
                </span>
              </div>
            )}

            {data.per_tonne_cost && (
              <div className="flex items-center space-x-2">
                <Coins
                  className="w-4 h-4 text-blue-400 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-gray-300">Per Tonne:</span>
                <span className="text-white font-medium">
                  £{data.per_tonne_cost}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-2">
          <Button
            onClick={handleSelect}
            className={`
            w-full font-semibold transition-all duration-200 
            ${isSelected ? "bg-green-600 hover:bg-green-700 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"}
          `}
          >
            {isSelected ? (
              <span className="flex items-center gap-4">
                <CheckCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                Selected
              </span>
            ) : (
              "Select this Skip"
            )}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
