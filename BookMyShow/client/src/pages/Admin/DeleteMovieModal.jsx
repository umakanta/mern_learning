import { message, Modal } from "antd";
import React from 'react'
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { deleteMovie } from "../../api/movie";

const DeleteMovieModal = ({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    fetchMovieData,
    selectedMovie,
    setSelectedMovie
}) => {
    const dispatch = useDispatch();
    const handleOk = async () => {
        try {
            dispatch(showLoading());
            // API call to delete movie
            const movieId = selectedMovie._id;
            console.log("Deleting movie with ID:", movieId);
            const response = await deleteMovie(movieId);
            if (response.success) {
                message.success(response.message);
            } else {
                message.warning(response.message);
            }
        } catch (error) {
            message.error(error);
        } finally {
            setIsDeleteModalOpen(false);
            setSelectedMovie(null);
            fetchMovieData();
            dispatch(hideLoading());
        }
    }
    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedMovie(null);
    }
    return (
        <Modal
            title="Delete Movie" open={isDeleteModalOpen}
            onOk={handleOk} onCancel={handleCancel}
        >
            <p className="pt-3 fs-18">Are you sure you want to delete the movie {selectedMovie?.movieName}?</p>
            <p className="pb-3 fs-18">This action cannot be undone.</p>
        </Modal>
    )
}

export default DeleteMovieModal;