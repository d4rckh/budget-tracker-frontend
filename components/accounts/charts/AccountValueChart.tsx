"use client"

import {TrendingUp} from "lucide-react"
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {AccountContract} from "@/types/BudgetContract";

const chartConfig = {} satisfies ChartConfig

export default function AccountValueChart({accounts}: { accounts: AccountContract[] }) {
    return (
        <Card className={"w-full h-full"}>
            <CardHeader>
                <CardTitle>Accounts Net Worth</CardTitle>
                <CardDescription>Graph showing the current net worth of each account</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={accounts.map(account => ({
                        accountName: account.name,
                        value: account.balance
                    }))}>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="accountName"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed"/>}
                        />
                        <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={4}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
