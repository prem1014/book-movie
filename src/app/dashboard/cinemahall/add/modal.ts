
interface CinemaHallDetails {
    city: string;
    hallName: string;
    screen: Array<object>;
    totalSeats: number;
    _id: string;
}

class CinemaHall {
    private cinemaHallDetails: CinemaHallDetails;
    constructor(_id, city, hallName, screen, totalSeats) {
        this.cinemaHallDetails._id = _id;
        this.cinemaHallDetails.city = city;
        this.cinemaHallDetails.hallName = hallName;
        this.cinemaHallDetails.screen = screen;
        this.cinemaHallDetails.totalSeats = totalSeats;
    }
}

export default  CinemaHall;
