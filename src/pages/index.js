import React, { useState } from 'react'
import { Button, Table } from 'antd'
import { getScraping } from '@/pages/api/scraping'

export default function Home() {

  const [data, setData] = useState([]);

  const handleScraping = async () => {
    const response = await getScraping();
    setData(response.data);
  }

  console.log(data);

  return (
    <div>
      <h1>Exportar Dados</h1>
      <Button type="primary" onClick={() => handleScraping()}>Button</Button>
      <Table 
        dataSource={data} 
        columns={[
        {
          title: 'Título',
          dataIndex: 'title',
          key: 'title',  
        },
        {
          title: 'Preço',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Cômodos',
          dataIndex: ['details', 'Cômodos'],
          key: 'details',
        },
        {
          title: 'Proximidades',
          dataIndex: ['details', 'Proximidades'],
          key: 'details',
        },
        ]} 
      />
    </div>
  )
}
