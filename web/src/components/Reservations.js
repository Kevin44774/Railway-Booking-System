import React, { Component } from 'react';
import { Row, Col, Button, Card, Pagination, Form } from 'react-bootstrap';
import { getReservations, deleteReservation } from '../Services';
import { toast } from 'react-toastify';

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            items: [],
            offset: 1,
            lastPage: 1,
            paginateItems: [],
            searchQuery: '',
        };
    }

    componentDidMount() {
        this.updateReservations();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchQuery !== this.state.searchQuery || prevState.offset !== this.state.offset) {
            this.paginateReservations();
        }
    }

    updateReservations = () => {
        const user = localStorage.getItem('user');
        if (!user) {
            this.props.history.push('/');
        } else {
            const userId = JSON.parse(user)._id;
            getReservations(userId)
                .then(res => {
                    this.setState({ reservations: res }, () => this.paginateReservations());
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    cancelReservation = id => {
        const c = window.confirm("The reservation " + id + " will be deleted");
        if (c) {
            deleteReservation(id)
                .then(res => {
                    toast.success("Successfully removed reservation " + id);
                    this.updateReservations();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    paginateReservations = () => {
        const filteredReservations = this.state.reservations.filter(reservation => 
            reservation.from.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
            reservation.to.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        );

        let items = [];
        const offset = (this.state.offset - 1) * 5;

        for (let number = offset; number < offset + 5; number++) {
            const reservation = filteredReservations[number];
            if (reservation) {
                items.push(
                    <Row style={{ width: '75%' }} key={number}>
                        <Col>
                            <Card style={{ padding: 10, marginTop: 10 }}>
                                <Row>
                                    <Col>Reference No : {reservation._id}</Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col>From <b>{reservation.from}</b> to <b>{reservation.to}</b></Col>
                                    <Col align='right'>{reservation.date} {reservation.time}</Col>
                                </Row>
                                <Row>
                                    <Col>Train : {reservation.train}</Col>
                                </Row>
                                <Row>
                                    <Col>Class : {reservation.trainClass}</Col>
                                </Row>
                                <Row>
                                    <Col>Quantity : {reservation.qty}</Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col>Amount : {reservation.amount.toFixed(2)}</Col>
                                    <Col>Discount : {reservation.discount.toFixed(2)}</Col>
                                    <Col align='right'><b>Total :</b> {reservation.total.toFixed(2)}</Col>
                                </Row>
                                <Row>
                                    <Col style={{ paddingTop: 10 }} align='right'>
                                        <Button variant="danger" size="sm" onClick={() => this.cancelReservation(reservation._id)}>Cancel</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                );
            }
        }

        const lastPage = Math.ceil(filteredReservations.length / 5);
        let paginateItems = [];
        for (let number = 1; number <= lastPage; number++) {
            paginateItems.push(
                <Pagination.Item key={number} active={number === this.state.offset} onClick={() => this.pageChange(number)}>
                    {number}
                </Pagination.Item>
            );
        }

        this.setState({ paginateItems: paginateItems, items: items, lastPage: lastPage });
    }

    pageChange = n => {
        this.setState({ offset: n });
    }

    handleSearch = event => {
        this.setState({ searchQuery: event.target.value, offset: 1 }, () => this.paginateReservations());
    }

    render() {
        return (
            <Row style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Row style={{ width: '75%', padding: 10 }}>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Search by 'From' or 'To'"
                            value={this.state.searchQuery}
                            onChange={this.handleSearch}
                        />
                    </Col>
                </Row>
                {this.state.reservations.length <= 0 &&
                    <Row style={{ width: '75%', padding: 10 }}>
                        <Col>
                            <Card>
                                <Card.Body>You don't have any reservations yet!!!</Card.Body>
                            </Card>
                        </Col>
                    </Row>
                }
                {this.state.reservations.length > 0 &&
                    <>
                        <Row style={{ width: '75%', paddingTop: 20, paddingLeft: 15 }}>
                            <Pagination>
                                <Pagination.First onClick={() => this.pageChange(1)} />
                                {this.state.paginateItems}
                                <Pagination.Last onClick={() => this.pageChange(this.state.lastPage)} />
                            </Pagination>
                        </Row>
                        {this.state.items.map((reservation, i) => (
                            reservation
                        ))}
                        <Row style={{ width: '75%', paddingTop: 20, paddingLeft: 15 }}>
                            <Pagination>
                                <Pagination.First onClick={() => this.pageChange(1)} />
                                {this.state.paginateItems}
                                <Pagination.Last onClick={() => this.pageChange(this.state.lastPage)} />
                            </Pagination>
                        </Row>
                    </>
                }
            </Row>
        );
    }
}

export default Reservations;
