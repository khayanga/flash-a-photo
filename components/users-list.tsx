import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Creator", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Client", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Creator", status: "Inactive" },
]

export function UsersList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Badge variant={user.status === "Active" ? "success" : "secondary"}>
                {user.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

