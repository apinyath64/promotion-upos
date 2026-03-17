import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Download,
    Edit2,
    Trash2,
    Copy,
    Settings
} from 'lucide-react';
import {
    Button,
    Breadcrumb,
    Badge,
    Pagination,
    DropdownMenu
} from './components/common/UI';
import PromotionWizard from './components/promotion/PromotionWizard';
import { Sidebar } from './components/layout/Sidebar';

interface Promotion {
    id: string;
    name: string;
    type: string;
    status: 'active' | 'scheduled' | 'expired';
    startDate: string;
    endDate: string;
    usageCount: number;
    limit: number;
}

const mockPromotions: Promotion[] = [
    { id: '1', name: 'โปรโมชั่นรับหน้าร้อน 2024', type: 'ส่วนลดเปอร์เซ็นต์', status: 'active', startDate: '2024-06-01', endDate: '2024-08-31', usageCount: 142, limit: 200 },
    { id: '2', name: 'ซื้อ 1 แถม 1 - กาแฟ', type: 'BOGO (ซื้อ 1 แถม 1)', status: 'scheduled', startDate: '2024-04-01', endDate: '2024-04-07', usageCount: 0, limit: 100 },
    { id: '3', name: 'ลดแหลกช่วงสุดสัปดาห์', type: 'ส่วนลดจำนวนเงินคงที่', status: 'active', startDate: '2024-03-09', endDate: '2024-03-10', usageCount: 89, limit: 150 },
];

const App: React.FC = () => {
    const [showWizard, setShowWizard] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter logic
    const filteredPromotions = mockPromotions.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalItems = filteredPromotions.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPromotions = filteredPromotions.slice(startIndex, startIndex + itemsPerPage);

    const toggleSelectAll = () => {
        if (selectedIds.length === paginatedPromotions.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(paginatedPromotions.map(p => p.id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const breadcrumbItems = [
        { label: 'หน้าหลัก', href: '#' },
        { label: 'การจัดการโปรโมชั่น' }
    ];

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
                <div className="main-content">
                    {/* Breadcrumb Section */}
                    <Breadcrumb items={breadcrumbItems} />

                    {/* Page Header Section */}
                    <header className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight mb-1">การจัดการโปรโมชั่น</h1>
                            <p className="text-gray-500 text-sm">จัดการและกำหนดค่าโปรโมชั่นทั้งหมดในระบบของคุณ</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2 text-sm px-4 py-2 border-slate-200">
                                <Download size={16} /> ส่งออกข้อมูล
                            </Button>
                            <Button onClick={() => setShowWizard(true)} className="gap-2 text-sm px-4 py-2 shadow-sm">
                                <Plus size={16} /> สร้างโปรโมชั่นใหม่
                            </Button>
                        </div>
                    </header>

                    {/* Main Content Area */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

                        {/* Action Toolbar */}
                        <div className="p-6 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex gap-4 flex-1 min-w-[400px]">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="ค้นหาชื่อโปรโมชั่น หรือรหัส..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5ce6]/20 transition-all"
                                    />
                                </div>
                                <Button variant="outline" className="gap-2 text-sm px-4 py-2.5 border-slate-200 bg-white shadow-sm">
                                    <Filter size={16} /> ตัวกรอง
                                </Button>
                            </div>
                            <div className="flex items-center gap-3">
                                {selectedIds.length > 0 && (
                                    <div className="flex items-center gap-3 mr-4 pr-4 border-r border-gray-100">
                                        <span className="text-sm font-semibold text-gray-600">เลือกแล้ว {selectedIds.length} รายการ</span>
                                        <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 px-2 h-9" onClick={() => setSelectedIds([])}>
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                )}
                                <button className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
                                    <Settings size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 sticky top-0 z-10">
                                    <tr className="border-b border-gray-100">
                                        <th className="px-6 py-5 w-14">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded border-gray-300 text-[#5e5ce6] focus:ring-[#5e5ce6]"
                                                checked={selectedIds.length === paginatedPromotions.length && paginatedPromotions.length > 0}
                                                onChange={toggleSelectAll}
                                            />
                                        </th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-tight min-w-[320px]">โปรโมชั่นและการจัดการ</th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-tight min-w-[180px]">ประเภทส่วนลด</th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-tight min-w-[150px]">ระยะเวลากิจกรรม</th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-tight min-w-[120px]">สถานะปัจจุบัน</th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-tight min-w-[200px]">การใช้งาน (สถิติ)</th>
                                        <th className="px-6 py-5 text-right w-16"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginatedPromotions.map((promo) => (
                                        <tr
                                            key={promo.id}
                                            className={`transition-colors hover:bg-blue-50/30 ${selectedIds.includes(promo.id) ? 'bg-indigo-50/30' : ''}`}
                                        >
                                            <td className="px-6 py-5">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 rounded border-gray-300 text-[#5e5ce6] focus:ring-[#5e5ce6]"
                                                    checked={selectedIds.includes(promo.id)}
                                                    onChange={() => toggleSelect(promo.id)}
                                                />
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-gray-900 text-[15px]">{promo.name}</div>
                                                <div className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-wider">ID: PROM-{promo.id}00{promo.id}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-sm font-medium text-gray-600">{promo.type}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-sm font-semibold text-gray-700">{promo.startDate}</div>
                                                <div className="text-xs text-gray-400 mt-0.5 font-medium">ถึง {promo.endDate}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <Badge variant={
                                                    promo.status === 'active' ? 'success' :
                                                        promo.status === 'scheduled' ? 'warning' : 'neutral'
                                                } className="px-3 py-1">
                                                    {promo.status === 'active' ? 'เปิดใช้งาน' : promo.status === 'scheduled' ? 'รอเปิด' : 'หมดอายุ'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex justify-between items-center mb-0.5">
                                                        <span className="text-xs font-bold text-gray-400">{Math.round((promo.usageCount / promo.limit) * 100)}%</span>
                                                        <span className="text-xs font-bold text-gray-600">{promo.usageCount}/{promo.limit}</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full transition-all duration-500 rounded-full ${promo.status === 'active' ? 'bg-[#5e5ce6]' : 'bg-gray-300'}`}
                                                            style={{ width: `${(promo.usageCount / promo.limit) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <DropdownMenu
                                                    options={[
                                                        { label: 'แก้ไขโปรโมชั่น', onClick: () => { }, icon: <Edit2 size={14} /> },
                                                        { label: 'คัดลอกรหัส', onClick: () => { }, icon: <Copy size={14} /> },
                                                        { label: 'ลบรายการ', onClick: () => { }, variant: 'danger', icon: <Trash2 size={14} /> },
                                                    ]}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    {paginatedPromotions.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-medium">
                                                ไม่พบข้อมูลโปรโมชั่นที่ค้นหา
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Area */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(totalItems / itemsPerPage) || 1}
                            onPageChange={setCurrentPage}
                            itemsPerPage={itemsPerPage}
                            onItemsPerPageChange={(count) => {
                                setItemsPerPage(count);
                                setCurrentPage(1);
                            }}
                            totalItems={totalItems}
                        />
                    </div>
                </div>
            </main>

            {showWizard && <PromotionWizard onClose={() => setShowWizard(false)} />}
        </div>
    );
};

export default App;
