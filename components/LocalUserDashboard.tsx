import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  Gift, 
  Car, 
  MapPin, 
  MessageCircle, 
  Star,
  Bell,
  LogOut,
  Plus,
  Send,
  Truck,
  Clock,
  CheckCircle,
  Bike,
  Map,
  Navigation,
  Warehouse,
  Phone,
  Eye
} from 'lucide-react';

interface LocalUserDashboardProps {
  onLogout: () => void;
}

interface Vehicle {
  id: string;
  type: string;
  model: string;
  number: string;
  status: 'active' | 'inactive';
}

interface Delivery {
  id: string;
  from: string;
  to: string;
  status: 'pending' | 'in-transit' | 'delivered';
  estimatedTime: string;
  distance: string;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface Warehouse {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: { x: number; y: number };
  type: 'main' | 'regional' | 'local';
  operatingHours: string;
  availableServices: string[];
}

export function LocalUserDashboard({ onLogout }: LocalUserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'rewards' | 'vehicles' | 'delivery' | 'map' | 'chat'>('rewards');
  const [chatInput, setChatInput] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  
  const [vehicles] = useState<Vehicle[]>([
    { id: '1', type: 'EV Bike', model: 'Ather 450X', number: 'DL 01 EV 1234', status: 'active' },
    { id: '2', type: 'E-Rickshaw', model: 'Mahindra Treo', number: 'DL 02 ER 5678', status: 'inactive' },
    { id: '3', type: 'EV Bike', model: 'TVS iQube', number: 'DL 03 EV 9012', status: 'active' },
  ]);

  const [deliveries] = useState<Delivery[]>([
    { id: '1', from: 'Warehouse A', to: 'Customer Location', status: 'in-transit', estimatedTime: '15 mins', distance: '2.5 km' },
    { id: '2', from: 'Shop B', to: 'Home Address', status: 'pending', estimatedTime: '30 mins', distance: '5.2 km' },
    { id: '3', from: 'Market C', to: 'Office', status: 'delivered', estimatedTime: 'Completed', distance: '8.1 km' },
  ]);

  const [warehouses] = useState<Warehouse[]>([
    {
      id: '1',
      name: 'Central Warehouse Delhi',
      address: 'Sector 18, Noida, Delhi NCR',
      phone: '+91 98765 43210',
      coordinates: { x: 45, y: 25 },
      type: 'main',
      operatingHours: '6:00 AM - 10:00 PM',
      availableServices: ['Package Collection', 'EV Charging', 'Rest Area']
    },
    {
      id: '2',
      name: 'Regional Hub Gurgaon',
      address: 'Cyber City, Gurgaon, Haryana',
      phone: '+91 98765 43211',
      coordinates: { x: 25, y: 60 },
      type: 'regional',
      operatingHours: '7:00 AM - 9:00 PM',
      availableServices: ['Package Collection', 'EV Charging']
    },
    {
      id: '3',
      name: 'Local Center Dwarka',
      address: 'Sector 21, Dwarka, Delhi',
      phone: '+91 98765 43212',
      coordinates: { x: 70, y: 40 },
      type: 'local',
      operatingHours: '8:00 AM - 8:00 PM',
      availableServices: ['Package Collection', 'Quick Stop']
    },
    {
      id: '4',
      name: 'East Delhi Hub',
      address: 'Laxmi Nagar, East Delhi',
      phone: '+91 98765 43213',
      coordinates: { x: 80, y: 20 },
      type: 'regional',
      operatingHours: '6:30 AM - 9:30 PM',
      availableServices: ['Package Collection', 'EV Charging', 'Rest Area']
    },
    {
      id: '5',
      name: 'South Extension Center',
      address: 'South Extension, Delhi',
      phone: '+91 98765 43214',
      coordinates: { x: 55, y: 75 },
      type: 'local',
      operatingHours: '8:00 AM - 7:00 PM',
      availableServices: ['Package Collection']
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'bot', timestamp: '10:30 AM' },
    { id: '2', text: 'I need help with my delivery status', sender: 'user', timestamp: '10:31 AM' },
    { id: '3', text: 'I can help you track your delivery. Please provide your delivery ID.', sender: 'bot', timestamp: '10:31 AM' },
  ]);

  const rewardPoints = 2450;
  const nextRewardLevel = 3000;
  const rewardProgress = (rewardPoints / nextRewardLevel) * 100;

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: chatInput,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message. Let me help you with that.',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg text-gray-800">Local User Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome back!</p>
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
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            {/* Reward Points Card */}
            <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl">Reward Points</h2>
                  <p className="text-3xl font-semibold">{rewardPoints.toLocaleString()}</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Gift className="w-8 h-8" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to next level</span>
                  <span>{rewardPoints}/{nextRewardLevel}</span>
                </div>
                <Progress value={rewardProgress} className="bg-white/20" />
              </div>
            </Card>

            {/* Recent Activities */}
            <Card className="p-4">
              <h3 className="text-lg text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Plus className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">Delivery completed</p>
                      <p className="text-sm text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <span className="text-purple-600">+150 pts</span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">5-star rating received</p>
                      <p className="text-sm text-gray-600">1 day ago</p>
                    </div>
                  </div>
                  <span className="text-purple-600">+50 pts</span>
                </div>
              </div>
            </Card>

            {/* Available Rewards */}
            <Card className="p-4">
              <h3 className="text-lg text-gray-800 mb-4">Available Rewards</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg text-center">
                  <div className="text-2xl mb-2">🎁</div>
                  <p className="text-sm text-gray-800">Free Charging</p>
                  <p className="text-xs text-gray-600">500 points</p>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <div className="text-2xl mb-2">☕</div>
                  <p className="text-sm text-gray-800">Coffee Voucher</p>
                  <p className="text-xs text-gray-600">200 points</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-gray-800">My Vehicles</h2>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="w-4 h-4 mr-1" />
                Add Vehicle
              </Button>
            </div>

            <div className="space-y-3">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Bike className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-800">{vehicle.model}</h3>
                        <p className="text-sm text-gray-600">{vehicle.number}</p>
                        <p className="text-xs text-gray-500">{vehicle.type}</p>
                      </div>
                    </div>
                    <Badge variant={vehicle.status === 'active' ? 'default' : 'secondary'}>
                      {vehicle.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 text-center">
              <Bike className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-gray-800 mb-2">Add Your Vehicle</h3>
              <p className="text-gray-600 text-sm mb-4">Register your EV bike or e-rickshaw to start earning rewards for deliveries</p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Register Vehicle
              </Button>
            </Card>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="space-y-4">
            <h2 className="text-lg text-gray-800">Delivery Tracking</h2>

            <div className="space-y-3">
              {deliveries.map((delivery) => (
                <Card key={delivery.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${
                          delivery.status === 'delivered' ? 'bg-green-500' :
                          delivery.status === 'in-transit' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`} />
                        <Badge variant={
                          delivery.status === 'delivered' ? 'default' :
                          delivery.status === 'in-transit' ? 'secondary' : 'outline'
                        }>
                          {delivery.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">From: {delivery.from}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">To: {delivery.to}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        {delivery.status === 'delivered' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : delivery.status === 'in-transit' ? (
                          <Truck className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-500" />
                        )}
                        <span className="text-sm text-gray-600">{delivery.estimatedTime}</span>
                      </div>
                      <p className="text-xs text-gray-500">{delivery.distance}</p>
                    </div>
                  </div>
                  
                  {delivery.status === 'in-transit' && (
                    <Button variant="outline" size="sm" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Track Live
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-gray-800">Warehouse Locations</h2>
              <Button variant="outline" size="sm">
                <Navigation className="w-4 h-4 mr-1" />
                Navigate
              </Button>
            </div>

            {/* Map Container */}
            <Card className="p-0 overflow-hidden">
              <div className="relative h-80 bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
                {/* Mock map background with roads */}
                <div className="absolute inset-0">
                  {/* Horizontal roads */}
                  <div className="absolute top-16 left-0 right-0 h-1 bg-gray-300" />
                  <div className="absolute top-32 left-0 right-0 h-1 bg-gray-300" />
                  <div className="absolute top-48 left-0 right-0 h-1 bg-gray-300" />
                  <div className="absolute bottom-16 left-0 right-0 h-1 bg-gray-300" />
                  
                  {/* Vertical roads */}
                  <div className="absolute top-0 bottom-0 left-16 w-1 bg-gray-300" />
                  <div className="absolute top-0 bottom-0 left-32 w-1 bg-gray-300" />
                  <div className="absolute top-0 bottom-0 right-24 w-1 bg-gray-300" />
                  <div className="absolute top-0 bottom-0 right-8 w-1 bg-gray-300" />
                </div>

                {/* Warehouse markers */}
                {warehouses.map((warehouse) => (
                  <div
                    key={warehouse.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${warehouse.coordinates.x}%`,
                      top: `${warehouse.coordinates.y}%`
                    }}
                    onClick={() => setSelectedWarehouse(warehouse)}
                  >
                    <div className={`relative group ${
                      warehouse.type === 'main' ? 'scale-125' :
                      warehouse.type === 'regional' ? 'scale-110' : 'scale-100'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${
                        warehouse.type === 'main' ? 'bg-purple-600' :
                        warehouse.type === 'regional' ? 'bg-purple-500' : 'bg-purple-400'
                      }`}>
                        <Warehouse className="w-4 h-4 text-white" />
                      </div>
                      
                      {/* Pulse animation */}
                      <div className={`absolute inset-0 rounded-full animate-ping ${
                        warehouse.type === 'main' ? 'bg-purple-600' :
                        warehouse.type === 'regional' ? 'bg-purple-500' : 'bg-purple-400'
                      } opacity-20`} />
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {warehouse.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
                  <h4 className="text-xs font-medium text-gray-800 mb-2">Warehouse Types</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-600 rounded-full" />
                      <span className="text-xs text-gray-600">Main Hub</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full" />
                      <span className="text-xs text-gray-600">Regional</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full" />
                      <span className="text-xs text-gray-600">Local</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Warehouse Details */}
            {selectedWarehouse && (
              <Card className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Warehouse className="w-5 h-5 text-purple-600" />
                      <h3 className="text-gray-800">{selectedWarehouse.name}</h3>
                      <Badge variant={
                        selectedWarehouse.type === 'main' ? 'default' :
                        selectedWarehouse.type === 'regional' ? 'secondary' : 'outline'
                      }>
                        {selectedWarehouse.type}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedWarehouse.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedWarehouse.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedWarehouse.operatingHours}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedWarehouse(null)}
                  >
                    ×
                  </Button>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Available Services</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedWarehouse.availableServices.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                    <Navigation className="w-4 h-4 mr-1" />
                    Get Directions
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
              </Card>
            )}

            {/* Nearby Warehouses List */}
            <Card className="p-4">
              <h3 className="text-lg text-gray-800 mb-4">Nearby Warehouses</h3>
              <div className="space-y-3">
                {warehouses.slice(0, 3).map((warehouse) => (
                  <div key={warehouse.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        warehouse.type === 'main' ? 'bg-purple-600' :
                        warehouse.type === 'regional' ? 'bg-purple-500' : 'bg-purple-400'
                      }`}>
                        <Warehouse className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm font-medium">{warehouse.name}</p>
                        <p className="text-gray-600 text-xs">{warehouse.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">2.5 km</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedWarehouse(warehouse)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="flex flex-col h-[calc(100vh-200px)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-gray-800">Support Chat</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">Online</span>
              </div>
            </div>

            <Card className="flex-1 flex flex-col">
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t px-1 py-3">
        <div className="flex justify-around">
          <Button
            variant={activeTab === 'rewards' ? 'default' : 'ghost'}
            className="flex flex-col items-center space-y-1 h-16 w-16 px-1 py-2"
            onClick={() => setActiveTab('rewards')}
          >
            <Gift className="w-4 h-4" />
            <span className="text-xs leading-tight">Rewards</span>
          </Button>
          <Button
            variant={activeTab === 'vehicles' ? 'default' : 'ghost'}
            className="flex flex-col items-center space-y-1 h-16 w-16 px-1 py-2"
            onClick={() => setActiveTab('vehicles')}
          >
            <Bike className="w-4 h-4" />
            <span className="text-xs leading-tight">Vehicles</span>
          </Button>
          <Button
            variant={activeTab === 'delivery' ? 'default' : 'ghost'}
            className="flex flex-col items-center space-y-1 h-16 w-16 px-1 py-2"
            onClick={() => setActiveTab('delivery')}
          >
            <Truck className="w-4 h-4" />
            <span className="text-xs leading-tight">Delivery</span>
          </Button>
          <Button
            variant={activeTab === 'map' ? 'default' : 'ghost'}
            className="flex flex-col items-center space-y-1 h-16 w-16 px-1 py-2"
            onClick={() => setActiveTab('map')}
          >
            <Map className="w-4 h-4" />
            <span className="text-xs leading-tight">Map</span>
          </Button>
          <Button
            variant={activeTab === 'chat' ? 'default' : 'ghost'}
            className="flex flex-col items-center space-y-1 h-16 w-16 px-1 py-2"
            onClick={() => setActiveTab('chat')}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs leading-tight">Chat</span>
          </Button>
        </div>
      </div>
    </div>
  );
}