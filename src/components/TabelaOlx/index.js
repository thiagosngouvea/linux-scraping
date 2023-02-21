import React from "react";
import { Table, Carousel, Image } from "antd";

export function TabelaOlx({ data }) {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
    return (
        <Table
        dataSource={data}
        columns={[
            {
                title: "Título",
                dataIndex: "title",
                key: "title",
            },
            {
                title: "Preço",
                dataIndex: "price",
                key: "price",
            },
            {
                title: "Descrição",
                dataIndex: "description",
                key: "description",
                render: (text) => {
                    return <div dangerouslySetInnerHTML={{ __html: text }} />;
                },
            },
            {
                title: "Localização",
                dataIndex: "location",
                key: "location",
            },
            {
                title: "Imagens",
                dataIndex: "images",
                key: "images",
                render: (images, record) => 
                <div>
                  <Carousel dots={false}>
                    {record.imageList.map((image, index) => 
                      <div key={index}>
                        <Image src={`${image.baseUrl+`/thumbs256x256`+image.path}`} alt="teste"/>
                      </div>
                    )}
                  </Carousel>
                </div>
              },
        ]}
        />
    );
}
