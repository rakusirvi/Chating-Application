import React from "react";
import { useAuthStore } from "../store/useAuthStore";
export const HomePage = () => {
  const { authUser } = useAuthStore();
  return <div>HomePage</div>;
};
