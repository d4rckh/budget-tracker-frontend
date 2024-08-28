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


export default async function Page() {

  const {data: user} = await getUserDetails();
  if (!user) return redirect("/login");
  if (!user.verifiedAt) redirect("/account");

  const accounts = await getAccounts();
  const transactions = await getTransactions();
  const categories = await getCategories();

  return <>
    <Card>
      <CardHeader>
        <CardTitle>Accounts <NewAccountDialog/></CardTitle>
      </CardHeader>
      <CardContent className={"grid grid-cols-3 gap-4"}>
        {accounts.map(account =>

          <Card key={account.id}>
            <CardHeader>
              <CardTitle>{account.name}</CardTitle>
              <CardDescription>{account.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge className={"text-1xl"}>{account.balance} {account.currency}</Badge>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>

    <div className={"mt-4 flex flex-row gap-3"}>
        <AccountValueChart accounts={accounts} />
        <TransactionCategoriesChart />
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