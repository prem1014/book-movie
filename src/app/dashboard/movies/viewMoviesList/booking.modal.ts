
class Booking {
    private _id;
    private movieId;
    private cinemaHallId;
    private screen;
    private city;
    private totalSeatsBooked;
    constructor(_id, city, movieId, cinemaHallId, screen, totalSeatsBooked) {
        this._id = _id;
        this.city = city;
        this.movieId = movieId;
        this.cinemaHallId = cinemaHallId;
        this.screen = screen;
        this.totalSeatsBooked = totalSeatsBooked;
    }
}

export default  Booking;
