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