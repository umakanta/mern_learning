import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../../redux/loaderSlice';
import { getAllTheaters, getAllTheatersByOwner } from '../../api/theater';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import DeleteTheaterModal from './DeleteTheaterModal';
import TheaterForm from './TheaterForm';

const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading);
      const response = await getAllTheatersByOwner();
      if (response.success == true) {
        // ensure each record has a unique key to avoid React warning
        const theatersWithKeys = response.data.map((theater, idx) => ({
          ...theater,
          key: theater._id || theater.id || idx,
        }));
        setTheaters(theatersWithKeys);
      } else {
        message.warning(response?.message)
      }
    } catch (error) {
      message.error(error);
    } finally {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    // extract as a custom hook
    getData();
  }, []);


  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: "address",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "phone",
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        return record.isActive ? "Approved / Running" : "Pending/Blocked/Under Maintainance";
      }
    },
    {
      key: "Actions",
      title: "Actions",
      render: (text, data) => {
        return (
          <div style={{ display: "flex" }}>
            <Button
              style={{ margin: "5px" }}
              onClick={() => {
                setIsModalOpen(true);
                setSelectedTheater(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              danger
              style={{ margin: "5px" }}
              onClick={() => {
                console.log("Selected theater for Deletion:");
                setSelectedTheater(data);
                setIsDeleteModalOpen(true);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Button
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
        type='primary'
      > Add Theater </Button>
      <Table columns={columns} dataSource={theaters} />

      {isModalOpen && <TheaterForm
        isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        fetchTheaterData={getData}
        selectedTheater={selectedTheater} setSelectedTheater={setSelectedTheater}
      />}

      {isDeleteModalOpen && <DeleteTheaterModal
        isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen}
        fetchTheaterData={getData}
        selectedTheater={selectedTheater} setSelectedTheater={setSelectedTheater}
      />}
    </div>
  )
}

export default TheaterList