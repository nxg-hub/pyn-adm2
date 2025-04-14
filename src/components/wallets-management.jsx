"use client"

import { useState } from "react"
import { Badge } from "/ui/badge"
import { useAdmin } from "./admin-context"

export function WalletsManagement() {
  const { hasPermission } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data for wallets
  const wallets = [
    {
      id: 'WAL123456',
      user: 'John Doe',
      userId: 'USR123456',
      type: 'fiat',
      currency: 'USD',
      balance: '$1,234.56',
      status: 'active',
      creationDate: '2023-01-15',
      lastTransaction: '2023-06-15'
    },
    {
      id: 'WAL123457',
      user: 'Jane Smith',
      userId: 'USR123457',
      type: 'fiat',
      currency: 'EUR',
      balance: '€567.89',
      status: 'active',
      creationDate: '2023-02-20',
      lastTransaction: '2023-06-14'
    },
    {
      id: 'WAL123458',
      user: 'Bob Johnson',
      userId: 'USR123458',
      type: 'crypto',
      currency: 'BTC',
      balance: '0.05 BTC',
      status: 'frozen',
      creationDate: '2023-03-10',
      lastTransaction: '2023-05-01'
    },
    {
      id: 'WAL123459',
      user: 'Alice Brown',
      userId: 'USR123459',
      type: 'fiat',
      currency: 'GBP',
      balance: '£2,345.67',
      status: 'active',
      creationDate: '2023-01-05',
      lastTransaction: '2023-06-12'
    },
    {
      id: 'WAL123460',
      user: 'Charlie Wilson',
      userId: 'USR123460',
      type: 'crypto',
      currency: 'ETH',
      balance: '1.5 ETH',
      status: 'frozen',
      creationDate: '2023-04-15',
      lastTransaction: '2023-06-01'
    },
    {
      id: 'WAL123461',
      user: 'Eve Davis',
      userId: 'USR123461',
      type: 'fiat',
      currency: 'USD',
      balance: '$456.78',
      status: 'active',
      creationDate: '2023-05-20',
      lastTransaction: '2023-06-10'
    },
    {
      id: 'WAL123462',
      user: 'Frank Miller',
      userId: 'USR123462',
      type: 'fiat',
      currency: 'USD',
      balance: '$3,456.78',
      status: 'active',
      creationDate: '2023-02-10',
      lastTransaction: '2023-06-09'
    },
    {
      id: 'WAL123463',
      user: 'Grace Taylor',
      userId: 'USR123463',
      type: 'fiat',
      currency: 'EUR',
      balance: '€0.00',
      status: 'inactive',
      creationDate: '2023-03-25',
      lastTransaction: '2023-04-15'
    },
    {
      id: 'WAL123464',
      user: 'Henry Clark',
      userId: 'USR123464',
      type: 'crypto',
      currency: 'BTC',
      balance: '0.1 BTC',
      status: 'active',
      creationDate: '2023-01-30',
      lastTransaction: '2023-06-07'
    },
    {
      id: 'WAL123465',
      user: 'Ivy Martin',
      userId: 'USR123465',
      type: 'fiat',
      currency: 'USD',
      balance: '$2,345.67',
      status: 'active',
      creationDate: '2023-04-05',
      lastTransaction: '2023-06-06'
    },
    {
      id: 'WAL123466',
      user: 'Jack Wilson',
      userId: 'USR123466',
      type: 'crypto',
      currency: 'ETH',
      balance: '0.75 ETH',
      status: 'frozen',
      creationDate: '2023-02-15',
      lastTransaction: '2023-05-20'
    },
    {
      id: 'WAL123467',
      user: 'Karen Brown',
      userId: 'USR123467',
      type: 'fiat',
      currency: 'GBP',
      balance: '£890.12',
      status: 'active',
      creationDate: '2023-05-10',
      lastTransaction: '2023-06-04'
    },
  ];

  // Filter wallets based on search term
  const filteredWallets = wallets.filter(wallet =>
    wallet.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate wallets
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWallets.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Define columns
  const columns = [
    { header: 'Wallet ID', accessorKey: 'id' },
    {
      header: 'User',
      accessorKey: 'user',
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.user}</p>
          <p className="text-sm text-muted-foreground">{row.original.userId}</p>
        </div>
      )
    },
    {
      header: 'Type',
      accessorKey: 'type',
      cell: ({ row }) => {
        const type = row.original.type;
        return <Badge variant="outline">{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>;
      }
    }
    ]
}
