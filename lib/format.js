export function prix(p) {
  if (p.price_amount == null) return "Prix non communiqué";
  return Number(p.price_amount).toLocaleString("fr-FR", {
    style: "currency",
    currency: p.price_currency,
    maximumFractionDigits: 0,
  });
}

export const typePrix = {
  auction_sold: "Adjugé aux enchères",
  current_bid: "Enchère en cours",
  dealer_price: "Prix marchand",
  dealer_ask: "Prix demandé",
};

export const categories = { jean: "Jean", veste: "Veste" };
