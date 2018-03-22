export default function normalize(data) {
  const normalized = { ids: [], content: {} };
  data.forEach((item) => {
    normalized.ids.push(item.id);
    normalized.content[item.id] = item;
  });
  return normalized;
}
