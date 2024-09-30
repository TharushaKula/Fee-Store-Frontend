const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const getAllCategories = async () => {
  const res = await fetch("http://localhost:8000/api/categories", {
    method: "GET",
  });
  const categories = await res.json();
  return categories;
};
