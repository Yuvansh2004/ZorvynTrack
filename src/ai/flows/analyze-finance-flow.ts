'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeFinanceInputSchema = z.object({
  transactions: z.array(z.object({
    date: z.string(),
    description: z.string(),
    amount: z.number(),
    type: z.enum(['Income', 'Expense']),
    category: z.string()
  })).describe('List of recent transactions to analyze.')
});

const AnalyzeFinanceOutputSchema = z.object({
  summary: z.string().describe('A natural language summary of the financial trajectory.'),
  recommendation: z.string().describe('A proactive recommendation based on spending patterns.'),
  status: z.enum(['Growth', 'Stable', 'Risk']).describe('Overall financial status.')
});

export type AnalyzeFinanceInput = z.infer<typeof AnalyzeFinanceInputSchema>;
export type AnalyzeFinanceOutput = z.infer<typeof AnalyzeFinanceOutputSchema>;

const analyzePrompt = ai.definePrompt({
  name: 'analyzeFinancePrompt',
  input: { schema: AnalyzeFinanceInputSchema },
  output: { schema: AnalyzeFinanceOutputSchema },
  prompt: `You are a professional financial analyst at Zorvyn FinTech. 
  Analyze the following transactions and provide a concise, high-impact executive summary.
  
  Identify:
  1. Spending velocity spikes.
  2. Savings rate efficiency.
  3. Unusual category concentration.
  
  Transactions:
  {{#each transactions}}
  - {{date}}: {{description}} ({{category}}) - {{type}}: ₹{{amount}}
  {{/each}}
  
  Return your analysis in the requested JSON format.`
});

export async function analyzeFinance(input: AnalyzeFinanceInput): Promise<AnalyzeFinanceOutput> {
  const { output } = await analyzePrompt(input);
  if (!output) throw new Error('Analysis failed');
  return output;
}
