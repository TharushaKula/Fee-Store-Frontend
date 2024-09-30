export const getAllColors = async () => {
  const res = await fetch("http://localhost:8000/api/colors", {
    method: "GET",
  });
  const colors = await res.json();
  return colors;
}