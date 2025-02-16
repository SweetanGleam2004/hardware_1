import { supabase } from './supabase';
import type { Product, Order, OrderItem, Profile } from '../types';

// Products
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getProductsByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const updateProductStock = async (productId: string, quantity: number) => {
  const { error } = await supabase.rpc('update_product_stock', {
    p_id: productId,
    quantity: quantity
  });
  
  if (error) throw error;
};

// Orders
export const createOrder = async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();
  
  if (orderError) throw orderError;

  // Create order items
  const orderItems = order.items.map(item => ({
    order_id: orderData.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_time: item.price
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  // Update product stock
  for (const item of order.items) {
    await updateProductStock(item.product_id, -item.quantity);
  }

  return orderData;
};

export const getOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);
  
  if (error) throw error;
};

// Wishlist
export const addToWishlist = async (productId: string) => {
  const { data, error } = await supabase
    .from('wishlists')
    .insert([{ product_id: productId }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const removeFromWishlist = async (productId: string) => {
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .match({ product_id: productId });
  
  if (error) throw error;
};

export const getWishlist = async () => {
  const { data, error } = await supabase
    .from('wishlists')
    .select(`
      *,
      product:products (*)
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Profile
export const updateProfile = async (updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', supabase.auth.getUser().then(({ data }) => data.user?.id))
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Admin
export const isAdmin = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return data?.role === 'admin';
};

// Real-time subscriptions
export const subscribeToProducts = (callback: (product: Product) => void) => {
  return supabase
    .channel('products')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'products' },
      (payload) => callback(payload.new as Product)
    )
    .subscribe();
};

export const subscribeToOrders = (callback: (order: Order) => void) => {
  return supabase
    .channel('orders')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'orders' },
      (payload) => callback(payload.new as Order)
    )
    .subscribe();
};