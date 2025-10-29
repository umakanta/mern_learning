import { message, Modal } from "antd";
import React from 'react'
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { deleteTheater } from "../../api/theater";

const DeleteTheaterModal
 = ({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    fetchTheaterData,
    selectedTheater,
    setSelectedTheater
}) => {
    const dispatch = useDispatch();
    const handleOk = async () => {
        try {
            dispatch(showLoading());
            // API call to delete theater
            const theaterId = selectedTheater._id;
            console.log("Deleting theater with ID:", theaterId);
            const response = await deleteTheater(theaterId);
            if (response.success) {
                message.success(response.message);
            } else {
                message.warning(response.message);
            }
        } catch (error) {
            message.error(error);
        } finally {
            setIsDeleteModalOpen(false);
            setSelectedTheater(null);
            fetchTheaterData();
            dispatch(hideLoading());
        }
    }
    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedTheater(null);
    }
    return (
        <Modal
            title="Delete Theater" open={isDeleteModalOpen}
            onOk={handleOk} onCancel={handleCancel}
        >
            <p className="pt-3 fs-18">Are you sure you want to delete the theater {selectedTheater?.name}?</p>
            <p className="pb-3 fs-18">This action cannot be undone.</p>
        </Modal>
    )
}

export default DeleteTheaterModal;