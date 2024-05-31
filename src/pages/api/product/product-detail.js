export async function fetchProductDetailData(id) {
    const response = await fetch(`http://localhost:5000/api/v1/product-id/${id}`);
    const data = await response.json();
  
    return data;
  }