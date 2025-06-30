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