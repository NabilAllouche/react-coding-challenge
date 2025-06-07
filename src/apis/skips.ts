import api from "@/lib/axios";

export const getSkips = async () => {
  try {
    const response = await api.get(
      "/skips/by-location?postcode=NR32&area=Lowestoft"
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error fetching skips:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch skips",
    };
  }
};
