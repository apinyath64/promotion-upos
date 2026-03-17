export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
}

const mockProducts: Product[] = [
    { id: 'p1', name: 'สลัดไก่', category: 'อาหาร', price: 89.00, stock: 50 },
    { id: 'p2', name: 'ชาบูหมู', category: 'อาหาร', price: 299.00, stock: 20 },
    { id: 'p3', name: 'โค้ก', category: 'เครื่องดื่ม', price: 20.00, stock: 100 },
    { id: 'p4', name: 'ชุดอาหารเช้า', category: 'อาหาร', price: 120.00, stock: 30 },
    { id: 'p5', name: 'ชาบูเนื้อ', category: 'อาหาร', price: 399.00, stock: 15 },
    { id: 'p6', name: 'Selected choice A', category: 'หมวดหมู่ A', price: 10.00, stock: 100 },
    { id: 'p7', name: 'Choice B', category: 'หมวดหมู่ B', price: 20.00, stock: 100 },
    { id: 'p8', name: 'Choice C', category: 'หมวดหมู่ C', price: 30.00, stock: 100 },
];

export const productService = {
    getProducts: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockProducts;
    },
    searchProducts: async (query: string) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const lowerQuery = query.toLowerCase();
        return mockProducts.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        );
    }
};
