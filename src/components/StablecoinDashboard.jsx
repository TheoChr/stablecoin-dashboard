import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { AlertTriangle, Activity, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';

const StablecoinDashboard = () => {
  // Market anomalies data
  const anomalies = [
    {
      id: 1,
      title: 'USDT-USDC Curve Pool Imbalance',
      description: 'Unusual 73%/27% ratio detected (normally 50%/50%). Historical signal of depegging events.',
      severity: 'high',
      subtitle: 'High correlation with May 2023 USDT events'
    },
    {
      id: 2,
      title: 'FRAX Algorithmic Model Stress',
      description: 'Collateral ratio dropped to 85.2%. On-chain data shows 48M tokens at risk of liquidation if ETH drops 3% more.',
      severity: 'medium',
      subtitle: '3 similar events in past 90 days'
    },
    {
      id: 3,
      title: 'Unusual Cross Chain Flow Pattern',
      description: 'USDC migrating from Ethereum to Binance Chain up 187% in 24h. Historically correlated with regulatory concerns.',
      severity: 'low',
      subtitle: 'Similar to pre-SEC announcement pattern'
    }
  ];

  // Stablecoin data
  const stablecoins = [
    {
      id: 1,
      name: 'USDC',
      type: 'USD Coin',
      price: 1.0002,
      change: 0.02,
      deviation: '0.05%',
      volatility: '0.02%',
      flow: '$39.2M',
      flowDirection: 'inflow',
      marketCap: '$42.8B',
      marketCapChange: '+0.5%',
      health: 98.7,
      healthStatus: 'Healthy'
    },
    {
      id: 2,
      name: 'USDT',
      type: 'USD Tether',
      price: 0.9991,
      change: -0.09,
      deviation: '0.12%',
      volatility: '0.18%',
      flow: '$34.8M',
      flowDirection: 'outflow',
      marketCap: '$84.3B',
      marketCapChange: '-0.2%',
      health: 91.2,
      healthStatus: 'Moderate'
    },
    {
      id: 3,
      name: 'DAI',
      type: 'Dai Stablecoin',
      price: 1.0023,
      change: 0.23,
      deviation: '0.08%',
      volatility: '0.10%',
      flow: '$24.4M',
      flowDirection: 'inflow',
      marketCap: '$5.3B',
      marketCapChange: '+1.2%',
      health: 95.5,
      healthStatus: 'Healthy'
    },
    {
      id: 4,
      name: 'FRAX',
      type: 'Frax Finance',
      price: 0.9721,
      change: -0.79,
      deviation: '0.42%',
      volatility: '0.55%',
      flow: '$35.3M',
      flowDirection: 'outflow',
      marketCap: '$0.9B',
      marketCapChange: '-6.1%',
      health: 78.8,
      healthStatus: 'At Risk'
    }
  ];

  // Peg chart data
  const pegChartData = [
    { time: '6AM', USDC: 1.000, USDT: 1.000, DAI: 1.001, FRAX: 0.990 },
    { time: '7AM', USDC: 1.000, USDT: 1.000, DAI: 1.001, FRAX: 0.989 },
    { time: '8AM', USDC: 1.000, USDT: 0.999, DAI: 1.000, FRAX: 0.988 },
    { time: '9AM', USDC: 1.000, USDT: 0.999, DAI: 1.001, FRAX: 0.989 },
    { time: '10AM', USDC: 1.000, USDT: 0.999, DAI: 1.001, FRAX: 0.988 },
    { time: '11AM', USDC: 0.999, USDT: 0.998, DAI: 1.001, FRAX: 0.987 },
    { time: '12PM', USDC: 1.000, USDT: 0.997, DAI: 1.001, FRAX: 0.986 },
    { time: '1PM', USDC: 1.000, USDT: 0.998, DAI: 1.002, FRAX: 0.988 },
    { time: '2PM', USDC: 1.000, USDT: 0.998, DAI: 1.001, FRAX: 0.987 },
    { time: '3PM', USDC: 0.999, USDT: 0.997, DAI: 1.001, FRAX: 0.972 }
  ];

  // Flow data for chart
  const flowData = [
    { name: 'USDC', outflows: -100, inflows: 200 },
    { name: 'USDT', outflows: -200, inflows: 150 },
    { name: 'DAI', outflows: -80, inflows: 140 },
    { name: 'FRAX', outflows: -150, inflows: 80 },
    { name: 'BUSD', outflows: -60, inflows: 40 }
  ];

  // USDT reserve data
  const usdtReserveData = [
    { name: 'Cash', value: 6, color: '#3B82F6' },
    { name: 'Treasury', value: 20, color: '#10B981' },
    { name: 'Commercial Paper', value: 10, color: '#F59E0B' },
    { name: 'Corporate Bonds', value: 5, color: '#8B5CF6' },
    { name: 'Other', value: 59, color: '#EC4899' }
  ];

  // Correlation data
  const correlationData = [
    { name: 'USDC-ETH', value: 0.15 },
    { name: 'USDT-ETH', value: 0.33 },
    { name: 'DAI-ETH', value: 0.21 },
    { name: 'USDC-BTC', value: 0.18 },
    { name: 'USDT-BTC', value: 0.22 },
    { name: 'DAI-BTC', value: 0.19 }
  ];

  // Helper functions
  const getHealthColor = (health) => {
    if (health >= 95) return 'text-green-600';
    if (health >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBg = (health) => {
    if (health >= 95) return 'bg-green-500';
    if (health >= 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'low':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="text-red-500" size={16} />;
      case 'medium':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'low':
        return <Activity className="text-blue-500" size={16} />;
      default:
        return <Activity className="text-gray-500" size={16} />;
    }
  };

  const getDeviationIndicator = (coin) => {
    const value = parseFloat(coin.deviation);
    if (value <= 0.05) {
      return (
        <div className="flex items-center">
          <div className="w-16 h-1 bg-gray-200 rounded-full mr-2">
            <div className="h-full w-1/5 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-600">{coin.deviation}</span>
        </div>
      );
    } else if (value <= 0.2) {
      return (
        <div className="flex items-center">
          <div className="w-16 h-1 bg-gray-200 rounded-full mr-2">
            <div className="h-full w-2/5 bg-yellow-500 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-600">{coin.deviation}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <div className="w-16 h-1 bg-gray-200 rounded-full mr-2">
            <div className="h-full w-4/5 bg-red-500 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-600">{coin.deviation}</span>
        </div>
      );
    }
  };

  const getVolatilityIndicator = (coin) => {
    const value = parseFloat(coin.volatility);
    if (value <= 0.05) {
      return (
        <div className="flex items-center">
          <div className="w-16 h-1 bg-gray-200 rounded-full mr-2">
            <div className="h-full w-1/5 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-600">{coin.volatility}</span>
        </div>
      );
    } else if (value <= 0.2) {
      return (
        <div className="flex items-center">
          <div className="w-16 h-1 bg-gray-200 rounded-full mr-2">
            <div className="h-full w-2/5 bg-yellow-500 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-600">{coin.volatility}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <div className="w-16 h-1 bg-gray-200 rounded-full mr-2">
            <div className="h-full w-4/5 bg-red-500 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-600">{coin.volatility}</span>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Market Anomalies Section */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertTriangle className="text-amber-500 mr-2" size={20} />
            <h2 className="text-lg font-medium text-gray-800">Market Anomalies Detected</h2>
          </div>
          <span className="text-xs text-gray-500">Updated 5 min ago</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {anomalies.map(anomaly => (
            <div 
              key={anomaly.id} 
              className={`p-3 rounded border ${getSeverityStyle(anomaly.severity)}`}
            >
              <div className="flex">
                <div className="mr-3 mt-1">
                  {getSeverityIcon(anomaly.severity)}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{anomaly.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{anomaly.description}</p>
                  <div className="mt-2 text-xs text-gray-500 flex items-center">
                    <span>{anomaly.subtitle}</span>
                    <ChevronRight size={14} className="ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (8/12) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Advanced Stablecoin Market Analysis */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Advanced Stablecoin Market Analysis</h2>
              <div className="flex items-center text-xs">
                <button className="text-gray-500 border border-gray-300 px-2 py-1 rounded-l">
                  Custom View
                </button>
                <button className="bg-blue-600 text-white px-2 py-1 rounded-r">
                  Critical On-Chain Flows (24h)
                </button>
              </div>
            </div>
            
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
                  {stablecoins.map(coin => (
                    <tr key={coin.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap">
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
                            <div className="text-xs text-gray-500">{coin.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="text-sm">${coin.price.toFixed(4)}</div>
                        <div className={`text-xs flex items-center ${coin.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {coin.change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                          {Math.abs(coin.change).toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {getDeviationIndicator(coin)}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {getVolatilityIndicator(coin)}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center text-sm">
                          {coin.flowDirection === 'inflow' ? 
                            <ArrowUp size={14} className="text-green-600 mr-1" /> : 
                            <ArrowDown size={14} className="text-red-600 mr-1" />
                          }
                          {coin.flow}
                        </div>
                        <div className="text-xs text-gray-500">net {coin.flowDirection} 24h</div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="text-sm">{coin.marketCap}</div>
                        <div className={`text-xs ${coin.marketCapChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {coin.marketCapChange} 24h
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getHealthColor(coin.health)}`}>
                          {coin.health.toFixed(1)} {coin.healthStatus}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Peg Stability Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Peg Stability Comparison (24h)</h2>
              <div className="flex items-center text-xs space-x-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span>USDC</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span>USDT</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                  <span>DAI</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span>FRAX</span>
                </div>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pegChartData} margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0.96, 1.005]} tickCount={5} />
                  <Tooltip />
                  <Line type="monotone" dataKey="USDC" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="USDT" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="DAI" stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="FRAX" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-100">
              <div className="flex items-start">
                <Activity size={16} className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  <span className="font-medium">AI Insight:</span> USDT showing unusual 4-hour oscillation pattern, similar to pre-depegging events in historical data. Monitoring recommended.
                </p>
              </div>
            </div>
          </div>
          
          {/* Multi-Exchange Liquidity Analysis */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Multi-Exchange Liquidity Analysis</h2>
              <div className="flex items-center text-xs">
                <span>Displaying: Top 4 Stablecoins</span>
                <ChevronRight size={16} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {stablecoins.map(coin => (
                <div key={coin.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{coin.name} Liquidity</div>
                    <div className={`text-xs ${coin.marketCapChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {coin.marketCapChange} 24h
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {/* Simplified liquidity visualization with 3 progress bars */}
                    <div className="flex items-center justify-between text-xs">
                      <div>Curve Pool</div>
                      <div className="font-medium">$100M</div>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div>Uniswap v3</div>
                      <div className="font-medium">$150M</div>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div>Finance</div>
                      <div className="font-medium">$50M</div>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm pt-2">
                      <div className="font-medium">Total: $300M</div>
                      <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                        coin.health >= 95 ? 'bg-green-100 text-green-800' :
                        coin.health >= 85 ? 'bg-blue-100 text-blue-800' :
                        coin.health >= 75 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {coin.health >= 95 ? 'Healthy' :
                         coin.health >= 85 ? 'Stable' :
                         coin.health >= 75 ? 'Declining' :
                         'Critical'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column (4/12) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Critical On-Chain Flows */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Critical On-Chain Flows (24h)</h2>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={flowData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[-300, 300]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="outflows" fill="#ef4444" />
                  <Bar dataKey="inflows" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-3">
              <div className="p-3 bg-yellow-50 rounded border border-yellow-100">
                <p className="text-sm font-medium">Unusual pattern:</p>
                <p className="text-xs text-gray-700">Net USDT outflow accelerating with 75% coming from three whale addresses. Historical correlation to market stress events.</p>
              </div>
            </div>
          </div>
          
          {/* USDT Reserve Composition */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-4">USDT Reserve Composition</h2>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usdtReserveData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {usdtReserveData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
              {usdtReserveData.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stablecoin-Crypto Correlations */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Stablecoin-Crypto Correlations</h2>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={correlationData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 0.5]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-100">
              <div className="flex items-start">
                <Activity size={16} className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Insight:</span> USDT-ETH correlation at 0.33 has increased 128% in 7 days. Historically, this pattern precedes increased stablecoin volatility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StablecoinDashboard;
