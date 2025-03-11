import React, { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Activity, AlertTriangle, TrendingUp, ChevronRight, ArrowRight, ArrowUp, ArrowDown, RefreshCw, Search, Menu, X, MessageSquare, User, Send, AlertCircle, Clock, HelpCircle, FileText, Zap, Settings, BarChart2, ExternalLink, ChevronDown, Eye, Maximize2, Minimize2 } from 'lucide-react';

// Sample data
const stablecoinData = [
  { id: 1, name: 'USDC', price: 0.9997, change: 0.01, risk: 'Low', riskScore: 92, marketCap: '42.8B', liquidity: '1.2B', reserves: { cash: 20, treasuries: 65, commercial: 10, other: 5 } },
  { id: 2, name: 'USDT', price: 0.9978, change: -0.22, risk: 'Medium', riskScore: 74, marketCap: '83.1B', liquidity: '2.4B', reserves: { cash: 5, treasuries: 82, commercial: 12, other: 1 } },
  { id: 3, name: 'DAI', price: 1.0014, change: 0.14, risk: 'Low', riskScore: 88, marketCap: '5.3B', liquidity: '0.7B', reserves: { ETH: 55, USDC: 30, other: 15 } },
  { id: 4, name: 'FRAX', price: 0.9871, change: -1.29, risk: 'High', riskScore: 62, marketCap: '0.9B', liquidity: '0.2B', reserves: { collateral: 85, algo: 15 } }
];

const pegChartData = [
  { time: '9AM', USDC: 1.000, USDT: 1.000, DAI: 1.000, FRAX: 0.989 },
  { time: '10AM', USDC: 1.000, USDT: 0.999, DAI: 1.001, FRAX: 0.988 },
  { time: '11AM', USDC: 0.999, USDT: 0.998, DAI: 1.001, FRAX: 0.987 },
  { time: '12PM', USDC: 1.000, USDT: 0.997, DAI: 1.001, FRAX: 0.986 },
  { time: '1PM', USDC: 1.000, USDT: 0.998, DAI: 1.002, FRAX: 0.988 },
  { time: '2PM', USDC: 1.000, USDT: 0.998, DAI: 1.001, FRAX: 0.987 },
  { time: '3PM', USDC: 0.999, USDT: 0.997, DAI: 1.001, FRAX: 0.987 },
];

const yieldData = [
  { name: 'Aave', USDC: 3.5, USDT: 4.2, DAI: 3.9 },
  { name: 'Compound', USDC: 3.8, USDT: 4.5, DAI: 4.1 },
  { name: 'Curve', USDC: 4.2, USDT: 5.0, DAI: 4.8 },
  { name: 'Yearn', USDC: 5.1, USDT: 5.8, DAI: 5.2 },
];

const alertsData = [
  { id: 1, type: 'high', title: 'FRAX Depeg Risk', message: 'FRAX dropped below $0.99, now at $0.987. Collateral ratio decreased to 87%.', time: '12 min ago' },
  { id: 2, type: 'medium', title: 'USDT Exchange Flows', message: 'Unusual USDT inflows to exchanges. $128M in the last 3 hours.', time: '35 min ago' },
  { id: 3, type: 'low', title: 'DAI Stability Update', message: 'MakerDAO increased ETH collateral requirements to 155%.', time: '2 hours ago' },
  { id: 4, type: 'medium', title: 'USDC Reserve Change', message: 'Circle increased treasury allocation to 65% (+5%) in latest attestation.', time: '3 hours ago' },
];

// Define reserve chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const StablecoinAIDashboard = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', message: "👋 Welcome to your Stablecoin Intelligence Dashboard! I'm your AI assistant and I'll help you navigate the stablecoin market safely. I notice FRAX is showing potential depeg risk. Would you like me to explain what's happening?" }
  ]);
  const [typing, setTyping] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([
    "Analyze USDT risks",
    "Best yield opportunities",
    "Should I be worried about FRAX?",
    "Safest stablecoin right now"
  ]);
  
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newMessages = [...messages, { id: messages.length + 1, sender: 'user', message: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');
    setTyping(true);
    
    // Simulate AI response with delay
    setTimeout(() => {
      setTyping(false);
      let responseMessage = '';
      const userInput = inputMessage.toLowerCase();
      
      if (userInput.includes('usdt') && (userInput.includes('safe') || userInput.includes('risk'))) {
        setMessages([...newMessages, {
          id: newMessages.length + 1,
          sender: 'ai',
          message: `<div>
            <p>USDT currently has a <strong>Medium Risk</strong> profile (74/100). Here's my analysis:</p>
            
            <ul class="mt-2 space-y-1 list-disc list-inside">
              <li>Current price: $0.998 (-0.22% in 24h)</li>
              <li>Recent reserve attestation shows 82% in US Treasuries, 12% in commercial paper</li>
              <li>Unusual exchange inflows detected in the last 3 hours ($128M)</li>
              <li>Historical vulnerability during market stress events</li>
            </ul>
            
            <div class="mt-3 p-2 bg-blue-50 rounded border border-blue-100">
              <p class="text-sm">I'm tracking exchange flows closely as this pattern has preceded volatility in the past. Would you like me to set up an alert if USDT exchange flows exceed $200M in 24h?</p>
            </div>
            
            <p class="mt-3"><strong>Recommendation:</strong> If you're holding USDT, consider keeping no more than 30-40% of your stablecoin portfolio in it for diversification.</p>
          </div>`,
          hasChart: false
        }]);
        
        // Update suggestions based on the conversation
        setAiSuggestions([
          "Set up USDT flow alerts",
          "Compare USDT vs USDC",
          "Show historical USDT volatility",
          "What's in USDT reserves?"
        ]);
      } 
      else if (userInput.includes('yield') || userInput.includes('apy') || userInput.includes('earn')) {
        setMessages([...newMessages, {
          id: newMessages.length + 1,
          sender: 'ai',
          message: `<div>
            <p>Here are the top yield opportunities for major stablecoins right now:</p>
            
            <div class="my-3">
              <!-- Chart placeholder -->
              <div class="h-40 bg-gray-50 rounded flex items-center justify-center">
                [Yield Comparison Chart]
              </div>
            </div>
            
            <p class="mb-2"><strong>Best risk-adjusted yields:</strong></p>
            <ul class="space-y-1 list-disc list-inside">
              <li><span class="font-medium">USDC on Curve:</span> 4.2% APY (Low risk)</li>
              <li><span class="font-medium">DAI on Yearn:</span> 5.2% APY (Moderate risk)</li>
              <li><span class="font-medium">USDT on Aave:</span> 4.2% APY (Medium risk)</li>
            </ul>
            
            <div class="mt-3 p-2 bg-yellow-50 rounded border border-yellow-100">
              <p class="text-xs font-medium text-yellow-800">⚠️ Warning: Higher yields on FRAX (8-12% range) carry significant depeg risk given current market conditions.</p>
            </div>
            
            <p class="mt-3">Would you like specific platform recommendations based on your risk tolerance?</p>
          </div>`,
          hasChart: true,
          chartType: 'yield'
        }]);
        
        setAiSuggestions([
          "Low risk yield options only",
          "Is Curve safe for USDC?",
          "Compare Aave vs Compound",
          "What affects stablecoin yields?"
        ]);
      }
      else if (userInput.includes('frax') || userInput.includes('worried')) {
        setMessages([...newMessages, {
          id: newMessages.length + 1,
          sender: 'ai',
          message: `<div>
            <p>Yes, there's legitimate concern about FRAX right now. It's showing <strong>High Risk</strong> indicators (62/100):</p>
            
            <ul class="mt-2 space-y-1 list-disc list-inside">
              <li>Current price: $0.987 (significant -1.29% deviation)</li>
              <li>Collateral ratio has decreased to 87% (down from 92% last week)</li>
              <li>Liquidity across DEXs has dropped 24% in 48 hours</li>
              <li>Large redemptions ongoing - $42M in the last 24 hours</li>
            </ul>
            
            <div class="my-3">
              <!-- Chart placeholder -->
              <div class="h-40 bg-gray-50 rounded flex items-center justify-center">
                [FRAX Peg Chart]
              </div>
            </div>
            
            <p class="mt-2"><strong>My assessment:</strong> This shows classic early warning signs of potential further depegging. While not yet critical, the trend is concerning.</p>
            
            <div class="mt-3 p-2 bg-red-50 rounded border border-red-100">
              <p class="text-sm"><span class="font-medium">Recommendation:</span> If you're holding FRAX, consider reducing exposure until stabilization occurs. Similar patterns preceded previous algorithmic stablecoin failures.</p>
            </div>
          </div>`,
          hasChart: true,
          chartType: 'frax'
        }]);
        
        setAiSuggestions([
          "How bad could FRAX depeg get?",
          "Alternative to FRAX?",
          "Set FRAX price alert",
          "What caused FRAX instability?"
        ]);
      }
      else if (userInput.includes('safest') || userInput.includes('safe stablecoin')) {
        setMessages([...newMessages, {
          id: newMessages.length + 1,
          sender: 'ai',
          message: `<div>
            <p>Based on current market conditions and comprehensive risk assessment, here are the safest stablecoins:</p>
            
            <div class="mt-3 space-y-2">
              <div class="p-3 bg-blue-50 rounded border border-blue-100">
                <p class="font-medium">1. USDC — Risk Score: 92/100 (Low Risk)</p>
                <ul class="mt-1 space-y-0.5 list-disc list-inside text-sm">
                  <li>Strong reserve composition (65% US Treasuries, 20% cash)</li>
                  <li>Transparent monthly attestations by Grant Thornton</li>
                  <li>High liquidity across centralized and decentralized venues</li>
                  <li>Strong regulatory compliance in the US</li>
                </ul>
              </div>
              
              <div class="p-3 bg-blue-50 rounded border border-blue-100">
                <p class="font-medium">2. DAI — Risk Score: 88/100 (Low Risk)</p>
                <ul class="mt-1 space-y-0.5 list-disc list-inside text-sm">
                  <li>Overcollateralized at 155%</li>
                  <li>Transparent on-chain reserves</li>
                  <li>Proven resilience during previous market stress events</li>
                  <li>Adaptive governance mechanism through MakerDAO</li>
                </ul>
              </div>
            </div>
            
            <p class="mt-3"><strong>Recommendation:</strong> For maximum safety, USDC currently offers the best combination of stability, transparency, and regulatory compliance. Consider keeping the majority of your stablecoin holdings in USDC if safety is your primary concern.</p>
          </div>`,
          hasChart: false
        }]);
        
        setAiSuggestions([
          "Compare USDC vs DAI risks",
          "USDC reserve breakdown",
          "Stablecoin diversification strategy",
          "Historical stablecoin depegs"
        ]);
      }
      else {
        setMessages([...newMessages, {
          id: newMessages.length + 1,
          sender: 'ai',
          message: `Based on my analysis of current market conditions, here's what you should know about stablecoins today:

1. **USDC** remains the safest option with strong reserves and regulatory compliance
2. **USDT** shows some concerning exchange inflows but maintains its peg
3. **DAI** is stable with healthy collateralization
4. **FRAX** is experiencing potential depeg risk and requires caution

What specific aspect of stablecoin intelligence would you like me to focus on? I can provide risk assessments, yield opportunities, or detailed analysis of any specific coin.`,
          hasChart: false
        }]);
      }
    }, 1500);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    
    // Optional: Auto-send the suggestion
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  // Helper function to determine alert icon and color
  const getAlertStyles = (type) => {
    switch (type) {
      case 'high':
        return { icon: <AlertTriangle size={16} />, bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200', iconColor: 'text-red-500' };
      case 'medium':
        return { icon: <AlertCircle size={16} />, bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200', iconColor: 'text-yellow-500' };
      case 'low':
        return { icon: <Activity size={16} />, bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200', iconColor: 'text-blue-500' };
      default:
        return { icon: <Activity size={16} />, bgColor: 'bg-gray-50', textColor: 'text-gray-700', borderColor: 'border-gray-200', iconColor: 'text-gray-500' };
    }
  };
  
  const renderMessageContent = (content) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-md text-white mr-2">
              <Activity size={18} />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Stablecoin Intelligence</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search coins, alerts..." 
                className="pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center text-sm text-gray-600">
              <RefreshCw size={14} className="mr-1" />
              <span>Refresh</span>
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-100">
              <Settings size={18} className="text-gray-600" />
            </button>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              <User size={18} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 grid grid-cols-12 gap-4">
        {/* Left Side - Dashboard */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {/* Dashboard Header with AI Insight */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg text-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-1">Market Dashboard</h2>
                <p className="text-blue-100">
                  <Clock size={14} className="inline mr-1" />
                  Last updated: Mar 11, 2025, 11:48 AM
                </p>
                
                <div className="mt-3 p-3 bg-white bg-opacity-10 rounded-md backdrop-blur-sm">
                  <div className="flex items-start">
                    <Zap size={18} className="text-yellow-300 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">AI Insight: Potential FRAX Instability</p>
                      <p className="text-sm text-blue-100 mt-0.5">FRAX is showing signs of instability with a 1.29% depeg and decreasing collateral ratio. Similar patterns preceded previous algorithmic stablecoin failures.</p>
                      <button className="mt-2 text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-md flex items-center">
                        View Analysis
                        <ChevronRight size={14} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2 ml-4">
                <div className="px-3 py-1.5 bg-red-500 bg-opacity-80 rounded-md text-white text-sm">
                  <div className="flex items-center">
                    <AlertTriangle size={14} className="mr-1.5" />
                    <span>1 Critical Alert</span>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-yellow-500 bg-opacity-80 rounded-md text-white text-sm">
                  <div className="flex items-center">
                    <AlertCircle size={14} className="mr-1.5" />
                    <span>2 Warnings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stablecoin Status Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-800">Stablecoin Status</h2>
              <div className="flex items-center text-sm text-blue-600">
                <a href="#" className="flex items-center">
                  View All Coins
                  <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liquidity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stablecoinData.map(coin => (
                    <tr 
                      key={coin.id} 
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${selectedCoin === coin.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedCoin(coin.id)}
                    >
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 mr-3 rounded-full flex items-center justify-center ${
                            coin.name === 'USDC' ? 'bg-blue-100 text-blue-700' :
                            coin.name === 'USDT' ? 'bg-green-100 text-green-700' :
                            coin.name === 'DAI' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {coin.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{coin.name}</div>
                            <div className="text-xs text-gray-500">USD {coin.name === 'DAI' ? 'Stablecoin' : 'Coin'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">${coin.price.toFixed(4)}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className={`flex items-center ${
                          coin.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {coin.change >= 0 ? 
                            <ArrowUp size={14} className="mr-1" /> : 
                            <ArrowDown size={14} className="mr-1" />}
                          {Math.abs(coin.change).toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${
                              coin.riskScore >= 85 ? 'bg-green-500' : 
                              coin.riskScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} style={{ width: `${coin.riskScore}%` }}></div>
                          </div>
                          <span className="ml-2 text-xs font-medium">
                            {coin.riskScore}/100
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {coin.risk} Risk
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">${coin.marketCap}</td>
                      <td className="px-4 py-3 text-sm">${coin.liquidity}</td>
                      <td className="px-4 py-3 text-right text-sm">
                        <button className="text-blue-600 hover:text-blue-800">
                          <ExternalLink size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Peg Stability Chart */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800">Peg Stability (Last 6 Hours)</h2>
              <div className="flex items-center space-x-2">
                <button className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">6H</button>
                <button className="px-2 py-1 text-xs rounded text-gray-500 hover:bg-gray-100">24H</button>
                <button className="px-2 py-1 text-xs rounded text-gray-500 hover:bg-gray-100">7D</button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pegChartData} margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0.985, 1.005]} tickCount={5} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="USDC" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="USDC" />
                  <Line type="monotone" dataKey="USDT" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="USDT" />
                  <Line type="monotone" dataKey="DAI" stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="DAI" />
                  <Line type="monotone" dataKey="FRAX" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="FRAX" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* AI Insight for Chart */}
            <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-100">
              <div className="flex items-start">
                <Zap size={16} className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800">AI Analysis:</p>
                  <p className="text-sm text-blue-600">FRAX shows persistent deviation from peg with negative trend. USDT experiencing minor oscillations potentially indicating market uncertainty. USDC and DAI remain highly stable.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Selected Coin Details (Conditional) */}
          {selectedCoin && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 mr-3 rounded-full flex items-center justify-center ${
                    stablecoinData[selectedCoin-1].name === 'USDC' ? 'bg-blue-100 text-blue-700' :
                    stablecoinData[selectedCoin-1].name === 'USDT' ? 'bg-green-100 text-green-700' :
                    stablecoinData[selectedCoin-1].name === 'DAI' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {stablecoinData[selectedCoin-1].name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-medium">{stablecoinData[selectedCoin-1].name}</h2>
                    <p className="text-gray-500 text-sm">
                      ${stablecoinData[selectedCoin-1].price.toFixed(4)}
                      <span className={`ml-2 ${stablecoinData[selectedCoin-1].change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stablecoinData[selectedCoin-1].change >= 0 ? '↑' : '↓'} 
                        {Math.abs(stablecoinData[selectedCoin-1].change).toFixed(2)}%
                      </span>
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCoin(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Reserve Composition</h3>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={Object.entries(stablecoinData[selectedCoin-1].reserves).map(([name, value]) => ({
                            name,
                            value
                          }))}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {Object.entries(stablecoinData[selectedCoin-1].reserves).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">AI Risk Assessment</h3>
                  <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex items-start">
                      <div className={`mt-0.5 mr-2 ${
                        stablecoinData[selectedCoin-1].risk === 'Low' ? 'text-green-600' :
                        stablecoinData[selectedCoin-1].risk === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {stablecoinData[selectedCoin-1].risk === 'Low' ? 
                          <CheckCircle size={16} /> : 
                          stablecoinData[selectedCoin-1].risk === 'Medium' ? 
                          <AlertCircle size={16} /> : <AlertTriangle size={16} />}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">
                          {stablecoinData[selectedCoin-1].risk} Risk
                          <span className="ml-2 text-gray-500">({stablecoinData[selectedCoin-1].riskScore}/100)</span>
                        </h3>
                        <p className="text-sm mt-1">
                          {stablecoinData[selectedCoin-1].name === 'USDC' ? 
                            'USDC maintains strong reserve quality and transparency with regular attestations. High liquidity and institutional adoption provide stability.' : 
                            stablecoinData[selectedCoin-1].name === 'USDT' ? 
                            'USDT shows adequate stability but has concerns regarding reserve transparency and unusual exchange flows. Monitor for changes in market sentiment.' : 
                            stablecoinData[selectedCoin-1].name === 'DAI' ? 
                            'DAI demonstrates resilience through decentralized overcollateralization. Strong governance and historical stability during market stress events.' : 
                            'FRAX is currently showing signs of instability with depeg risk. Algorithmic component and dropping collateral ratio increase vulnerability.'}
                        </p>
                        <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded flex items-center">
                          Ask AI About {stablecoinData[selectedCoin-1].name}
                          <ArrowRight size={14} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Side - AI Assistant & Alerts */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* AI Assistant */}
          <div className={`bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col ${expanded ? 'fixed inset-4 z-50' : 'h-96'}`}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <div className="flex items-center">
                <div className="bg-blue-100 p-1.5 rounded-full text-blue-700 mr-2">
                  <MessageSquare size={18} />
                </div>
                <h2 className="font-medium text-gray-800">AI Assistant</h2>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => setExpanded(!expanded)} 
                  className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
                >
                  {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[90%] rounded-lg p-3 ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {typeof msg.message === 'string' ? 
                      renderMessageContent(msg.message) : 
                      <p>{msg.message}</p>
                    }
                    
                    {msg.hasChart && msg.chartType === 'yield' && (
                      <div className="h-40 mt-3 mb-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={yieldData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis tickCount={6} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Bar dataKey="USDC" fill="#3b82f6" />
                            <Bar dataKey="USDT" fill="#10b981" />
                            <Bar dataKey="DAI" fill="#f59e0b" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                    
                    {msg.hasChart && msg.chartType === 'frax' && (
                      <div className="h-40 mt-3 mb-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={pegChartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                            <YAxis domain={[0.985, 1.005]} tickCount={5} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="FRAX" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* AI Suggestions */}
            <div className="px-4 py-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about stablecoin risks, markets, or strategies..."
                  className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className={`bg-blue-600 text-white p-2 rounded-r-lg ${
                    inputMessage.trim() === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                  disabled={inputMessage.trim() === ''}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Risk Alerts */}
          <div className={`bg-white rounded-lg shadow-sm p-4 ${expanded ? 'hidden' : 'block'}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium text-gray-800">Risk Alerts</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            
            <div className="space-y-3">
              {alertsData.map(alert => {
                const styles = getAlertStyles(alert.type);
                return (
                  <div key={alert.id} className={`p-3 rounded ${styles.bgColor} ${styles.borderColor} border`}>
                    <div className="flex items-start">
                      <div className={`mt-0.5 mr-2 ${styles.iconColor}`}>
                        {styles.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className={`text-sm font-medium ${styles.textColor}`}>{alert.title}</h3>
                        <p className="text-xs mt-0.5">{alert.message}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">{alert.time}</span>
                          <button className="text-xs text-blue-600 hover:text-blue-800">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Yield Opportunities */}
          <div className={`bg-white rounded-lg shadow-sm p-4 ${expanded ? 'hidden' : 'block'}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium text-gray-800">Top Yields (Risk-Adjusted)</h2>
              <button className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                <BarChart2 size={14} className="mr-1" />
                Filter by Risk
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">USDC on Curve</h3>
                    <p className="text-sm text-gray-600">3pool Strategy</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-700">4.2%</div>
                    <div className="text-xs text-gray-500">Risk: Low</div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">DAI on Yearn</h3>
                    <p className="text-sm text-gray-600">v2 Vault</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-700">5.2%</div>
                    <div className="text-xs text-gray-500">Risk: Medium</div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-md border border-yellow-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">USDT on Aave</h3>
                    <p className="text-sm text-gray-600">Lending</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-700">4.2%</div>
                    <div className="text-xs text-gray-500">Risk: Medium</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium">
                Ask AI for Personalized Yield Strategy
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StablecoinAIDashboard;
