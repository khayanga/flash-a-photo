import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const payments = [
  { id: 1, date: "2023-06-01", amount: 15000, status: "Completed" },
  { id: 2, date: "2023-06-02", amount: 20000, status: "Pending" },
  { id: 3, date: "2023-06-03", amount: 10000, status: "Completed" },
]

export function PaymentsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{payment.date}</TableCell>
            <TableCell>KES {payment.amount.toLocaleString()}</TableCell>
            <TableCell>
              <Badge variant={payment.status === "Completed" ? "success" : "warning"}>
                {payment.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

