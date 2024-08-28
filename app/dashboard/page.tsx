import {getUserDetails} from "@/actions/userActions";
import {redirect} from "next/navigation";
import {getAccounts} from "@/actions/accountActions";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

import NewAccountDialog from "@/components/accounts/NewAccountDialog";
import { Badge } from "@/components/ui/badge";

import TransactionTable from "@/components/transaction /TransactionTable";
import React from "react";
import NewTransactionDialog from "@/components/transaction /NewTransactionDialog";

export default async function Page() {

  const user = await getUserDetails();
  if (!user) return redirect("/login");
  if (!user.verifiedAt) redirect("/account");

  const accounts = await getAccounts();

  return <>
    <Card>
      <CardHeader>
        <CardTitle>Accounts <NewAccountDialog /></CardTitle>
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
    <Card className={"mt-4"}>
      <CardHeader>
        <CardTitle>Transactions <NewTransactionDialog/></CardTitle>
      </CardHeader>
      <CardContent>
        <TransactionTable/>
      </CardContent>
    </Card>
  </>
}