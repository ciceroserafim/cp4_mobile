// useMotivation.js
import { useQuery } from "@tanstack/react-query";

async function fetchQuote() {
  const res = await fetch("https://api.quotable.io/random");
  if (!res.ok) throw new Error("Erro ao buscar citação");
  return res.json(); // { content, author }
}

export default function useMotivation() {
  return useQuery(["motivation", "random"], fetchQuote, {
    staleTime: 1000 * 60 * 5, // 5min
    retry: 1
  });
}
