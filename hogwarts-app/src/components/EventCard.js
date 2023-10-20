import React from "react";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';

function EventCard(props) {
  const { eventName, date, location, description } = props;

  return (
    <Card className="eventcard" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{eventName}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {date}
        </Card.Text>
        <Card.Text>
          <strong>Location:</strong> {location}
        </Card.Text>
        <Card.Text>
          <strong>Description:</strong> {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EventCard;