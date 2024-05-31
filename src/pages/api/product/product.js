export async function fetchProductData(page = 1) {
  const response = await fetch(`http://localhost:5000/api/v1/product?page=${page}`);
  const data = await response.json();

  return data;
}