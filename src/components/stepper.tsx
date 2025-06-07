import {
  MapPin,
  Trash2,
  Truck,
  Shield,
  Calendar,
  CreditCard,
  Check,
} from "lucide-react";

interface Step {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "completed" | "current" | "upcoming";
}

const getStepStyles = (status: Step["status"]) => {
  switch (status) {
    case "completed":
      return {
        container: "text-purple-400",
        icon: "bg-purple-600 text-white border-purple-600",
        connector: "bg-purple-600",
      };
    case "current":
      return {
        container: "text-purple-400",
        icon: "bg-purple-600 text-white border-purple-600",
        connector: "bg-gray-600",
      };
    case "upcoming":
      return {
        container: "text-gray-500",
        icon: "bg-gray-700 text-gray-400 border-gray-600",
        connector: "bg-gray-600",
      };
  }
};

export default function BookingStepper({
  currentStep = 3,
}: {
  currentStep?: number;
}) {
  const steps: Step[] = [
    {
      id: "postcode",
      label: "Postcode",
      icon: MapPin,
      status:
        currentStep > 1
          ? "completed"
          : currentStep === 1
            ? "current"
            : "upcoming",
    },
    {
      id: "waste-type",
      label: "Waste Type",
      icon: Trash2,
      status:
        currentStep > 2
          ? "completed"
          : currentStep === 2
            ? "current"
            : "upcoming",
    },
    {
      id: "select-skip",
      label: "Select Skip",
      icon: Truck,
      status:
        currentStep > 3
          ? "completed"
          : currentStep === 3
            ? "current"
            : "upcoming",
    },
    {
      id: "permit-check",
      label: "Permit Check",
      icon: Shield,
      status:
        currentStep > 4
          ? "completed"
          : currentStep === 4
            ? "current"
            : "upcoming",
    },
    {
      id: "choose-date",
      label: "Choose Date",
      icon: Calendar,
      status:
        currentStep > 5
          ? "completed"
          : currentStep === 5
            ? "current"
            : "upcoming",
    },
    {
      id: "payment",
      label: "Payment",
      icon: CreditCard,
      status:
        currentStep > 6
          ? "completed"
          : currentStep === 6
            ? "current"
            : "upcoming",
    },
  ];

  return (
    <div className={`w-full `}>
      {/* Standard Horizontal Stepper for most screens */}
      <nav aria-label="Progress" className="mb-8">
        <ol className="flex items-center justify-between w-full max-w-4xl mx-auto px-2 md:px-4">
          {steps.map((step, index) => {
            const styles = getStepStyles(step.status);
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <li key={step.id} className="flex items-center flex-1 relative">
                <div className="flex flex-col items-center">
                  {/* Step Icon */}
                  <div
                    className={`
                        relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-200
                        ${styles.icon}
                      `}
                    aria-current={
                      step.status === "current" ? "step" : undefined
                    }
                  >
                    {step.status === "completed" ? (
                      <Check
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <Icon
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Step Label - Hidden on very small screens */}
                  <span
                    className={`
                        mt-2 text-xs sm:text-sm font-medium transition-colors duration-200 hidden sm:block
                        ${styles.container}
                      `}
                  >
                    {step.label}
                  </span>

                  {/* Mobile tooltip for very small screens */}
                  <span
                    className={`
                        absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs font-medium bg-gray-800 px-2 py-1 rounded
                        whitespace-nowrap opacity-0 pointer-events-none transition-opacity
                        ${step.status === "current" ? "xs:hidden group-hover:opacity-100" : "xs:hidden"}
                        ${styles.container}
                      `}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={`
                        flex-1 h-0.5 mx-1 xs:mx-2 sm:mx-4 transition-colors duration-200
                        ${styles.connector}
                      `}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
