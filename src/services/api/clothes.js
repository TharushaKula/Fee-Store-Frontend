export const getAllClothes = async () => {
  const res = await fetch("http://localhost:8000/api/clothes", {
    method: "GET",
  });
  const clothes = await res.json();
  return clothes;
}