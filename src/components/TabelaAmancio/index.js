import React, { useState } from 'react'

import { Table, Modal, Image, Button, Tooltip } from 'antd'


export function TabelaAmancio({ data }) {
    const [images, setImages] = useState([])
    const [descricao, setDescricao] = useState([])
    const [visible, setVisible] = useState(false)
    const [verMais, setVerMais] = useState(false)
    return (
      <>
        <Table
        dataSource={data}
        columns={[
            {
                title: "Título",
                dataIndex: "titulo",
                key: "titulo",
            },
            {
                title: "Preço",
                dataIndex: "preco",
                key: "preco",
                render: (text) => {
                    return text.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
                },
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
            },
            {
                title: "Descrição",
                dataIndex: "descricao",
                key: "descricao",
                render: (text) => {
                    setDescricao(text)
                    return <Tooltip onClick={() => setVerMais(true)} title="Clique para ver mais">{text.substring(0, 100) + `...`}</Tooltip>;
                },
            },
            {
                title: "Cômodos",
                dataIndex: "comodos",
                key: "comodos",
                render: (text, record) => {
                    return `${record.banheiros} banheiros, ${record.dormitorios} dormitórios, ${record.suites} suítes, ${record.garagem} garagem`;
                },
            },
            {
                title: "Area",
                dataIndex: "area",
                key: "area",
            },
            {
                title: "Bairro",
                dataIndex: "bairro",
                key: "bairro",
            },
            {
                title: "Cidade",
                dataIndex: "cidade",
                key: "cidade",
            },
            {
                title: "Estado",
                dataIndex: "estado",
                key: "estado",
            },
            {
              title: 'Imagens',
              dataIndex: 'fotos',
              key: 'fotos',
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
        <Modal
        title="Descrição Completa"
        visible={verMais}
        width={'80%'}
        onCancel={() => setVerMais(false)}
        centered
        footer={
          <Button type="primary" onClick={() => setVerMais(false)}>
            Fechar
          </Button>
        }
      >
        {descricao}
      </Modal>
      </>
    );
}