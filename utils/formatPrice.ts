/**
 * Formats a price in Japanese Yen
 * @param price - The price to format
 * @returns Formatted price string with ¥ symbol
 */
export const formatPrice = (price: number): string => {
  return `¥${price.toLocaleString()}`;
};
