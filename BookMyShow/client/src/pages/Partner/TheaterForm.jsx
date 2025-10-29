import React from 'react'
import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/loaderSlice';
import { addTheater, updateTheater } from '../../api/theater';

const TheaterForm = ({
    isModalOpen, setIsModalOpen,
    selectedTheater, setSelectedTheater,
    fetchTheaterData
}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedTheater(null);
    }
    const onFinish = async (values) => {
        try {
            // API call to add or update theater
            dispatch(showLoading)
            let response;
            if (selectedTheater) {
                // Update theater API call
                response = await updateTheater({ ...values, theaterId: selectedTheater._id });
            } else {
                // Add theater API call
                response = await addTheater({...values, owner: user._id});
            }
            if (response?.success === true) {
                message.success(response?.message);
            } else {
                message.warning(response?.message);
            }
        } catch (error) {
            message.error(error);
        } finally {
            fetchTheaterData();
            setIsModalOpen(false);
            setSelectedTheater(null);
            dispatch(hideLoading());
        }
    }
    return (
        <Modal
            centered
            title={selectedTheater ? "Edit Theater" : "Add Theater"}
            open={isModalOpen}
            onCancel={handleCancel}
            width={800}
            footer={null}
        >

            <Form
                layout="vertical"
                style={{ width: "100%" }}
                initialValues={selectedTheater}
                onFinish={onFinish}
            >
                <Row
                    gutter={{
                        xs: 6,
                        sm: 10,
                        md: 12,
                        lg: 16,
                    }}
                >
                    <Col span={24}>
                        <Form.Item
                            label="Theater Name"
                            htmlFor="name"
                            name="name"
                            className="d-block"
                            rules={[{ required: true, message: "Theater name is required!" }]}
                        >
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter the theater name"
                            ></Input>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Theater Address"
                            htmlFor="address"
                            name="address"
                            className="d-block"
                            rules={[{ required: true, message: "Theater name is required!" }]}
                        >
                            <TextArea
                                id="address"
                                rows="3"
                                placeholder="Enter the theater name"
                            ></TextArea>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Row
                            gutter={{
                                xs: 6,
                                sm: 10,
                                md: 12,
                                lg: 16,
                            }}
                        >
                            <Col span={12}>
                                <Form.Item
                                    label="Email"
                                    htmlFor="email"
                                    name="email"
                                    className="d-block"
                                    rules={[{ required: true, message: "Email  is required!" }]}
                                >
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter the email"
                                    ></Input>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Phone Number"
                                    htmlFor="phone"
                                    name="phone"
                                    className="d-block"
                                    rules={[
                                        { required: true, message: "Phone number is required!" },
                                    ]}
                                >
                                    <Input
                                        id="phone"
                                        type="number"
                                        placeholder="Enter the phone number"
                                    ></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                        Submit the Data
                    </Button>
                    <Button className="mt-3" block onClick={handleCancel}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default TheaterForm