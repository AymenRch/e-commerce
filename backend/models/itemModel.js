import supabase from '../config/db.js';

export async function createItem(
  name, brand, price, original_price, image, images,
  category, fragrance_family, description,
  top_notes, middle_notes, base_notes,
  rating, reviews, featured
) {
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name,
      brand,
      price,
      original_price: original_price ?? price ,
      image,
      images,
      category,
      fragrance_family,
      description,
      top_notes,
      middle_notes,
      base_notes,
      rating,
      reviews,
      featured
    }]);

  if (error) {
    console.error('Error creating item:', error.message, error.details, error.hint);
    return error;
  }

  return data;
}

export async function getItems() {
    const { data, error } = await supabase
        .from('products')
        .select('*');
    
    if (error) {
        console.error('Error fetching items:', error.message, error.details, error.hint);
        return error;
    }
    
    return data;
}

export async function getItem(id){
    const { data, error } = await supabase
        .from('products')
        .select('*,product_sizes(*)')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error('Error fetching item:', error.message, error.details, error.hint);
        return error;
    }
    
    return data;
}

export async function deleteItem(id) {
    const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
    
    if (error) {
        console.error('Error deleting item:', error.message, error.details, error.hint);
        return error;
    }
    
    return data;
}

export async function updatePrice(id, price) {
    const { data, error } = await supabase
        .from('products')
        .update({ price })
        .eq('id', id);
    
    if (error) {
        console.error('Error updating item price:', error.message, error.details, error.hint);
        return error;
    }
    
    return data;
}

export async function addSize(id, size, quantity) {
    const { data, error } = await supabase
        .from('product_sizes')
        .insert([{ product_id: id, size, quantity }]);
        if (error) {
        console.error('Error updating item price:', error.message, error.details, error.hint);
        return error;
    }
    
    return data;
        
}

export async function deleteSize(id, size) {
    const { data, error } = await supabase
        .from('product_sizes')
        .delete()
        .eq('product_id', id)
        .eq('size', size);
    
    if (error) {
        console.error('Error deleting item size:', error.message, error.details, error.hint);
        return error;
    }
    
    return data;
}

export async function updateSize(id, size, quantity) {
    const { data, error } = await supabase
        .from('product_sizes')
        .update({ quantity })
        .eq('product_id', id)
        .eq('size', size);
    
    if (error) {
        console.error('Error updating item size:', error.message, error.details, error.hint);
        return error;
    }
    
    return data;
}

export async function getSizes(id) {
    const { data, error } = await supabase
        .from('product_sizes')
        .select('*')
        .eq('product_id', id);
    
    if (error) {
        console.error('Error fetching item sizes:', error.message, error.details, error.hint);
        return error;
    }
    
    return data;
}