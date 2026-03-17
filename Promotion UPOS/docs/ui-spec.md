# UI Specification: Add Promotion Modal

## Overview
The "Add Promotion" modal should be organized into logical sections to reduce cognitive load on the user.

## Design Tokens (Alignment with docs/design-tokens.json)
- **Primary Color**: `#5e5ce6` (Royal Blue)
- **Surface**: Background `White`, Section Header `Gray-50`
- **Typography**: Inter/Outfit, Bold for headings, Semibold for labels.
- **Spacing**: `gap-6` between sections, `gap-4` between fields in a row.

## Layout Structure

### 1. Header
- Title: "เพิ่มโปรโมชั่น"
- Subtitle: "กรอกข้อมูลรายละเอียดเพื่อสร้างตัวเลือกโปรโมชั่นใหม่"
- Close button (X) top right.

### 2. Content Sections (Scrollable)

#### Section A: ข้อมูลเบื้องต้น (Basic Information)
- ชื่อโปรโมชั่น (Full width)
- สิทธิการใช้งาน | ประเภทโปรโมชั่น (Row 1:1)

#### Section B: การกำหนดเงื่อนไข (Product & Scope)
- ประเภทสินค้า (Full width Selection)
- รายการสินค้า (MultiSelect)
- [Dynamic list of quantities for selected items]

#### Section C: กฎส่วนลด (Discount Rules)
- รูปแบบส่วนลด | มูลค่าส่วนลด (Row 1:1)
- จำกัดส่วนลดสูงสุด (Full width)
- จำนวนโปรโมชั่นคงเหลือ (Full width)

#### Section D: ระยะเวลา (Schedule)
- วันที่เริ่มต้น | วันที่สิ้นสุด (Row 1:1 with clear labels)
- เวลาที่เริ่ม | เวลาที่สิ้นสุด (Row 1:1 with clock icons)

### 3. Footer
- Fixed at bottom.
- Buttons:
  - "ยกเลิก": `variant="outline"` or `secondary` (instead of danger).
  - "สร้างโปรโมชั่น": `variant="primary"`

## Refinement Goal
- Remove "redundant labels".
- Add "Section Headings" for clarity.
- Ensure "Mobile-First" responsiveness (even for modals).
