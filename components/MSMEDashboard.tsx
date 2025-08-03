import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Package, 
  Scan, 
  Plus, 
  Search, 
  BarChart3, 
  Warehouse, 
  Settings,
  Bell,
  LogOut,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface MSMEDashboardProps {
  onLogout: () => void;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export function MSMEDashboard({ onLogout }: MSMEDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'scanner' | 'warehouse'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [products] = useState<Product[]>([
    { id: '1', name: 'Premium Rice Bags', sku: 'PRB001', category: 'Grains', stock: 120, price: 850, status: 'in-stock' },
    { id: '2', name: 'Organic Wheat Flour', sku: 'OWF002', category: 'Flour', stock: 15, price: 320, status: 'low-stock' },
    { id: '3', name: 'Cooking Oil Bottles', sku: 'COB003', category: 'Oil', stock: 0, price: 180, status: 'out-of-stock' },
    { id: '4', name: 'Basmati Rice', sku: 'BR004', category: 'Grains', stock: 85, price: 1200, status: 'in-stock' },
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalProducts: products.length,
    lowStock: products.filter(p => p.status === 'low-stock').length,
    outOfStock: products.filter(p => p.status === 'out-of-stock').length,
    totalValue: products.reduce((sum, p) => sum + (p.stock * p.price), 0)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg text-gray-800">MSME Dashboard</h1>
            <p className="text-sm text-gray-600">Warehouse Management</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-xl text-gray-800">{stats.totalProducts}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Low Stock</p>
                    <p className="text-xl text-gray-800">{stats.lowStock}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Out of Stock</p>
                    <p className="text-xl text-gray-800">{stats.outOfStock}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-xl text-gray-800">₹{stats.totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-4">
              <h3 className="text-lg text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-12 flex flex-col space-y-1"
                  onClick={() => setActiveTab('scanner')}
                >
                  <Scan className="w-5 h-5" />
                  <span className="text-xs">Scan Barcode</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 flex flex-col space-y-1"
                  onClick={() => setActiveTab('inventory')}
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-xs">Add Product</span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-gray-800">Inventory Management</h2>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="w-4 h-4 mr-1" />
                Add Product
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-3">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-600">SKU: {product.sku} • {product.category}</p>
                    </div>
                    <Badge variant={
                      product.status === 'in-stock' ? 'default' : 
                      product.status === 'low-stock' ? 'secondary' : 'destructive'
                    }>
                      {product.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                      <span className="text-sm text-gray-600">Price: ₹{product.price}</span>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'scanner' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg text-gray-800 mb-2">Barcode Scanner</h2>
              <p className="text-gray-600">Point your camera at a barcode to scan</p>
            </div>

            <Card className="p-8">
              <div className="text-center space-y-4">
                <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Scan className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Camera view</p>
                  </div>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Scan className="w-4 h-4 mr-2" />
                  Start Scanning
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-gray-800 mb-3">Recent Scans</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">8901030123456</span>
                  <span className="text-sm text-gray-500">2 mins ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">8901030789012</span>
                  <span className="text-sm text-gray-500">15 mins ago</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'warehouse' && (
          <div className="space-y-6">
            <h2 className="text-lg text-gray-800">Warehouse Tracking</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-800">Warehouse A</h3>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="text-gray-800">85% (850/1000)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temperature:</span>
                    <span className="text-gray-800">22°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Humidity:</span>
                    <span className="text-gray-800">45%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-800">Warehouse B</h3>
                  <Badge variant="secondary">Maintenance</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="text-gray-800">60% (300/500)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temperature:</span>
                    <span className="text-gray-800">18°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Humidity:</span>
                    <span className="text-gray-800">50%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t px-2 py-3">
        <div className="flex justify-around">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            className="flex flex-col items-center space-y-1 h-16 w-20 px-2 py-2"
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs leading-tight">Overview</span>
          </Button>
          <Button
            variant={activeTab === 'inventory' ? 'default' : 'ghost'}
            className="flex flex-col items-center space-y-1 h-16 w-20 px-2 py-2"
            onClick={() => setActiveTab('inventory')}
          >
            <Package className="w-5 h-5" />
            <span className="text-xs leading-tight">Inventory</span>
          </Button>
          <Button
            variant={activeTab === 'scanner' ? 'default' : 'ghost'}
            className="flex flex-col items-center space-y-1 h-16 w-20 px-2 py-2"
            onClick={() => setActiveTab('scanner')}
          >
            <Scan className="w-5 h-5" />
            <span className="text-xs leading-tight">Scanner</span>
          </Button>
          <Button
            variant={activeTab === 'warehouse' ? 'default' : 'ghost'}
            className="flex flex-col items-center space-y-1 h-16 w-20 px-2 py-2"
            onClick={() => setActiveTab('warehouse')}
          >
            <Warehouse className="w-5 h-5" />
            <span className="text-xs leading-tight">Warehouse</span>
          </Button>
        </div>
      </div>
    </div>
  );
}