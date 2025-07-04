import supabase from '../config/db.js'

export async function getOrders(){
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
        if (error) {
            console.error('Error fetching orders:', error.message);
            return { error: error.message };
        }

        return { data };
    } catch (err) {
        console.error('Unexpected error:', err.message);
        return { error: 'Something went wrong while fetching orders.' };
    }
}

export async function getOrder(id) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('(*,order_items(*))')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('Error fetching order:', error.message);
            return { error: error.message };
        }

        data={
            ...data,
            order_items: data.order_items.map(item => ({
                ...item,
                product: {
                    ...item.product,
                    product_sizes: item.product.product_sizes || []
                }
            }))
        }

        return { data };
    } catch (err) {
        console.error('Unexpected error:', err.message);
        return { error: 'Something went wrong while fetching the order.' };
    }
}

export async function createOrder(user_id, total, shipping_address, wilaya, ZIP_code, notes, phone){
    try {
        const { data, error } = await supabase
            .from('orders')
            .insert({
                user_id: user_id,
                total: total,
                shipping_address: shipping_address,
                status: 'pending',
                wilaya: wilaya,
                ZIP_CODE: ZIP_code,
                notes: notes,
                phone: phone
            })
            .select('*')
            .single();

        if (error) {
            console.error('Error creating order:', error.message);
            return { error: error.message };
        }

        return { data };
    } catch (err) {
        console.error('Unexpected error:', err.message);
        return { error: 'Something went wrong while creating the order.' };
    }
}

export async function addItemToOrder(order_id, product_id, quantity, size) {
    try {
        const { data, error } = await supabase
            .from('order_items')
            .insert({
                order_id: order_id,
                product_id: product_id,
                quantity: quantity,
                selected_size: size
            })
            .select('*')
            .single();

        if (error) {
            console.error('Error adding item to order:', error.message);
            return { error: error.message };
        }

        return { data };
    } catch (err) {
        console.error('Unexpected error:', err.message);
        return { error: 'Something went wrong while adding the item to the order.' };
    }
}

export async function FetchQuantity(id){
    try {
        const { data, error } = await supabase
            .from('cart')
            .select('quantity')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching quantity:', error.message);
            return { error: error.message };
        }

        return {data};
    } catch (err) {
        console.error('Unexpected error:', err.message);
        return { error: 'Something went wrong while fetching the quantity.' };
    }
}

export async function deleteCartItem(id) {
    try {
        const { data, error } = await supabase
            .from('cart')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting cart item:', error.message);
            return { error: error.message };
        }

        return { data };
    } catch (err) {
        console.error('Unexpected error:', err.message);
        return { error: 'Something went wrong while deleting the cart item.' };
    }
}


export async function update(id, action){
    try {
        
        const currentQuantity = await FetchQuantity(id);
        const {error, data} = await supabase
            .from('cart')
            .update({ quantity: action === 'increase' ? currentQuantity.data.quantity + 1 : currentQuantity.data.quantity - 1 })
            .eq('id', id)
        if (error) {
            console.error('Error updating quantity:', error.message);
            return { error: error.message };
        }
        if( action === 'decrease' && currentQuantity.data.quantity <= 1) {
            // If quantity is 0 or less, delete the item
            const deleteResult = await deleteCartItem(id);
            if (deleteResult.error) {
                return { error: deleteResult.error };
            }
        }
        return { data };
    } catch (error) {
        console.error('Error updating quantity:', error.message);
        return { error: 'Internal server error' };
    }
}

export async function getTotal(user_id) {
    try {
        const { data, error } = await supabase
            .from('cart')
            .select('quantity, product_id, product_sizes (price)')
            .eq('user_id', user_id)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error.message);
                }
                return response.data.reduce((total, item) => {
                    return total + (item.quantity * (item.product_sizes ? item.product_sizes.price : 0));
                }, 0);
            });
        if (error) {
            console.error('Error fetching total:', error.message);
            return { error: error.message };
        }
        return { total: data };

    } catch (err) {
        console.error('Unexpected error:', err.message);
        return { error: 'Something went wrong while fetching the total.' };
    }
}