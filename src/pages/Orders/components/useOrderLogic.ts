import React, { useState, useEffect } from 'react';
import { EmployeeService } from '../../../services/api/employee';
import { DistributorService } from '../../../services/api/distributor';
import { RetailerService, Retailer } from '../../../services/api/retailer';
import { OrderService } from '../../../services/api/order';
import { InventoryService } from '../../../services/api/inventory';

export const useOrderLogic = (initialDistributorId?: string, initialRetailerName?: string) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [distributors, setDistributors] = useState<any[]>([]);
  const [filteredRetailers, setFilteredRetailers] = useState<Retailer[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  
  const [newOrder, setNewOrder] = useState({
    "Order ID": `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    "Distributor": initialDistributorId || "",
    "Customer Name": initialRetailerName || "", 
    "Sales Rep": "",
    "Status": "MỚI", 
    "Date": new Date().toISOString().split('T')[0]
  });

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Tải danh sách nhân viên, NPP, Đơn hàng và Kho hàng
  useEffect(() => {
    EmployeeService.getEmployees().then(setEmployees).catch(e => console.error('Sales fetch error:', e));
    DistributorService.getDistributors().then(setDistributors).catch(e => console.error('Dist fetch error:', e));
    OrderService.getOrders().then(setOrders).catch(e => console.error('Orders fetch error:', e));
    
    InventoryService.getInventory().then(data => {
      if (Array.isArray(data)) {
        const mappedProducts = data.map((item: any) => {
          // Tìm kiếm thông minh các cột dữ liệu
          const findValue = (keywords: string[]) => {
            const key = Object.keys(item).find(k => 
              keywords.some(kw => k.toUpperCase().includes(kw.toUpperCase()))
            );
            return key ? item[key] : null;
          };

          const id = findValue(["Item ID", "ITEM ID", "Product_ID", "Product ID", "ID"]) || "N/A";
          const name = findValue(["Item Name", "TÊN SẢN PHẨM", "Product_Name", "Product Name", "Tên", "Sản phẩm", "Name"]) || "Sản phẩm không tên";
          const price = parseInt(findValue(["ĐƠN GIÁ", "GIÁ BÁN", "Unit_Price", "Unit Price", "Price"]) || "100000"); // Mặc định 100k nếu chưa có cột giá
          
          return {
            id,
            name,
            price,
            shortName: id.toString().includes('-') ? id.toString().split('-').pop()?.toUpperCase() : id.toString().substring(0, 3).toUpperCase()
          };
        });
        setProducts(mappedProducts);
      }
    }).catch(e => console.error('Inventory fetch error:', e));
  }, []);

  // Tải danh sách đại lý khi NPP thay đổi
  useEffect(() => {
    const distId = newOrder["Distributor"];
    if (distId) {
      RetailerService.getRetailersByDistributor(distId)
        .then(data => {
          setFilteredRetailers(Array.isArray(data) ? data : []);
        })
        .catch(e => {
          console.error('Retailer fetch error:', e);
          setFilteredRetailers([]);
        });
    } else {
      setFilteredRetailers([]);
    }
  }, [newOrder["Distributor"]]);

  const calculateGrandTotal = () => {
    return products.reduce((sum, p) => {
      const qty = quantities[p.id] || 0;
      return sum + (qty * p.price);
    }, 0).toLocaleString();
  };

  const handleCreateOrder = async () => {
    const itemsToOrder = products.filter(p => (quantities[p.id] || 0) > 0);
    if (itemsToOrder.length === 0) {
      alert("Vui lòng nhập số lượng cho ít nhất 1 sản phẩm");
      return;
    }

    setIsSubmitting(true);
    try {
      for (const item of itemsToOrder) {
        // Ánh xạ sang tên cột trên Google Sheets (Dùng dấu gạch dưới)
        await OrderService.createOrder({
          "Order_ID": newOrder["Order ID"],
          "Employee_ID": newOrder["Sales Rep"],
          "Shop_ID": newOrder["Customer Name"],
          "Date": newOrder["Date"],
          "Status": newOrder["Status"],
          "Product": item.name,
          "Quantity": quantities[item.id].toString(),
          "Unit_Price": item.price.toLocaleString(),
          "Total_Amount": (quantities[item.id] * item.price).toLocaleString(),
          "Notes": "Đơn hàng từ App"
        });
      }
      
      setSaveSuccess(true);
      // Tải lại danh sách đơn hàng sau khi tạo
      const updatedOrders = await OrderService.getOrders();
      setOrders(updatedOrders);
      
      setTimeout(() => {
        setShowAddModal(false);
        setSaveSuccess(false);
        setQuantities({});
        setNewOrder({
          ...newOrder, 
          "Order ID": `ORD-${Math.floor(1000 + Math.random() * 9000)}`, 
          "Customer Name": "", 
          "Sales Rep": "",
          "Distributor": ""
        });
      }, 1500);
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      alert("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { 
    showAddModal, setShowAddModal, isSubmitting, saveSuccess, 
    employees, distributors, filteredRetailers, orders, products, newOrder, setNewOrder, quantities, setQuantities,
    handleCreateOrder, calculateGrandTotal 
  };
};
