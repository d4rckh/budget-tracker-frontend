import {getUserDetails} from "@/actions/userActions";
import {redirect} from "next/navigation";
import {getAccounts} from "@/actions/accountActions";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

import NewAccountDialog from "@/components/accounts/NewAccountDialog";
import { Badge } from "@/components/ui/badge";
import {getTransactions} from "@/actions/transactionActions";


import React from "react";
import TransactionTable from "@/components/transaction/TransactionTable";
import NewTransactionDialog from "@/components/transaction/NewTransactionDialog";
import {getCategories} from "@/actions/categoryActions";
import AccountValueChart from "@/components/accounts/charts/AccountValueChart";
import {TransactionCategoriesChart} from "@/components/transaction/charts/TransactionCategoriesChart";
import EditAccountDialog from "@/components/accounts/EditAccountDialog";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default async function Page() {

  const {data: user} = await getUserDetails();
  if (!user) return redirect("/login");
  if (!user.verifiedAt) redirect("/account");

  const accounts_data = await getAccounts();
  const accounts = accounts_data.sort((a,b) => a.id - b.id);
  const transactions_data = await getTransactions();
  const transactions = transactions_data.sort((a,b) => b.id - a.id);
  const categories_data = await getCategories();
  const categories = categories_data.sort((a,b) => a.id - b.id);

  return <>
    <Card className={"mb-3"}>
      <CardHeader>
        <CardTitle>Your Dashboard</CardTitle>
        <CardDescription>Your total net worth is <span className={"font-bold"}>{accounts.reduce((acc, cur) => acc + cur.balance, 0)} USD</span></CardDescription>
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
              {accounts.map(account =>
                <EditAccountDialog key={account.id} account={account}>
                  <TableRow className={"cursor-pointer"}>
                    <TableCell className={"font-bold"}>{account.name} <Badge className={"ml-2"} variant={"outline"}>{account.type}</Badge></TableCell>
                    <TableCell className={"text-right"}><Badge>{account.balance} {account.currency}</Badge></TableCell>
                  </TableRow>
                </EditAccountDialog>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AccountValueChart accounts={accounts} />
    </div>

    <div className={"mt-4 flex flex-row gap-3"}>
      <TransactionCategoriesChart transactions={transactions.filter(t => t.type == "EXPENSE")} categories={categories} title={"Expense Categories"} />
      <TransactionCategoriesChart transactions={transactions.filter(t => t.type == "INCOME")} categories={categories} title={"Income Categories"} />
    </div>

    <Card className={"mt-4"}>
      <CardHeader>
        <CardTitle>Transactions <NewTransactionDialog  accounts={accounts} userId={user.id} categories={categories}/></CardTitle>
     </CardHeader>
      <CardContent>
        <TransactionTable transactions={transactions} categories={categories}/>
      </CardContent>
    </Card>
  </>
}