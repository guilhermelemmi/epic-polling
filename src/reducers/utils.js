export default function sortQuotesByPrice(ids, content) {
  ids.sort((firstId, secondId) => {
    const firstAmount = content[firstId] ? content[firstId].amount : undefined;
    const secondAmount = content[secondId] ? content[secondId].amount : undefined;
    if (firstAmount && secondAmount && firstAmount !== secondAmount) {
      return firstAmount > secondAmount ? 1 : -1;
    }
    return 0;
  });
  return ids;
}
