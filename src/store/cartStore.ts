import { create } from "zustand";

type CartLine = { card: PokemonCard; qty: number };

type CartState = {
  lines: Record<string, CartLine>;
  addItem: (card: PokemonCard, qty?: number) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const useCartStore = create<CartState>((set, get) => ({
  lines: {},
  addItem: (card, qty = 1) => set((state) => {
    const currentQty = state.lines[card.id]?.qty ?? 0;
    return { lines: { ...state.lines, [card.id]: { card, qty: currentQty + qty } } };
  }),
  increaseQty: (id) => set((state) => ({
    lines: {
      ...state.lines,
      [id]: { ...state.lines[id], qty: state.lines[id].qty + 1 },
    },
  })),
  decreaseQty: (id) => set((state) => {
    const newQty = state.lines[id].qty - 1;
    const updatedLines = { ...state.lines };
    if (newQty <= 0) delete updatedLines[id];
    else updatedLines[id] = { ...updatedLines[id], qty: newQty };
    return { lines: updatedLines };
  }),
  removeItem: (id) => set((state) => {
    const updatedLines = { ...state.lines };
    delete updatedLines[id];
    return { lines: updatedLines };
  }),
  clearCart: () => set({ lines: {} }),
}));

const cartTotals = (cartItemsMap: Record<string, CartLine>) => {
  const cartItems = Object.values(cartItemsMap);

  const totalQuantity = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.qty,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, cartItem) =>
      sum +
      (cartItem.card.cardmarket?.prices?.averageSellPrice ?? 0) *
        cartItem.qty,
    0
  );

  return { totalQuantity, totalPrice };
};

export { useCartStore, cartTotals };

