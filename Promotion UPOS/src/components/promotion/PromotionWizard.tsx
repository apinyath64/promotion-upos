import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Clock } from 'lucide-react';
import { Button, Input, Select, MultiSelect } from '../common/UI';
import { productService, type Product } from '../../services/productService';

interface PromotionFormProps {
    onClose: () => void;
}

const PromotionForm: React.FC<PromotionFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        roles: 'member',
        promoType: 'discount',
        productType: 'items',
        selectedProducts: [] as string[],
        productQuantities: {} as Record<string, number>,
        discountType: 'pct',
        discountValue: 0,
        maxDiscount: 0,
        startDate: '',
        endDate: '',
        startTime: '00:01',
        endTime: '23:59',
        remainingLimit: 0,
    });

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        productService.getProducts().then(setProducts);
    }, []);

    const updateData = (newData: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const handleProductChange = (values: string[]) => {
        const newQuantities = { ...formData.productQuantities };
        // Add default quantity 1 for newly selected products
        values.forEach(id => {
            if (!newQuantities[id]) newQuantities[id] = 1;
        });
        // Remove quantities for deselected products
        Object.keys(newQuantities).forEach(id => {
            if (!values.includes(id)) delete newQuantities[id];
        });
        setFormData(prev => ({ ...prev, selectedProducts: values, productQuantities: newQuantities }));
    };

    const updateQuantity = (id: string, val: number) => {
        setFormData(prev => ({
            ...prev,
            productQuantities: { ...prev.productQuantities, [id]: val }
        }));
    };

    const roleOptions = [
        { label: 'สมาชิก', value: 'member' },
        { label: 'ลูกค้าทั่วไป', value: 'general' },
    ];

    const promoTypeOptions = [
        { label: 'ส่วนลด (%, บาท)', value: 'discount' },
        { label: 'แลกซื้อ', value: 'exchange' },
        { label: 'ของแถม', value: 'gift' },
    ];

    const productTypeOptions = [
        { label: 'รายสินค้า (ชิ้น)', value: 'items' },
        { label: 'หมวดหมู่ (ชิ้น)', value: 'categories' },
        { label: 'ยอดซื้อ (บาท)', value: 'amount' },
    ];

    const discountTypeOptions = [
        { label: 'ลด (%)', value: 'pct' },
        { label: 'ลด (บาท)', value: 'fixed' },
    ];

    const productOptions = products.map(p => ({ label: p.name, value: p.id }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-hidden"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">สร้างโปรโมชั่นใหม่</h2>
                        <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">การตั้งค่าตัวเลือกโปรโมชั่น</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                    {/* Section: Basic Information */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-4 bg-[#5e5ce6] rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">ข้อมูลเบื้องต้น</h3>
                        </div>
                        <Input
                            label="ชื่อโปรโมชั่น"
                            placeholder="เช่น โปรน้ำดื่ม 10 บาท..."
                            value={formData.name}
                            onChange={e => updateData({ name: e.target.value })}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                label="สิทธิการใช้งาน"
                                value={formData.roles}
                                options={roleOptions}
                                onChange={val => updateData({ roles: val })}
                            />
                            <Select
                                label="ประเภทโปรโมชั่น"
                                value={formData.promoType}
                                options={promoTypeOptions}
                                onChange={val => updateData({ promoType: val })}
                            />
                        </div>
                    </div>

                    {/* Section: Product Selection */}
                    <div className="space-y-4 pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-4 bg-[#5e5ce6] rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">เงื่อนไขสินค้า</h3>
                        </div>
                        <Select
                            label="ประเภทเงื่อนไข"
                            value={formData.productType}
                            options={productTypeOptions}
                            onChange={val => updateData({ productType: val })}
                        />

                        <MultiSelect
                            label="เลือกรายการสินค้า"
                            values={formData.selectedProducts}
                            options={productOptions}
                            onChange={handleProductChange}
                            placeholder="ค้นหาและเลือกสินค้า..."
                        />

                        {/* Selected Products List */}
                        {formData.selectedProducts.length > 0 && (
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                {formData.selectedProducts.map(id => {
                                    const product = products.find(p => p.id === id);
                                    if (!product) return null;
                                    return (
                                        <div key={id} className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700">{product.name}</span>
                                            <div className="w-24 flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    className="text-center px-2 py-1.5 h-9 rounded-lg border-gray-200"
                                                    value={formData.productQuantities[id] || 1}
                                                    onChange={e => updateQuantity(id, parseInt(e.target.value) || 0)}
                                                />
                                                <span className="text-xs text-gray-400 font-bold uppercase">ชิ้น</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Section: Discount Rules */}
                    <div className="space-y-4 pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-4 bg-[#5e5ce6] rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">สิทธิประโยชน์และโควตา</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                label="รูปแบบส่วนลด"
                                value={formData.discountType}
                                options={discountTypeOptions}
                                onChange={val => updateData({ discountType: val })}
                            />
                            <Input
                                label="มูลค่าส่วนลด"
                                type="number"
                                value={formData.discountValue}
                                onChange={e => updateData({ discountValue: parseFloat(e.target.value) || 0 })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="จำกัดส่วนลดสูงสุด (บาท)"
                                type="number"
                                placeholder="0 = ไม่จำกัด"
                                value={formData.maxDiscount}
                                onChange={e => updateData({ maxDiscount: parseFloat(e.target.value) || 0 })}
                            />
                            <Input
                                label="จำนวนโควตารวม"
                                type="number"
                                value={formData.remainingLimit}
                                onChange={e => updateData({ remainingLimit: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                    </div>

                    {/* Section: Schedule */}
                    <div className="space-y-4 pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-4 bg-[#5e5ce6] rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">ระยะเวลาโปรโมชั่น</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="วันที่เริ่ม"
                                type="date"
                                value={formData.startDate}
                                onChange={e => updateData({ startDate: e.target.value })}
                            />
                            <Input
                                label="วันที่สิ้นสุด"
                                type="date"
                                value={formData.endDate}
                                onChange={e => updateData({ endDate: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="เวลาที่เริ่ม"
                                type="time"
                                icon={<Clock size={16} />}
                                value={formData.startTime}
                                onChange={e => updateData({ startTime: e.target.value })}
                            />
                            <Input
                                label="เวลาที่สิ้นสุด"
                                type="time"
                                icon={<Clock size={16} />}
                                value={formData.endTime}
                                onChange={e => updateData({ endTime: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-gray-100 flex gap-4 bg-gray-50/50">
                    <Button variant="secondary" className="flex-1 py-3.5 text-sm font-bold" onClick={onClose}>
                        ยกเลิกการแก้ไข
                    </Button>
                    <Button variant="primary" className="flex-1 py-3.5 text-sm font-bold" onClick={() => {
                        alert('บันทึกโปรโมชั่นสำเร็จ!');
                        onClose();
                    }}>
                        บันทึกโปรโมชั่น
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PromotionForm;
