"use client";

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, BrainCircuit } from 'lucide-react';
import { analyzeFinance, type AnalyzeFinanceOutput } from '@/ai/flows/analyze-finance-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

export const AnalyticsCharts = () => {
  const { transactions } = useFinance();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzeFinanceOutput | null>(null);

  const areaData = [...transactions]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-10)
    .map(t => ({
      name: new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      amount: t.type === 'Income' ? t.amount : -t.amount,
      displayAmount: t.amount
    }));

  const categoryMap = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc: Record<string, number>, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const pieData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const handleExplainChart = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeFinance({ 
        transactions: transactions.slice(-10) 
      });
      setAnalysis(result);
    } catch (error) {
      console.error('AI Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card className="card-shadow overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-[11px] weight-black uppercase tracking-[0.25em] text-slate-400">Transaction Velocity (Trend)</CardTitle>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleExplainChart} 
              disabled={isAnalyzing || transactions.length === 0}
              className="rounded-xl border-indigo-100 text-indigo-600 hover:bg-indigo-50 font-bold text-xs"
            >
              {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-2" />}
              Explain This Chart
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-[350px] w-full">
              {areaData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: '#94a3b8', fontWeight: 700 }}
                    />
                    <YAxis 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: '#94a3b8', fontWeight: 700 }}
                      tickFormatter={(value) => `₹${Math.abs(value)}`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                      formatter={(value: number) => [`₹${Math.abs(value)}`, 'Value']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#6366f1" 
                      fillOpacity={1} 
                      fill="url(#colorAmount)" 
                      strokeWidth={4}
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                  Insufficient telemetry for trend analysis
                </div>
              )}
            </div>

            {analysis && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-indigo-50/50 border border-indigo-100/50 p-6 rounded-[1.5rem]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-600 rounded-lg shadow-lg">
                    <BrainCircuit className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[10px] weight-black text-indigo-600 uppercase tracking-widest">AI Analyst Reasoning</h4>
                    <p className="text-sm font-bold text-slate-900">Trajectory: {analysis.status}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{analysis.summary}</p>
                <Alert className="bg-white/80 border-indigo-100">
                  <AlertTitle className="text-xs weight-black text-indigo-900">PROACTIVE ACTION</AlertTitle>
                  <AlertDescription className="text-xs text-indigo-700 font-medium">
                    {analysis.recommendation}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="card-shadow overflow-hidden h-fit">
        <CardHeader className="pb-2">
          <CardTitle className="text-[11px] weight-black uppercase tracking-[0.25em] text-slate-400">Expenditure Classification</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] pt-4">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1500}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`₹${value}`, 'Total']}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={60} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
              No expenditure classified
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
