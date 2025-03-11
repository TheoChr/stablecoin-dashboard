import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, ReferenceLine } from 'recharts';
import { AlertTriangle, Activity, TrendingUp, DollarSign, ArrowRight, ArrowDown, ArrowUp, Zap, RefreshCw, Eye, Filter, Clock, Share2, ChevronDown, MessageSquare, X, Send, Bot, MinusCircle, Maximize2, ChevronUp } from 'lucide-react';

const StablecoinDashboard = () => {
  const [timeframe, setTimeframe] = useState('24h');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantMinimized, setAssistantMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your Stablecoin Intelligence Assistant. I can help you analyze market trends, explain anomalies, or provide insights on specific stablecoins. What would you like to know today?' 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  // Sample data for charts
  const pegHistoryData = {
    '24h': [
      { time: '8AM', USDC: 1.001, USDT: 0.9993, DAI: 1.0023, FRAX: 0.9782 },
      { time: '9AM', USDC: 1.000, USDT: 0.9991, DAI: 1.0021, FRAX: 0.9765 },
      { time: '10AM', USDC: 1.0001, USDT: 0.9987, DAI: 1.0022, FRAX: 0.9745 },
      { time: '11AM', USDC: 1.0001, USDT: 0.9985, DAI: 1.0025, FRAX: 0.9732 },
      { time: '12PM', USDC: 1.0002, USDT: 0.9982, DAI: 1.0026, FRAX: 0.9728 },
      { time: '1PM', USDC: 1.0002, USDT: 0.9979, DAI: 1.0024, FRAX: 0.9725 },
      { time: '2PM', USDC: 1.0001, USDT: 0.9981, DAI: 1.0023, FRAX: 0.9723 },
      { time: '3PM', USDC: 1.0002, USDT: 0.9991, DAI: 1.0023, FRAX: 0.9721 },
    ],
    '7d': [
      { time: 'Mon', USDC: 1.0005, USDT: 0.9989, DAI: 1.0025, FRAX: 0.9805 },
      { time: 'Tue', USDC: 1.0004, USDT: 0.9992, DAI: 1.0022, FRAX: 0.9792 },
      { time: 'Wed', USDC: 1.0002, USDT: 0.9990, DAI: 1.0020, FRAX: 0.9775 },
      { time: 'Thu', USDC: 1.0001, USDT: 0.9987, DAI: 1.0023, FRAX: 0.9760 },
      { time: 'Fri', USDC: 1.0001, USDT: 0.9985, DAI: 1.0025, FRAX: 0.9732 },
      { time: 'Sat', USDC: 1.0002, USDT: 0.9983, DAI: 1.0024, FRAX: 0.9725 },
      { time: 'Sun', USDC: 1.0002, USDT: 0.9991, DAI: 1.0023, FRAX: 0.9721 },
    ],
    '30d': [
      { time: 'Week 1', USDC: 1.0004, USDT: 0.9995, DAI: 1.0018, FRAX: 0.9850 },
      { time: 'Week 2', USDC: 1.0003, USDT: 0.9993, DAI: 1.0020, FRAX: 0.9832 },
      { time: 'Week 3', USDC: 1.0002, USDT: 0.9990, DAI: 1.0022, FRAX: 0.9795 },
      { time: 'Week 4', USDC: 1.0002, USDT: 0.9991, DAI: 1.0023, FRAX: 0.9721 },
    ]
  };

  const flowsData = {
    '24h': [
      { name: 'USDC', inflow: 124.5, outflow: -85.3 },
      { name: 'USDT', inflow: 210.8, outflow: -245.6 },
      { name: 'DAI', inflow: 67.2, outflow: -42.8 },
      { name: 'FRAX', inflow: 43.6, outflow: -78.9 },
      { name: 'BUSD', inflow: 15.4, outflow: -42.1 },
    ],
    '7d': [
      { name: 'USDC', inflow: 542.3, outflow: -412.5 },
      { name: 'USDT', inflow: 876.2, outflow: -934.8 },
      { name: 'DAI', inflow: 312.5, outflow: -276.3 },
      { name: 'FRAX', inflow: 165.7, outflow: -284.2 },
      { name: 'BUSD', inflow: 78.2, outflow: -132.9 },
    ],
    '30d': [
      { name: 'USDC', inflow: 1876.5, outflow: -1542.3 },
      { name: 'USDT', inflow: 3245.8, outflow: -3560.4 },
      { name: 'DAI', inflow: 965.7, outflow: -842.1 },
      { name: 'FRAX', inflow: 534.2, outflow: -782.6 },
      { name: 'BUSD', inflow: 245.1, outflow: -386.2 },
    ]
  };

  const correlationData = [
    { name: 'USDC-ETH', value: 0.12 },
    { name: 'USDT-ETH', value: 0.31 },
    { name: 'DAI-ETH', value: 0.18 },
    { name: 'USDC-BTC', value: 0.09 },
    { name: 'USDT-BTC', value: 0.22 },
    { name: 'DAI-BTC', value: 0.14 },
  ];

  const reserveData = [
    { name: 'Cash', value: 65 },
    { name: 'Treasury', value: 20 },
    { name: 'Commercial Paper', value: 10 },
    { name: 'Corporate Bonds', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Simulate refresh action
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Connect wallet handler (placeholder)
  const handleConnectWallet = () => {
    alert('Wallet connection would be initiated here.');
  };
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle sending message to assistant
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userInput }]);
    
    // Simulate AI response based on user input
    setTimeout(() => {
      let response = '';
      
      // Simple pattern matching for demo purposes
      if (userInput.toLowerCase().includes('usdt') || userInput.toLowerCase().includes('tether')) {
        response = 'USDT is currently showing some concerning patterns. The reserve composition has shifted with an increase in commercial paper, and there\'s unusual outflow activity. The current price is $0.9991, which is a -0.09% change from the peg.';
      } else if (userInput.toLowerCase().includes('frax')) {
        response = 'FRAX is currently at high risk with a price of $0.9721 (-2.79% from peg). The collateral ratio has dropped to 85.2%, and there\'s significant outflow activity. I would recommend caution with FRAX exposure until the algorithmic model stabilizes.';
      } else if (userInput.toLowerCase().includes('risk') || userInput.toLowerCase().includes('alert')) {
        response = 'The most significant risk in the market right now is the USDT-USDC Curve Pool imbalance (73%/27% ratio). This pattern has historically preceded depegging events with 86% correlation. Additionally, FRAX is showing algorithmic model stress with potential liquidations if ETH drops another 5%.';
      } else if (userInput.toLowerCase().includes('explain') || userInput.toLowerCase().includes('analysis')) {
        response = 'The dashboard shows real-time market data across major stablecoins. The most important indicators to watch are: 1) Peg stability (how close to $1.00), 2) On-chain flows (net inflows/outflows), 3) Liquidity across exchanges, and 4) Correlation with crypto assets like ETH and BTC. Would you like me to explain any specific metric in more detail?';
      } else {
        response = 'I\'m analyzing the current stablecoin market conditions. Is there a specific stablecoin or metric you\'d like me to focus on? I can provide insights on USDC, USDT, DAI, or FRAX, or explain the anomalies we\'re currently detecting.';
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
    
    // Clear input
    setUserInput('');
  };

  // Card component for reusability
  const Card = ({ title, children, className = "", headerAction = null }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-medium text-gray-800">{title}</h2>
          {headerAction}
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );

  // Current data based on timeframe
  const currentPegData = useMemo(() => pegHistoryData[timeframe], [timeframe]);
  const currentFlowsData = useMemo(() => flowsData[timeframe], [timeframe]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-700 text-white p-1.5 rounded">
                <Activity size={18} />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Stablecoin Intelligence</h1>
              <div className="ml-4 flex space-x-1">
                <button className={`px-2 py-1 text-xs font-medium rounded ${timeframe === '24h' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`} onClick={() => setTimeframe('24h')}>24H</button>
                <button className={`px-2 py-1 text-xs font-medium rounded ${timeframe === '7d' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`} onClick={() => setTimeframe('7d')}>7D</button>
                <button className={`px-2 py-1 text-xs font-medium rounded ${timeframe === '30d' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`} onClick={() => setTimeframe('30d')}>30D</button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                className="flex items-center text-sm text-gray-500 hover:text-blue-600"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw size={14} className={`mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
              <button 
                className="flex items-center text-sm bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded"
                onClick={handleConnectWallet}
              >
                <Eye size={14} className="mr-1" />
                <span>Connect Wallet for Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Market Anomalies Card - High Value Information */}
          <div className="col-span-12 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-amber-200 shadow-sm">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium text-amber-800">
                  <AlertTriangle size={18} className="inline mr-2 text-amber-600" />
                  Market Anomalies Detected
                </h2>
                <span className="text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Updated 5 min ago</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white bg-opacity-70 p-3 rounded border border-amber-200">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-1.5 rounded">
                      <TrendingUp size={18} className="text-red-600" />
                    </div>
                    <div className="ml-2">
                      <h3 className="text-sm font-medium">USDT-USDC Curve Pool Imbalance</h3>
                      <p className="text-xs text-gray-600 mt-0.5">Unusual 73%/27% ratio detected (normally 50%/50%). Historical signal of depegging events.</p>
                      <div className="flex items-center mt-1.5">
                        <span className="text-xs text-red-600 font-medium">High correlation with May 2023 USDT events</span>
                        <ArrowRight size={12} className="ml-1 text-red-600" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-70 p-3 rounded border border-amber-200">
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-1.5 rounded">
                      <Share2 size={18} className="text-amber-600" />
                    </div>
                    <div className="ml-2">
                      <h3 className="text-sm font-medium">FRAX Algorithmic Model Stress</h3>
                      <p className="text-xs text-gray-600 mt-0.5">Collateral ratio dropped to 85.2%. On-chain data shows 48M tokens at risk of liquidation if ETH drops 5% more.</p>
                      <div className="flex items-center mt-1.5">
                        <span className="text-xs text-amber-600 font-medium">3 similar events in past 90 days</span>
                        <ArrowRight size={12} className="ml-1 text-amber-600" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-70 p-3 rounded border border-amber-200">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded">
                      <Activity size={18} className="text-blue-600" />
                    </div>
                    <div className="ml-2">
                      <h3 className="text-sm font-medium">Unusual Cross-Chain Flow Pattern</h3>
                      <p className="text-xs text-gray-600 mt-0.5">USDC bridging from Ethereum to Binance Chain up 187% in 24h. Historically correlates with regulatory concerns.</p>
                      <div className="flex items-center mt-1.5">
                        <span className="text-xs text-blue-600 font-medium">Similar to pre-SEC announcement pattern</span>
                        <ArrowRight size={12} className="ml-1 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Market Watch - Left Column */}
          <div className="col-span-12 md:col-span-8">
            <Card 
              title="Advanced Stablecoin Market Analysis" 
              headerAction={
                <button className="text-xs text-gray-500 hover:text-blue-600 flex items-center">
                  <Filter size={12} className="mr-1" />
                  Custom View
                </button>
              }
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deviation</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volatility</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On-Chain Flow</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700 mr-2">U</div>
                          <div>
                            <div className="text-sm font-medium">USDC</div>
                            <div className="text-xs text-gray-500">USD Coin</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm">$1.0002</div>
                        <div className="text-xs text-green-600">+0.02%</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '5%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">0.05%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '2%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">0.02%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center text-sm">
                          <ArrowUp size={14} className="text-green-500 mr-1" />
                          <span className="font-medium">$39.2M</span>
                        </div>
                        <div className="text-xs text-gray-500">Net inflow 24h</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm">$42.8B</div>
                        <div className="text-xs text-green-600">+0.3% 24h</div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          98.7% Healthy
                        </span>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium text-green-700 mr-2">T</div>
                          <div>
                            <div className="text-sm font-medium">USDT</div>
                            <div className="text-xs text-gray-500">Tether</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm">$0.9991</div>
                        <div className="text-xs text-red-600">-0.09%</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: '12%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">0.12%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: '18%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">0.18%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center text-sm">
                          <ArrowDown size={14} className="text-red-500 mr-1" />
                          <span className="font-medium">$34.8M</span>
                        </div>
                        <div className="text-xs text-gray-500">Net outflow 24h</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm">$84.3B</div>
                        <div className="text-xs text-red-600">-0.2% 24h</div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          91.2% Moderate
                        </span>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-xs font-medium text-yellow-700 mr-2">D</div>
                          <div>
                            <div className="text-sm font-medium">DAI</div>
                            <div className="text-xs text-gray-500">Dai Stablecoin</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm">$1.0023</div>
                        <div className="text-xs text-green-600">+0.23%</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '8%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">0.08%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '10%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">0.10%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center text-sm">
                          <ArrowUp size={14} className="text-green-500 mr-1" />
                          <span className="font-medium">$24.4M</span>
                        </div>
                        <div className="text-xs text-gray-500">Net inflow 24h</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm">$5.3B</div>
                        <div className="text-xs text-green-600">+1.2% 24h</div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          95.5% Healthy
                        </span>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-xs font-medium text-red-700 mr-2">F</div>
                          <div>
                            <div className="text-sm font-medium">FRAX</div>
                            <div className="text-xs text-gray-500">Frax Finance</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm">$0.9721</div>
                        <div className="text-xs text-red-600">-2.79%</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: '42%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">0.42%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: '55%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">0.55%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center text-sm">
                          <ArrowDown size={14} className="text-red-500 mr-1" />
                          <span className="font-medium">$35.3M</span>
                        </div>
                        <div className="text-xs text-gray-500">Net outflow 24h</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm">$908M</div>
                        <div className="text-xs text-red-600">-4.7% 24h</div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          76.8% At Risk
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Peg Stability Chart - Valuable visualization */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Peg Stability Comparison ({timeframe})</h3>
                  <div className="flex items-center text-xs space-x-4">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-1"></div>
                      <span>USDC</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                      <span>USDT</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></div>
                      <span>DAI</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-red-500 rounded-full mr-1"></div>
                      <span>FRAX</span>
                    </div>
                  </div>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentPegData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                      <YAxis domain={[0.96, 1.01]} tickCount={6} tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <ReferenceLine y={1} stroke="#888" strokeDasharray="3 3" label={{ value: "Peg", position: "right" }} />
                      <Line type="monotone" dataKey="USDC" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                      <Line type="monotone" dataKey="USDT" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                      <Line type="monotone" dataKey="DAI" stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                      <Line type="monotone" dataKey="FRAX" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-md">
                  <p className="text-xs text-blue-700"><strong>AI Insight:</strong> USDT showing unusual 4-hour oscillation pattern, similar to pre-depegging events in historical data. Monitoring recommended.</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - High-Value Insights */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            {/* Critical On-Chain Flows */}
            <Card title={`Critical On-Chain Flows (${timeframe})`}>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentFlowsData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" domain={[-300, 300]} tickCount={7} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="inflow" fill="#10b981" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="outflow" fill="#ef4444" radius={[4, 0, 0, 4]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Outflows ($M)</span>
                  <span>Inflows ($M)</span>
                </div>
                <div className="px-3 py-2 bg-yellow-50 border border-yellow-100 rounded-md mt-2">
                  <p className="text-xs text-yellow-700"><strong>Unusual pattern:</strong> Net USDT outflow accelerating with 73% coming from three whale addresses. Historical correlation to market stress events.</p>
                </div>
              </div>
            </Card>
            
            {/* Reserve Composition Analysis */}
            <Card title="USDT Reserve Composition">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reserveData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={45}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {reserveData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="space-y-2">
                    {reserveData.map((entry, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-3 w-3 rounded-sm mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-xs">{entry.name}: {entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-3 py-2 bg-red-50 border border-red-100 rounded-md mt-3">
                <p className="text-xs text-red-700"><strong>Risk Signal:</strong> Commercial Paper component increased 3% from previous audit. Similar to pre-UST-collapse reserve shifts.</p>
              </div>
            </Card>
            
            {/* Correlation Intelligence */}
            <Card title="Stablecoin-Crypto Correlations">
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={correlationData}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 0.5]} tickCount={6} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="px-3 py-2 bg-blue-50 border border-blue-100 rounded-md mt-3">
                <p className="text-xs text-blue-700"><strong>Insight:</strong> USDT-ETH correlation at 0.31 has increased 128% in 7 days. Historically, this pattern precedes increased stablecoin volatility.</p>
              </div>
            </Card>
          </div>
          
          {/* Multi-Exchange Liquidity Analysis */}
          <div className="col-span-12">
            <Card 
              title="Multi-Exchange Liquidity Analysis"
              headerAction={
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500">Displaying: Top 4 Stablecoins</span>
                  <button className="flex items-center text-xs text-gray-500 hover:text-blue-600">
                    <ChevronDown size={14} className="ml-1" />
                  </button>
                </div>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">USDC Liquidity</h3>
                    <span className="text-xs font-medium text-green-600">+2.3% 24h</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Curve 3pool</span>
                        <span className="font-medium">$328M</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Uniswap v3</span>
                        <span className="font-medium">$278M</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Binance</span>
                        <span className="font-medium">$412M</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Total: $1.23B (Healthy)</div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">USDT Liquidity</h3>
                    <span className="text-xs font-medium text-red-600">-4.8% 24h</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Curve 3pool</span>
                        <span className="font-medium">$412M</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Uniswap v3</span>
                        <span className="font-medium">$364M</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '58%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Binance</span>
                        <span className="font-medium">$782M</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Total: $2.01B (⚠️ Decline Trend)</div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">DAI Liquidity</h3>
                    <span className="text-xs font-medium text-green-600">+1.2% 24h</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Curve 3pool</span>
                        <span className="font-medium">$218M</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Uniswap v3</span>
                        <span className="font-medium">$192M</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Binance</span>
                        <span className="font-medium">$124M</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Total: $642M (Stable)</div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">FRAX Liquidity</h3>
                    <span className="text-xs font-medium text-red-600">-18.4% 24h</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Curve FRAX3CRV</span>
                        <span className="font-medium">$87M</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Uniswap v3</span>
                        <span className="font-medium">$63M</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Liquidity Concerns</span>
                        <span className="font-medium text-red-600">🔴 High</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-red-600 font-medium">Total: $178M (⚠️ Critical Decline)</div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* AI Insights and Live Risk Alerts */}
          <div className="col-span-12 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
              <div className="flex items-center">
                <Zap size={16} className="text-purple-600 mr-2" />
                <h2 className="text-base font-medium text-gray-800">AI-Generated Risk Intelligence</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Real-Time Risk Signals</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <AlertTriangle size={14} className="text-red-600" />
                    </div>
                    <p className="ml-2 text-xs text-gray-600">
                      <span className="font-medium text-red-600">Critical:</span> Two major USDT/USDC liquidity pools showing 73/27 ratio imbalance. Historical correlation with depegging events at 86%.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Clock size={14} className="text-yellow-600" />
                    </div>
                    <p className="ml-2 text-xs text-gray-600">
                      <span className="font-medium text-yellow-600">Warning:</span> On-chain data shows $178M USDT moving to exchanges in past 6 hours. 74% higher than 30-day average.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Activity size={14} className="text-blue-600" />
                    </div>
                    <p className="ml-2 text-xs text-gray-600">
                      <span className="font-medium text-blue-600">Monitor:</span> DAI collateral ratio dropping but still within safe range at 152%. Unusual ETH collateral removal activity detected.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Governance & Regulatory</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <AlertTriangle size={14} className="text-red-600" />
                    </div>
                    <p className="ml-2 text-xs text-gray-600">
                      <span className="font-medium text-red-600">High Impact:</span> SEC document leak suggests imminent stablecoin regulation proposal targeting non-bank issuers. 78% confidence.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Clock size={14} className="text-yellow-600" />
                    </div>
                    <p className="ml-2 text-xs text-gray-600">
                      <span className="font-medium text-yellow-600">Medium Impact:</span> MakerDAO vote on DAI interest rate model changes concludes in 18 hours. Current voting suggests 2.2% increase.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Activity size={14} className="text-blue-600" />
                    </div>
                    <p className="ml-2 text-xs text-gray-600">
                      <span className="font-medium text-blue-600">Low Impact:</span> USDC introducing enhanced audit framework with daily settlement verification. Confidence impact +3.8%.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Market Sentiment Indicators</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <AlertTriangle size={14} className="text-yellow-600" />
                    </div>
                    <p className="ml-2 text-xs text-gray-600">
                      <span className="font-medium text-yellow-600">Fear Level:</span> Social sentiment analysis shows 218% increase in negative USDT mentions. "Depeg" keyword up 112% in 24h.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Clock size={14} className="text-green-600" />
                    </div>
                    <p className="ml-2 text-xs text-gray-600">
                      <span className="font-medium text-green-600">Market Confidence:</span> Institutional stablecoin positions show 8.3% increase in USDC holdings, 4.2% decrease in USDT exposure.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Activity size={14} className="text-blue-600" />
                    </div>
                    <p className="ml-2 text-xs text-gray-600">
                      <span className="font-medium text-blue-600">Emerging Pattern:</span> Options market shows 5x spike in USDT de-peg insurance contracts. Similar to Feb 2023 pre-volatility pattern.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* AI Assistant */}
      {assistantOpen && (
        <div className={`fixed ${assistantMinimized ? 'bottom-0 right-6 w-auto' : 'bottom-6 right-6 w-80 h-96'} z-50 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ease-in-out`}>
          {/* Assistant Header */}
          <div className="bg-blue-700 text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <Bot size={18} className="mr-2" />
              <h3 className="font-medium text-sm">Stablecoin Assistant</h3>
            </div>
            <div className="flex items-center space-x-1">
              {assistantMinimized ? (
                <button 
                  onClick={() => setAssistantMinimized(false)}
                  className="p-1 hover:bg-blue-600 rounded"
                >
                  <ChevronUp size={16} />
                </button>
              ) : (
                <button 
                  onClick={() => setAssistantMinimized(true)}
                  className="p-1 hover:bg-blue-600 rounded"
                >
                  <MinusCircle size={16} />
                </button>
              )}
              <button 
                onClick={() => setAssistantOpen(false)}
                className="p-1 hover:bg-blue-600 rounded"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {/* Assistant Content */}
          {!assistantMinimized && (
            <>
              {/* Messages */}
              <div className="p-3 h-64 overflow-y-auto bg-gray-50">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-3 ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-white border border-gray-200 text-gray-800'} text-sm max-w-[90%]`}>
                      {message.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input */}
              <div className="p-3 border-t border-gray-200">
                <div className="flex">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about stablecoins..."
                    className="flex-grow text-sm border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-700 text-white rounded-r-md px-3 hover:bg-blue-800"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Assistant Toggle Button (only shown when assistant is closed) */}
      {!assistantOpen && (
        <button
          onClick={() => setAssistantOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 z-50 flex items-center justify-center"
        >
          <MessageSquare size={20} />
        </button>
      )}
    </div>
  );
};

export default StablecoinDashboard;
