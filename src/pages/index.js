import React, { useState, useEffect } from 'react'
import { Button, Space, Table, Select, Row, Col, Carousel, Modal, Image, Spin } from 'antd'
// import { getScraping, getScrapingOlx, getScrapingOlxPup, getScrapingWhatsapp } from '@/pages/api/scraping'
import CSVReader from 'react-csv-reader';
import XLSX from 'xlsx';
import { getScraping, getScrapingAmancio } from '@/services/scraping'
import { TabelaOlx } from '@/components/TabelaOlx'
import { TabelaAmancio } from '@/components/TabelaAmancio';
import { SelectOptions } from '@/utils'
import exportFromJSON from "export-from-json";

export default function Home() {

  const [selectedSite, setSelectedSite] = useState('')
  const [data, setData] = useState([]);
  const [amancio, setAmancio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataOlx, setDataOlx] = useState([]);
  const [dataOlxPup, setDataOlxPup] = useState([]);
  const [dataWhatsapp, setDataWhatsapp] = useState([]);
  const [exportData, setExportData] = useState([])
  const [visible, setVisible] = useState(false)
  const [images, setImages] = useState([])

  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };


  const handleScraping = async () => {
    if (selectedSite === 'grego-imoveis') {
      setLoading(true)
    await getScraping(selectedSite)
      .then((response) => {
        setData(response.data);
        localStorage.setItem('scraping.data', JSON.stringify(response.data))
        setLoading(false);
        let exportarDados = []

        for (const item of response.data) {
          exportarDados.push({
            "Título": item.title,
            "Preço": item.price,
            "Status": item.status,
            "Cômodos": item.details['cmodos'],
            "Proximidades": item.details['proximidades'],
          })
        }

        setExportData(exportarDados)
      }).catch((error) => {
        console.log(error)
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    const data = localStorage.getItem('scraping.data')
    if (data) {
      setData(JSON.parse(data))
    }
  }, [])

  const handleScrapingAmancio = async () => {
    setLoading(true)
    await getScrapingAmancio(1)
      .then(async (response) => {
        const paginas = Math.ceil(response.data.count / 12)
        const promises = []
        for(let i = 1; i <= paginas; i++) {
          promises.push(getScrapingAmancio(i))
        }
        const responses = await Promise.all(promises)
        const dataImoveis = responses.map(response => response.data.data)
        const amancioArray = dataImoveis.flat()
        const amancioArrayReestruturado = amancioArray.map((item) => {
          return {
            area: item.area[0],
            banheiros: item.bathrooms[0],
            dormitorios: item.bedrooms[0],
            garagem: item.garages[0],
            suites: item.suites[0],
            preco: item.sale_price[0],
            status: item.show_price === "SALE" ? "Venda" : "Aluguel",
            estado: item.state,
            fotos: item.photos ? item.photos.map((item) => item.picture_full) : [],
            bairro: item.neighborhood,
            cidade: item.city,
            descricao: item.listing_description,
            titulo: item.website_title,
          }
        })
        let exportDados = []
        for (const item of amancioArrayReestruturado) {
          exportDados.push({
            "Título": item.titulo,
            "Preço": item.preco,
            "Status": item.status,
            "Cômodos": `${item.dormitorios} dormitórios, ${item.suites} suítes, ${item.banheiros} banheiros, ${item.garagem} vagas`,
            "Bairro": item.bairro,
            "Cidade": item.cidade,
            "Estado": item.estado,
            "Área": item.area,
            "Descrição": item.descricao,
            "Fotos": item.fotos,
          })
        }
        setExportData(exportDados)
        setAmancio(amancioArrayReestruturado);
        setLoading(false);
      }).catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }


  const handleButtonClick = () => {
    if (selectedSite === 'grego-imoveis') {
      handleScraping();
    } else if (selectedSite === 'imobiliaria-amancio') {
      handleScrapingAmancio();
    }
  }

  // console.log('asdasd**',amancioArray)
  // console.log('asdasd',amancioArray2)
  

  // const onChange = (currentSlide) => {
  //   console.log(currentSlide);
  // };

  // function handleData(data) {
  //   console.log(data);
  // }

  // function handleDataXlsx(file) {
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const data = e.target.result;
  //     console.log(data);
  //     const workbook = XLSX?.read(data, { type: 'binary' });
  //     const worksheet = workbook?.Sheets[workbook.SheetNames[0]];
  //     const sheetData = XLSX?.utils?.sheet_to_json(worksheet, { header: 1 });
  //     console.log(sheetData);
  //   };
  //   reader.readAsBinaryString(file);
  // }

  return !loading ? (
    <div>
      <div>
        <h1>Sites disponíveis</h1>
        <Row>
          <Col span={8}>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Selecione o site"
            optionFilterProp="children"
            onChange={(value) => setSelectedSite(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 
            }
          >
            {SelectOptions.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
          </Col>
          <Col offset={1} span={12}>
          <Space direction="horizontal" size={12}>
            <Button type="primary" onClick={() => handleButtonClick()} disabled={!selectedSite}>Buscar</Button>
            <Button type="primary" disabled={!exportData} onClick={() => exportFromJSON({ data: exportData, fileName: 'export', exportType: 'csv' })}>Exportar CSV</Button>
            {/* <CSVReader onFileLoaded={handleData} />
            <input type="file" onChange={(e) => handleDataXlsx(e.target.files[0])} /> */}
          </Space>
          </Col>
        </Row>
      </div>

      {selectedSite === "grego-imoveis" && data.length > 0 && (
        <Space size="middle">
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
            dataIndex: ['details', 'cmodos'],
            key: 'details',
          },
          {
            title: 'Proximidades',
            dataIndex: ['details', 'proximidades'],
            key: 'details',
          },
          {
            title: 'Imagens',
            dataIndex: ['details', 'Imagens'],
            key: ['details', 'Imagens'],
            render : (images, record) => {
              return (
                <Button type="primary" onClick={() => {
                  setVisible(true)
                  setImages(images)
                }}>Ver Imagens</Button>
              );
            }
          }
          ]} 
        />
        </Space>
      )}
      <Modal
        title="Imagens retiradas via web scraping"
        visible={visible}
        width={'80%'}
        onCancel={() => setVisible(false)}
        centered
        footer={
          <Button type="primary" onClick={() => setVisible(false)}>
            Fechar
          </Button>
        }
      >
            <Image.PreviewGroup>
              {/* <Carousel autoplay infinite={false}> */}
                {images.map((image, index) => (  
                    <Image
                      key={index}
                      width={200}
                      height={120}
                      src={image}
                      alt="foto-imovel"
                    />
                  ))}
              {/* </Carousel> */}
            </Image.PreviewGroup>
      </Modal>

      {dataOlx.length > 0 && <TabelaOlx data={dataOlx} />}
      {selectedSite === "imobiliaria-amancio" && amancio.length > 0 && <TabelaAmancio data={amancio} />}
    </div>
  ) : (
    //colocar um loading centralizado com antd e o spin do antd
    <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Spin size="large" />
      <span>
        <h3>O scraping do site grego imoveis pode levar mais tempo, aguarde ou recarregue a pagina</h3>
      </span>
    </div>
  )
}
