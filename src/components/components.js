// ... other components

export function ProductCard(props) {
  // We pass the entire product object as a prop for convenience
  const { product } = props;

  // It's good practice to handle cases where data might be missing
  if (!product) {
    return "";
  }

  return ` 
    <article class="product-card" data-id="${product.id}"> 
      <img src="${product.image.url}" alt="${
        product.image.alt || product.name
      }"> 
      <h3>${product.name}</h3> 
      <p>Released: ${product.released}</p> 
    </article> 
  `;
}
