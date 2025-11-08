import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/loaderSlice';
import { Input, message, Row, Col, Divider, DatePicker } from 'antd';
import { getMovieById } from '../api/movie';
import { CalendarOutlined } from "@ant-design/icons";
import { getAllTheatersByMovie } from '../api/show';

const SingleMovie = () => {
    const params = useParams();
    const queryParams = useSearchParams();
    // console.log("Params: ", params);
    // console.log("queryParams: ", queryParams[0].get("date")); 
    const [date, setDate] = useState(moment(queryParams[0].get("date")).format("YYYY-MM-DD"));
    const [movie, setMovie] = useState(null);
    const [theaters, setTheaters] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = async () => {
        try {
            dispatch(showLoading());
            const response = await getMovieById(params?.id);
            if (response.success) {
                setMovie(response.data);
            } else {
                message.warning(response.message);
            }

        } catch (error) {
            message.error(error)
        } finally {
            dispatch(hideLoading());
        }
    };
    const getAllTheaters = async () => {
        try {
            dispatch(showLoading());
            const response = await getAllTheatersByMovie({ movie: params.id, date });
            if (response.success) {
                setTheaters(response.data);
            } else {
                message.warning(response.message);
            }
        } catch (error) {
            message.error(error)
        } finally {
            dispatch(hideLoading());
        }
    };
    useEffect(() => {
        getAllTheaters();
    }, [date]);

    useEffect(() => {
        getData();
    }, []);

    const handleDate = (event) => {
        const date = moment(event.target.value).format("YYYY-MM-DD");
        setDate(date);
        navigate(`/movie/${params.id}?date=${date}`);
    };

    const handleDateChange = (date, dateString) => {
        // value is moment object, dateString is formatted string (YYYY-MM-DD if default)
        if (!dateString) return;
        setDate(dateString); 
        navigate(`/movie/${params.id}?date=${dateString}`);
    };

    return (
        <div className="inner-container" style={{ paddingTop: "20px" }}>
            {movie && (
                <div className="d-flex single-movie-div">
                    <div className="flex-Shrink-0 me-3 single-movie-img">
                        <img src={movie?.poster} width={150} alt="Movie Poster" />
                    </div>
                    <div className="w-100">
                        <h1 className="mt-0">{movie.movieName}</h1>
                        <p className="movie-data">
                            Language: <span>{movie.language}</span>
                        </p>
                        <p className="movie-data">
                            Genre: <span>{movie.genre}</span>
                        </p>
                        <p className="movie-data">
                            Release Date:
                            <span>{moment(movie.date).format("MMM Do YYYY")}</span>
                        </p>
                        <p className="movie-data">
                            Duration: <span>{movie.duration} Minutes</span>
                        </p>
                        <hr />
                        <div className="d-flex flex-column-mob align-items-center mt-3">
                            <label className="me-3 flex-shrink-0">Choose the date:</label>
                            <Input
                                onChange={handleDate}
                                type="date"
                                min={moment().format("YYYY-MM-DD")}
                                className="max-width-300 mt-8px-mob"
                                value={date}
                                placeholder="default size"
                                prefix={<CalendarOutlined />}
                            />

                            <DatePicker
                                onChange={handleDateChange}
                                defaultValue={moment(date, "YYYY-MM-DD")}
                                format="YYYY-MM-DD"
                                allowClear={false}
                                style={{ marginLeft: 8 }}
                            />

                        </div>

                    </div>

                </div>
            )}

            {theaters.length === 0 && (
                <div className="pt-3">
                    <h2 className="blue-clr">
                        Currently, no theaters available for this movie!
                    </h2>
                </div>
            )}

            {theaters.length > 0 && (
                <div className="theatre-wrapper mt-3 pt-3">
                    <h2>Theaters</h2>
                    {theaters.map((theater) => {
                        return (
                            <div key={theater._id} style={{ margin: "10px" }}>
                                <Row gutter={24} key={theater._id}>
                                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                                        <h3>{theater.name}</h3>
                                        <p>{theater.address}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                                        <ul className="show-ul">
                                            {theater.shows
                                                .sort(
                                                    (a, b) =>
                                                        moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                                                )
                                                .map((singleShow) => {
                                                    return (
                                                        <li
                                                            key={singleShow._id}
                                                            onClick={() =>
                                                                navigate(`/book-show/${singleShow._id}`)
                                                            }
                                                        >
                                                            {moment(singleShow.time, "HH:mm").format(
                                                                "hh:mm A"
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </Col>
                                </Row>
                                <Divider />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default SingleMovie