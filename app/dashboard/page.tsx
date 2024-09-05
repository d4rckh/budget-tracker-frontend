"use client"

import {useEffect, useState} from "react";
import {UserContract} from "@/types/UserContract";
import {AccountContract} from "@/types/BudgetContract";
import {TransactionContract} from "@/types/TransactionContract";
import {CategoryContract} from "@/types/CategoryContract";
import {getUserDetails} from "@/actions/userActions";
import {redirect} from "next/navigation";
import {getAccounts} from "@/actions/accountActions";
import {getTransactions} from "@/actions/transactionActions";
import {getCategories} from "@/actions/categoryActions";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import NewAccountDialog from "@/components/accounts/NewAccountDialog";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import EditAccountDialog from "@/components/accounts/EditAccountDialog";
import {Badge} from "@/components/ui/badge";
import AccountValueChart from "@/components/accounts/charts/AccountValueChart";
import {TransactionCategoriesChart} from "@/components/transaction/charts/TransactionCategoriesChart";
import NewTransactionDialog from "@/components/transaction/NewTransactionDialog";
import TransactionTable from "@/components/transaction/TransactionTable";


export default function Page() {

    const [user, setUser] = useState<UserContract>();
    const [accounts, setAccounts] = useState<AccountContract[]>([]);
    const [transactions, setTransactions] = useState<TransactionContract[]>([]);
    const [categories, setCategories] = useState<CategoryContract[]>([]);
    const [currencyFilter, setCurrencyFilter] = useState("ALL");

    useEffect(() => {
        async function fetchData() {
            const {data: user} = await getUserDetails();
            if (!user) {
                redirect("/login");
            } else if (!user.verifiedAt) {
                redirect("/account");
            } else {
                setUser(user);

                const accounts_data = await getAccounts();
                setAccounts(accounts_data.sort((a, b) => a.id - b.id));

                const transactions_data = await getTransactions();
                setTransactions(transactions_data.sort((a, b) => b.id - a.id));

                const categories_data = await getCategories();
                setCategories(categories_data.sort((a, b) => a.id - b.id));
            }

        }

        fetchData();
    }, []);

    const filteredAccounts = currencyFilter === "ALL"
        ? accounts
        : accounts.filter(account => account.currency === currencyFilter);

    const filteredTransactions = currencyFilter === "ALL"
        ? transactions
        : transactions.filter(transaction =>
            filteredAccounts.some(account => account.id === transaction.accountId)
        );

    return (
        <>
            <Card className={"mb-3"}>
                <CardHeader>
                    <CardTitle>Your Dashboard</CardTitle>
                    <CardDescription>
                        Your total net worth is{" "}
                        <span className={"font-bold"}>
              {filteredAccounts.reduce((acc, cur) => acc + cur.balance, 0)} USD
            </span>
                    </CardDescription>
                    <CardDescription>
                        <Button className={"m-2"} onClick={() => setCurrencyFilter("ALL")}>
                            ALL
                        </Button>
                        <Button className={"m-2"} onClick={() => setCurrencyFilter("USD")}>
                            USD
                        </Button>
                        <Button className={"m-2"} onClick={() => setCurrencyFilter("RON")}>
                            RON
                        </Button>
                        <Button className={"m-2"} onClick={() => setCurrencyFilter("EUR")}>
                            EUR
                        </Button>
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className={"flex flex-row gap-3"}>
                <Card className={"w-[600px]"}>
                    <CardHeader>
                        <CardTitle>Accounts <NewAccountDialog/></CardTitle>
                    </CardHeader>
                    <CardContent className={"grid grid-cols-1 gap-4"}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead className={"text-right"}>Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAccounts.map((account) => (
                                    <EditAccountDialog key={account.id} account={account}>
                                        <TableRow className={"cursor-pointer"}>
                                            <TableCell className={"font-bold"}>
                                                {account.name}{" "}
                                                <Badge className={"ml-2"} variant={"outline"}>
                                                    {account.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className={"text-right"}>
                                                <Badge>
                                                    {account.balance} {account.currency}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    </EditAccountDialog>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <AccountValueChart accounts={filteredAccounts}/>
            </div>

            <div className={"mt-4 flex flex-row gap-3"}>
                <TransactionCategoriesChart
                    transactions={filteredTransactions.filter((t) => t.type === "EXPENSE")}
                    categories={categories}
                    title={"Expense Categories"}
                />
                <TransactionCategoriesChart
                    transactions={filteredTransactions.filter((t) => t.type === "INCOME")}
                    categories={categories}
                    title={"Income Categories"}
                />
            </div>

            <Card className={"mt-4"}>
                <CardHeader>
                    <CardTitle>
                        Transactions{" "}
                        {user && (
                            <NewTransactionDialog
                                accounts={filteredAccounts}
                                userId={user.id}
                                categories={categories}
                            />
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <TransactionTable
                        accounts={filteredAccounts}
                        transactions={filteredTransactions}
                        categories={categories}
                    />
                </CardContent>
            </Card>
        </>
    );
}