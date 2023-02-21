import React, { useState } from 'react'
import { Button, Space, Table } from 'antd'
import { getScraping, getScrapingOlx, getScrapingOlxPup, getScrapingWhatsapp } from '@/pages/api/scraping'
import { TabelaOlx } from '@/components/TabelaOlx'
import exportFromJSON from "export-from-json";

export default function Home() {

  const [data, setData] = useState([]);
  const [dataOlx, setDataOlx] = useState([]);
  const [dataOlxPup, setDataOlxPup] = useState([]);
  const [dataWhatsapp, setDataWhatsapp] = useState([]);
  const [exportData, setExportData] = useState([])

  const handleScraping = async () => {
    await getScraping()
      .then((response) => {
        setData(response.data);

        let exportarDados = []

        for (const item of response.data) {
          exportarDados.push({
            "Título": item.title,
            "Preço": item.price,
            "Status": item.status,
            "Cômodos": item.details['Cômodos'],
            "Proximidades": item.details['Proximidades'],
          })
        }

        setExportData(exportarDados)
      })
  }

  const handleScrapingOlxPup = async () => {
    const response = await getScrapingOlxPup();
    setData(response.data);
  }

  const handleScrapingWhatsapp = async () => {
    await getScrapingWhatsapp(
      {
        access_token: "WA|787118555984857|7bb1544a3599aa180ac9a3f7688ba243",
        doc_id: "5456143974442934",
        variables: {
          request: {
            product_catalog: {
              jid: "558198342670@c.us",
              allow_shop_source: "ALLOWSHOPSOURCE_FALSE",
              width: "100",
              height: "100",
              limit: "10",
              after: "eyJwbHVnaW5fbmFtZSI6IldIQVRTQVBQX0NBVEFMT0ciLCJxdWVyeV9lbmNvZGVkIjoiZXlKelpXRnlZMmhmY1hWbGNua2lPbTUxYkd3c0ltWnBiSFJsY2lJNmJuVnNiQ3dpYVhSbGJWOXBaSE5mZEc5ZlpYaGpiSFZrWlNJNlcxMHNJbk52Y25SZmRIbHdaU0k2SW5KbFkyVnVZM2tpTENKaFpHUnBkR2x2Ym1Gc1gzQmhjbUZ0Y3lJNmJuVnNiQ3dpY0hKbFptVjBZMmhwYm1jaU9tWmhiSE5sTENKa1pXSjFaMTl2Y0hScGIyNXpJanB1ZFd4c2ZRPT0iLCJwYXJhbXNfZW5jb2RlZCI6ImV5SndjbTlrZFdOMFgzTmxkRjlwWkNJNk5ETTVPRFV4TXprME1ERXhPREl5TENKMWMyVmZkR1Y0ZEY5eGRXVnllVjltYjNKZmNtRnVhMmx1WjE5dmJteDVJanB1ZFd4c2ZRPT0iLCJjYWxsc2l0ZSI6IndoYXRzYXBwX2NhdGFsb2ciLCJzdXJmYWNlIjoid2hhdHNhcHAiLCJwYWdpbmF0aW9uX2N1cnNvciI6ImV5SmxibU52WkdWa1gyOTJaWEptWlhSamFHVmtYM1poYkdsa1lYUmxaRjlwZEdWdFgybGtjeUk2VzNzaWFYUmxiVjlwWkNJNk5UWXlOVE00T0RreE1EZ3pOakEwTUN3aVpXNWpiMlJsWkY5dFpYUmhaR0YwWVNJNklpSjlMSHNpYVhSbGJWOXBaQ0k2TlRReE16WTVOakE0T0Rjd01UazFOU3dpWlc1amIyUmxaRjl0WlhSaFpHRjBZU0k2SWlKOUxIc2lhWFJsYlY5cFpDSTZNemt6TURRNE16VTRNRE0zTnprME9Td2laVzVqYjJSbFpGOXRaWFJoWkdGMFlTSTZJaUo5TEhzaWFYUmxiVjlwWkNJNk5ETTVNak0wT0RjM056UTFPVEF5Tml3aVpXNWpiMlJsWkY5dFpYUmhaR0YwWVNJNklpSjlMSHNpYVhSbGJWOXBaQ0k2TkRJNU5qazJNakV6TXpjd01EazNNeXdpWlc1amIyUmxaRjl0WlhSaFpHRjBZU0k2SWlKOUxIc2lhWFJsYlY5cFpDSTZNemMzTXpJME16YzBNamMzTkRreU1Dd2laVzVqYjJSbFpGOXRaWFJoWkdGMFlTSTZJaUo5TEhzaWFYUmxiVjlwWkNJNk5URTRPRE01T0RJeE1USXpNVGs0Tnl3aVpXNWpiMlJsWkY5dFpYUmhaR0YwWVNJNklpSjlMSHNpYVhSbGJWOXBaQ0k2TkRFeE9EUXhPRGM0TVRVd01UZ3hNeXdpWlc1amIyUmxaRjl0WlhSaFpHRjBZU0k2SWlKOVhTd2labVYwWTJobGNsOXdZV2RwYm1GMGFXOXVYMk4xY25OdmNpSTZJbVY1U214aWJVNTJXa2RXYTFneVZqUlpNbmd4V2tkV1ptRllVbXhpVmpsd1draE5hVTlzY3pCTmVtTXpUMFJKTVU1VVdUUlBWRVUxVG1wSmQweEVZM2RPUkdONFRtcFZlazVxVlhwTlJHc3hUMVJWYzA1RVZURk9SRlV3VFZSWk0wMVVTWHBPVkUweFRYbDNNVTlVVVhoT2VtczFUbnBuTVU5RWEzZFBWR2QzVEVSTk5VMXFWVEpPVkVVMVRrUmpNVTE2WnpGUFZFRnpUWHBuTVU1cVVUSk5SRVV5VG5wbmVFMTZhek5OZVhkNlQxUm5NMDVFV1hwT2FtY3dUbXBOZVU5VVRYZE1SRkY0VFZSWmQwMXFaelZPYWtVelRtcHJlazVFV1hOT1JFRjRUVlJqZWs1cVdUVk5ha2t3VFZSak1VMXBkekJOVkZWNFRVUk5kMDVVUlRCUFZHTjZUV3BSZUV4RVZUSk5hbFY2VDBSbk5VMVVRVFJOZWxsM1RrUkJjMDVVVVhoTmVsazFUbXBCTkU5RVkzZE5WR3N4VGxOM2VrOVVUWGRPUkdkNlRsUm5kMDE2WXpOUFZGRTFURVJSZWs5VVNYcE9SR2N6VG5wak1FNVVhM2ROYWxselRrUkpOVTVxYXpKTmFrVjZUWHBqZDAxRWF6Tk5lWGQ2VG5wamVrMXFVWHBPZWxGNVRucGpNRTlVU1hkTVJGVjRUMFJuZWs5VVozbE5WRVY1VFhwRk5VOUVZM05PUkVWNFQwUlJlRTlFWXpSTlZGVjNUVlJuZUUweE1ITkpiVloxV1RJNWExcFhVbVphV0docVlraFdhMXBXT1c1amJUa3hZMFk1Y0ZwSVRXbFBiSE15VDFSVmQwMXFVVEJPYWtFMFRYcE5NRTVxVFRSTVJGRXdUbXByTWs1RVRYZE5WR3N6VG1wck0wOUVRWE5OZW10NlRYcGpOVTVxUVhkT2FtTjVUbFJKTUUxRGR6Sk5lbWN6VGtSak0wNTZZekJPYWtreFQxUkpNRXhFVVhkTmVsazFUbFJaTUU1NldUQk5hbEV5VGtSWmMwNUVRWHBOVkZWNlRXcEJNVTE2VlRGTlZFVjZUVk4zZWs5VVdUQk9WRUUwVG1wSmVrNXFVVFJOVkZGNVRFUlZORTU2WjNkTmVrVXhUMVJWTVU1NlFUTk9ha2x6VFhwVk0wOUVhM2hQVkVFd1RsUlZNRTU2U1hkTmVYZDZUMVJaTlU5VVJYcE5ha0Y2VFZSRk1VNUVaM2RNUkUwMFRsUk5NVTE2VlROT2VsRXpUVVJGTkU5VVkzTk5lbXN3VGtSbk1FMVVZM2hQUkdzeVQxUlJORTVEZHpCTlJGVjZUWHBqZVU5RVRUUk5SRmt4VG1wbk5VeEVVWGRPUkd0M1RsUmplVTFFWnpCUFZGazFUbFJCYzAxNldUTlBSRUY2VFdwcmQwNVVXWHBQVkdNeFRWTjNNRTFVYXpKTlJFRjRUbXBOTTAxRWF6Uk9SR040VEVSTk0wOVVRWGRPYWtFeVQwUkZkMDlFVVRST2VsVnpUbFJGTWsxNlNUTk5WR3N3VFhwak1FMTZaM2hOUmpCelNXMVdkVmt5T1d0YVYxSm1ZMGRHYm1GWE5XaGtSMngyWW13NWNscFlhMmxQYlRVeFlrZDRPU0lzSW1abGRHTm9aWEpmYUdGelgyMXZjbVVpT25SeWRXVXNJblJ2ZEdGc1gybDBaVzF6WDJOdmRXNTBYMmx1WDNCeVpYWmZjR0ZuWlhNaU9qRXdMQ0p5WVc1cmFXNW5YM0psY1hWbGMzUmZhV1FpT2lJME5qQTBORFV3TURVM05ETTVNekkwTnpZeElpd2liM1psY25KcFpHVmZjbVYwY21sbGRtRnNYMkpoWTJ0bGJtUWlPaUowWVc4aWZRPT0iLCJjb3JyZWN0bmVzc19kYXRhIjpudWxsLCJwYWdlX251bWJlciI6MX0="
            }
          }
        },
        "lang": "pt_BR"
      }
    )
      .then((response) => {
        setDataWhatsapp(response.data);
      })
      .catch((error) => {
        console.log(error);
      }
    );
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
      <h1>Buscar dados</h1>
      <Space direction="horizontal" size={12}>
      <Button type="primary" onClick={() => handleScraping()}>GREGO IMOVEIS</Button>
      <Button type="primary" onClick={() => handleScrapingOlx()}>OLX</Button>
      <Button type="primary" onClick={() => handleScrapingOlxPup()}>OLX Scraping</Button>
      <Button type="primary" onClick={() => handleScrapingWhatsapp()}>Whatsapp Scraping</Button>
      <Button type="primary" onClick={() => exportFromJSON({ data: exportData, fileName: 'export', exportType: 'csv' })}>Exportar CSV</Button>
      </Space>

      {data.length > 0 && (
        <>
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
        </>
      )}
      {dataOlx.length > 0 && <TabelaOlx data={dataOlx} />}
    </div>
  )
}
