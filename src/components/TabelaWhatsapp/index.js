import React, { useState } from 'react'

import { Table, Modal, Image, Button, Tooltip } from 'antd'


export function TabelaWhatsapp({ data }) {
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
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Preço",
                dataIndex: "price",
                key: "price",
                render: (text) => {
                    return text.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
                },
            },
            {
                title: "Descrição",
                dataIndex: "description",
                key: "description",
                render: (text) => {
                    setDescricao(text)
                    return <Tooltip onClick={() => setVerMais(true)} title="Clique para ver mais">{text.substring(0, 100) + `...`}</Tooltip>;
                },
            },
            {
              title: 'Imagens',
              dataIndex: ['media', 'images'],
              key: ['media', 'images'],
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
                      src={image.original_image_url}
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