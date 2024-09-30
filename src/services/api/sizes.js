export const getAllSizes = async () => {
  const res = await fetch("http://localhost:8000/api/sizes", {
    method: "GET",
  });
  const sizes = await res.json();
  return sizes;
};