import React, { useState } from 'react'
import { Button, Space, Table } from 'antd'
import { getScraping, getScrapingOlx, getScrapingOlxPup } from '@/pages/api/scraping'
import { TabelaOlx } from '@/components/TabelaOlx'

export default function Home() {

  const [data, setData] = useState([]);
  const [dataOlx, setDataOlx] = useState([]);

  const handleScraping = async () => {
    const response = await getScraping();
    setData(response.data);
  }

  const handleScrapingOlxPup = async () => {
    const response = await getScrapingOlxPup();
    setData(response.data);
  }

  const handleScrapingOlx = async () => {
    const response = await getScrapingOlx("https://prada-api.olx.com.br/store/v1/data/53569844?offset=0&category=&state=&search=&sort=&x-upr-origin=store-client-1.17.26&x-upr-req-type=csr");
    const total = response.data.total
    const paginas = Math.ceil(total / 30)

    const array = []

    if(paginas > 1) {
      for (let i = 1; i <= paginas; i++) {
        console.log(i);
        const offset = (i - 1) * 30
        const dados = await getScrapingOlx(`https://prada-api.olx.com.br/store/v1/data/53569844?offset=${offset}&category=&state=&search=&sort=&x-upr-origin=store-client-1.17.26&x-upr-req-type=csr`);
        array.push(...array ,...dados.data.content)
      }
    }

    //remover todos os duplicados de array pelo listId
    const uniqueArray = array.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return index === array.findIndex(obj => {
        return JSON.stringify(obj) === _thing;
      });
    });

    setDataOlx(uniqueArray);
  }

  console.log('data', !!data);


  return (
    <div>
      <h1>Exportar Dados</h1>
      <Space direction="horizontal" size={12}>
      <Button type="primary" onClick={() => handleScraping()}>GREGO IMOVEIS</Button>
      <Button type="primary" onClick={() => handleScrapingOlx()}>OLX</Button>
      <Button type="primary" onClick={() => handleScrapingOlxPup()}>OLX Scraping</Button>
      </Space>

      {data.length > 0 && (
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
      )}
      {dataOlx.length > 0 && <TabelaOlx data={dataOlx} />}
    </div>
  )
}
