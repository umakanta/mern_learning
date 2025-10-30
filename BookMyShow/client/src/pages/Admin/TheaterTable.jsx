import { Button, message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { hideLoading, showLoading } from '../../redux/loaderSlice';
import { getAllTheaters, updateTheater } from '../../api/theater';
import { useDispatch } from 'react-redux';

function TheaterTable() {
  const dispatch = useDispatch();
  const [theaters, setTheaters] = useState([]);

  const handleStatusChange = async (theater) => {
    try {
      dispatch(showLoading());
      // API call to update theater status
      const newStatus = !theater.isActive;
      const payload = {
        ...theater,
        isActive: newStatus
      };
      const response = await updateTheater(payload)
      if (response.success) {
        message.success(response.message);
      } else {
        message.warning(data.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      getData();
      dispatch(hideLoading());
    }
  }
  const getData = async () => {
    // fetch theater data from server
    try {
      dispatch(showLoading());
      const response = await getAllTheaters();
      if (response.success) {
        // ensure each record has a unique key to avoid React warning
        const theatersWithKeys = response.data.map((theater, idx) => ({
          ...theater,
          key: theater._id || theater.id || idx,
        }));
        setTheaters(theatersWithKeys);
        //  setTheaters(response?.data);
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
    getData()
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
      title: "owner",
      dataIndex: "owner",
      render: (text, data) => {
        return data.owner && data.owner.name;
      }
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
        return record.isActive ? "Approved" : "Pending/Blocked";
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="d-flex align-items-center gap-10">
            {/* Action buttons can be added here */
            record.isActive ? (
              <Button onClick={() => handleStatusChange(record)}> Block </Button>
            ) : (
              <Button onClick={() => handleStatusChange(record)}> Approve </Button>
            )}
          </div>
        );
      }
    }
  ];
  return (
    <div>
      <Table dataSource={theaters} columns={columns} rowKey="key" />
    </div>
  )
}

export default TheaterTable