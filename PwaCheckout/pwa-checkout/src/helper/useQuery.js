import { useLocation } from "react-router-dom";

export const useQuery = () => {
  const { search } = useLocation();
  const state = new URLSearchParams(search).get("state");
  return state
}