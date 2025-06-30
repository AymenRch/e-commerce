import { createItem, getItems, getItem, deleteItem, updatePrice, addSize, updateSize, deleteSize, getSizes } from '../models/itemModel.js';

export async function createItemController(req, res) {

    const {
        name, brand, price, original_price, image, images,
        category, fragrance_family, description,
        top_notes, middle_notes, base_notes,
        rating, reviews, featured
    } = req.body;
    
    try {
        const data = await createItem(
        name, brand, price, original_price, image, images,
        category, fragrance_family, description,
        top_notes, middle_notes, base_notes,
        rating, reviews, featured
        );
    
        if (data.error) {
        return res.status(500).json({ error: data.error.message });
        }
    
        return res.status(201).json(data);
    } catch (error) {
        console.error('Error in createItemController:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getAllItemsController(req, res) {
    try {
        const data = await getItems();
    
        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }
    
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in getItemsController:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getItemController(req, res) {
    const { id } = req.params;

    try {
        const response = await getItem(id);

        if (response.error) {
            return res.status(500).json({ error: response.error.message });
        }

        if (!response.data) {
            return res.status(404).json({ error: 'Item not found' });
        }

        console.log('Item data:', response.data);
        return res.status(200).json({ data: response.data });

    } catch (error) {
        console.error('Error in getItemController:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



export async function deleteItemController(req, res) {
    const {id} = req.params;
    try {
        const data = await deleteItem(id);

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        if (!data) {
            return res.status(404).json({ error: 'Item not found' });
        }

        return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error in deleteItemController:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updatePriceController(req, res) {
    const { id } = req.params;
    const { price } = req.body;

    try {
        const data = await updatePrice(id, price);

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        if (!data) {
            return res.status(404).json({ error: 'Item not found' });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in updatePriceController:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function addSizeController(req, res) {
    const { id } = req.params;
    const { size, quantity } = req.body;

    try {
        const data = await addSize(id, size, quantity);

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in addSizeController:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateSizeController(req, res) {
    const { id } = req.params;
    const { size, quantity } = req.body;

    try {
        const data = await updateSize(id, size, quantity);

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in updateSizeController:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteSizeController(req, res) {
    const { id } = req.params;
    const { size } = req.body;

    try {
        const data = await deleteSize(id, size);

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in deleteSizeController:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getSizesController(req, res) {
    const { id } = req.params;

    try {
        const data = await getSizes(id);

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        if (!data) {
            return res.status(404).json({ error: 'Sizes not found for this item' });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in getSizesController:', error);
        return res.status(500).json({ error: 'Internal server error' });
}
}